import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StubTip } from './stub-tip.model';
import { StubTipPopupService } from './stub-tip-popup.service';
import { StubTipService } from './stub-tip.service';

@Component({
    selector: 'jhi-stub-tip-delete-dialog',
    templateUrl: './stub-tip-delete-dialog.component.html'
})
export class StubTipDeleteDialogComponent {

    stubTip: StubTip;

    constructor(
        private stubTipService: StubTipService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stubTipService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stubTipListModification',
                content: 'Deleted an stubTip'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stub-tip-delete-popup',
    template: ''
})
export class StubTipDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stubTipPopupService: StubTipPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.stubTipPopupService
                .open(StubTipDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
