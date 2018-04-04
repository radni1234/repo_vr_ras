import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MaterijalTip } from './materijal-tip.model';
import { MaterijalTipPopupService } from './materijal-tip-popup.service';
import { MaterijalTipService } from './materijal-tip.service';

@Component({
    selector: 'jhi-materijal-tip-delete-dialog',
    templateUrl: './materijal-tip-delete-dialog.component.html'
})
export class MaterijalTipDeleteDialogComponent {

    materijalTip: MaterijalTip;

    constructor(
        private materijalTipService: MaterijalTipService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.materijalTipService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'materijalTipListModification',
                content: 'Deleted an materijalTip'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-materijal-tip-delete-popup',
    template: ''
})
export class MaterijalTipDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private materijalTipPopupService: MaterijalTipPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.materijalTipPopupService
                .open(MaterijalTipDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
