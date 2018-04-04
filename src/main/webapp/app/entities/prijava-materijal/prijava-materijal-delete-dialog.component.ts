import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PrijavaMaterijal } from './prijava-materijal.model';
import { PrijavaMaterijalPopupService } from './prijava-materijal-popup.service';
import { PrijavaMaterijalService } from './prijava-materijal.service';

@Component({
    selector: 'jhi-prijava-materijal-delete-dialog',
    templateUrl: './prijava-materijal-delete-dialog.component.html'
})
export class PrijavaMaterijalDeleteDialogComponent {

    prijavaMaterijal: PrijavaMaterijal;

    constructor(
        private prijavaMaterijalService: PrijavaMaterijalService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.prijavaMaterijalService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'prijavaMaterijalListModification',
                content: 'Deleted an prijavaMaterijal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prijava-materijal-delete-popup',
    template: ''
})
export class PrijavaMaterijalDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private prijavaMaterijalPopupService: PrijavaMaterijalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.prijavaMaterijalPopupService
                .open(PrijavaMaterijalDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
