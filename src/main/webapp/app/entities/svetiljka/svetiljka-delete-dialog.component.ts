import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Svetiljka } from './svetiljka.model';
import { SvetiljkaPopupService } from './svetiljka-popup.service';
import { SvetiljkaService } from './svetiljka.service';

@Component({
    selector: 'jhi-svetiljka-delete-dialog',
    templateUrl: './svetiljka-delete-dialog.component.html'
})
export class SvetiljkaDeleteDialogComponent {

    svetiljka: Svetiljka;

    constructor(
        private svetiljkaService: SvetiljkaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.svetiljkaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'svetiljkaListModification',
                content: 'Deleted an svetiljka'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-svetiljka-delete-popup',
    template: ''
})
export class SvetiljkaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private svetiljkaPopupService: SvetiljkaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.svetiljkaPopupService
                .open(SvetiljkaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
