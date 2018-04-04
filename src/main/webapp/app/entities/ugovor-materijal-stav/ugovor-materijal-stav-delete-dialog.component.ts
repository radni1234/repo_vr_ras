import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UgovorMaterijalStav } from './ugovor-materijal-stav.model';
import { UgovorMaterijalStavPopupService } from './ugovor-materijal-stav-popup.service';
import { UgovorMaterijalStavService } from './ugovor-materijal-stav.service';

@Component({
    selector: 'jhi-ugovor-materijal-stav-delete-dialog',
    templateUrl: './ugovor-materijal-stav-delete-dialog.component.html'
})
export class UgovorMaterijalStavDeleteDialogComponent {

    ugovorMaterijalStav: UgovorMaterijalStav;

    constructor(
        private ugovorMaterijalStavService: UgovorMaterijalStavService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ugovorMaterijalStavService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ugovorMaterijalStavListModification',
                content: 'Deleted an ugovorMaterijalStav'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ugovor-materijal-stav-delete-popup',
    template: ''
})
export class UgovorMaterijalStavDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ugovorMaterijalStavPopupService: UgovorMaterijalStavPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ugovorMaterijalStavPopupService
                .open(UgovorMaterijalStavDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
