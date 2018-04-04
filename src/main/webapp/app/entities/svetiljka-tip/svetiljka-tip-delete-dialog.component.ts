import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SvetiljkaTip } from './svetiljka-tip.model';
import { SvetiljkaTipPopupService } from './svetiljka-tip-popup.service';
import { SvetiljkaTipService } from './svetiljka-tip.service';

@Component({
    selector: 'jhi-svetiljka-tip-delete-dialog',
    templateUrl: './svetiljka-tip-delete-dialog.component.html'
})
export class SvetiljkaTipDeleteDialogComponent {

    svetiljkaTip: SvetiljkaTip;

    constructor(
        private svetiljkaTipService: SvetiljkaTipService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.svetiljkaTipService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'svetiljkaTipListModification',
                content: 'Deleted an svetiljkaTip'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-svetiljka-tip-delete-popup',
    template: ''
})
export class SvetiljkaTipDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private svetiljkaTipPopupService: SvetiljkaTipPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.svetiljkaTipPopupService
                .open(SvetiljkaTipDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
