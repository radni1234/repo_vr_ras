import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PrijavaIntervencija } from './prijava-intervencija.model';
import { PrijavaIntervencijaPopupService } from './prijava-intervencija-popup.service';
import { PrijavaIntervencijaService } from './prijava-intervencija.service';

@Component({
    selector: 'jhi-prijava-intervencija-delete-dialog',
    templateUrl: './prijava-intervencija-delete-dialog.component.html'
})
export class PrijavaIntervencijaDeleteDialogComponent {

    prijavaIntervencija: PrijavaIntervencija;

    constructor(
        private prijavaIntervencijaService: PrijavaIntervencijaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.prijavaIntervencijaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'prijavaIntervencijaListModification',
                content: 'Deleted an prijavaIntervencija'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prijava-intervencija-delete-popup',
    template: ''
})
export class PrijavaIntervencijaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private prijavaIntervencijaPopupService: PrijavaIntervencijaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.prijavaIntervencijaPopupService
                .open(PrijavaIntervencijaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
