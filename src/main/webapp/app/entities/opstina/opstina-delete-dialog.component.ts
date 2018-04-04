import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Opstina } from './opstina.model';
import { OpstinaPopupService } from './opstina-popup.service';
import { OpstinaService } from './opstina.service';

@Component({
    selector: 'jhi-opstina-delete-dialog',
    templateUrl: './opstina-delete-dialog.component.html'
})
export class OpstinaDeleteDialogComponent {

    opstina: Opstina;

    constructor(
        private opstinaService: OpstinaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.opstinaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'opstinaListModification',
                content: 'Deleted an opstina'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-opstina-delete-popup',
    template: ''
})
export class OpstinaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private opstinaPopupService: OpstinaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.opstinaPopupService
                .open(OpstinaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
