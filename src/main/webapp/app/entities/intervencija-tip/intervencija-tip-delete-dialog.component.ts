import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IntervencijaTip } from './intervencija-tip.model';
import { IntervencijaTipPopupService } from './intervencija-tip-popup.service';
import { IntervencijaTipService } from './intervencija-tip.service';

@Component({
    selector: 'jhi-intervencija-tip-delete-dialog',
    templateUrl: './intervencija-tip-delete-dialog.component.html'
})
export class IntervencijaTipDeleteDialogComponent {

    intervencijaTip: IntervencijaTip;

    constructor(
        private intervencijaTipService: IntervencijaTipService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.intervencijaTipService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'intervencijaTipListModification',
                content: 'Deleted an intervencijaTip'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-intervencija-tip-delete-popup',
    template: ''
})
export class IntervencijaTipDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private intervencijaTipPopupService: IntervencijaTipPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.intervencijaTipPopupService
                .open(IntervencijaTipDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
