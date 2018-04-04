import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Prijava } from './prijava.model';
import { PrijavaPopupService } from './prijava-popup.service';
import { PrijavaService } from './prijava.service';

@Component({
    selector: 'jhi-prijava-delete-dialog',
    templateUrl: './prijava-delete-dialog.component.html'
})
export class PrijavaDeleteDialogComponent {

    prijava: Prijava;

    constructor(
        private prijavaService: PrijavaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.prijavaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'prijavaListModification',
                content: 'Deleted an prijava'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prijava-delete-popup',
    template: ''
})
export class PrijavaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private prijavaPopupService: PrijavaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.prijavaPopupService
                .open(PrijavaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
