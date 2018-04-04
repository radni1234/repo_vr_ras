import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UgovorIntervencijaStav } from './ugovor-intervencija-stav.model';
import { UgovorIntervencijaStavPopupService } from './ugovor-intervencija-stav-popup.service';
import { UgovorIntervencijaStavService } from './ugovor-intervencija-stav.service';

@Component({
    selector: 'jhi-ugovor-intervencija-stav-delete-dialog',
    templateUrl: './ugovor-intervencija-stav-delete-dialog.component.html'
})
export class UgovorIntervencijaStavDeleteDialogComponent {

    ugovorIntervencijaStav: UgovorIntervencijaStav;

    constructor(
        private ugovorIntervencijaStavService: UgovorIntervencijaStavService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ugovorIntervencijaStavService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ugovorIntervencijaStavListModification',
                content: 'Deleted an ugovorIntervencijaStav'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ugovor-intervencija-stav-delete-popup',
    template: ''
})
export class UgovorIntervencijaStavDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ugovorIntervencijaStavPopupService: UgovorIntervencijaStavPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ugovorIntervencijaStavPopupService
                .open(UgovorIntervencijaStavDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
