import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PrijavaStatus } from './prijava-status.model';
import { PrijavaStatusPopupService } from './prijava-status-popup.service';
import { PrijavaStatusService } from './prijava-status.service';

@Component({
    selector: 'jhi-prijava-status-delete-dialog',
    templateUrl: './prijava-status-delete-dialog.component.html'
})
export class PrijavaStatusDeleteDialogComponent {

    prijavaStatus: PrijavaStatus;

    constructor(
        private prijavaStatusService: PrijavaStatusService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.prijavaStatusService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'prijavaStatusListModification',
                content: 'Deleted an prijavaStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prijava-status-delete-popup',
    template: ''
})
export class PrijavaStatusDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private prijavaStatusPopupService: PrijavaStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.prijavaStatusPopupService
                .open(PrijavaStatusDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
