import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IntervencijaTip } from './intervencija-tip.model';
import { IntervencijaTipPopupService } from './intervencija-tip-popup.service';
import { IntervencijaTipService } from './intervencija-tip.service';

@Component({
    selector: 'jhi-intervencija-tip-dialog',
    templateUrl: './intervencija-tip-dialog.component.html'
})
export class IntervencijaTipDialogComponent implements OnInit {

    intervencijaTip: IntervencijaTip;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private intervencijaTipService: IntervencijaTipService,
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
        if (this.intervencijaTip.id !== undefined) {
            this.subscribeToSaveResponse(
                this.intervencijaTipService.update(this.intervencijaTip));
        } else {
            this.subscribeToSaveResponse(
                this.intervencijaTipService.create(this.intervencijaTip));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IntervencijaTip>>) {
        result.subscribe((res: HttpResponse<IntervencijaTip>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IntervencijaTip) {
        this.eventManager.broadcast({ name: 'intervencijaTipListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-intervencija-tip-popup',
    template: ''
})
export class IntervencijaTipPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private intervencijaTipPopupService: IntervencijaTipPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.intervencijaTipPopupService
                    .open(IntervencijaTipDialogComponent as Component, params['id']);
            } else {
                this.intervencijaTipPopupService
                    .open(IntervencijaTipDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
