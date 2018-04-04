import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UgovorIntervencija } from './ugovor-intervencija.model';
import { UgovorIntervencijaPopupService } from './ugovor-intervencija-popup.service';
import { UgovorIntervencijaService } from './ugovor-intervencija.service';

@Component({
    selector: 'jhi-ugovor-intervencija-delete-dialog',
    templateUrl: './ugovor-intervencija-delete-dialog.component.html'
})
export class UgovorIntervencijaDeleteDialogComponent {

    ugovorIntervencija: UgovorIntervencija;

    constructor(
        private ugovorIntervencijaService: UgovorIntervencijaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ugovorIntervencijaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ugovorIntervencijaListModification',
                content: 'Deleted an ugovorIntervencija'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ugovor-intervencija-delete-popup',
    template: ''
})
export class UgovorIntervencijaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ugovorIntervencijaPopupService: UgovorIntervencijaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ugovorIntervencijaPopupService
                .open(UgovorIntervencijaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
