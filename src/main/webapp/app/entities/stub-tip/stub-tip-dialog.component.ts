import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StubTip } from './stub-tip.model';
import { StubTipPopupService } from './stub-tip-popup.service';
import { StubTipService } from './stub-tip.service';

@Component({
    selector: 'jhi-stub-tip-dialog',
    templateUrl: './stub-tip-dialog.component.html'
})
export class StubTipDialogComponent implements OnInit {

    stubTip: StubTip;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private stubTipService: StubTipService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stubTip.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stubTipService.update(this.stubTip));
        } else {
            this.subscribeToSaveResponse(
                this.stubTipService.create(this.stubTip));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StubTip>>) {
        result.subscribe((res: HttpResponse<StubTip>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StubTip) {
        this.eventManager.broadcast({ name: 'stubTipListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-stub-tip-popup',
    template: ''
})
export class StubTipPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stubTipPopupService: StubTipPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stubTipPopupService
                    .open(StubTipDialogComponent as Component, params['id']);
            } else {
                this.stubTipPopupService
                    .open(StubTipDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
