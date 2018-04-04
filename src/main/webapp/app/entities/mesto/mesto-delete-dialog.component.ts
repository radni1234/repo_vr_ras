import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Mesto } from './mesto.model';
import { MestoPopupService } from './mesto-popup.service';
import { MestoService } from './mesto.service';

@Component({
    selector: 'jhi-mesto-delete-dialog',
    templateUrl: './mesto-delete-dialog.component.html'
})
export class MestoDeleteDialogComponent {

    mesto: Mesto;

    constructor(
        private mestoService: MestoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mestoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mestoListModification',
                content: 'Deleted an mesto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mesto-delete-popup',
    template: ''
})
export class MestoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mestoPopupService: MestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mestoPopupService
                .open(MestoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
