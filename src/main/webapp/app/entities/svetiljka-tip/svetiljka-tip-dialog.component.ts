import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SvetiljkaTip } from './svetiljka-tip.model';
import { SvetiljkaTipPopupService } from './svetiljka-tip-popup.service';
import { SvetiljkaTipService } from './svetiljka-tip.service';

@Component({
    selector: 'jhi-svetiljka-tip-dialog',
    templateUrl: './svetiljka-tip-dialog.component.html'
})
export class SvetiljkaTipDialogComponent implements OnInit {

    svetiljkaTip: SvetiljkaTip;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private svetiljkaTipService: SvetiljkaTipService,
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
        if (this.svetiljkaTip.id !== undefined) {
            this.subscribeToSaveResponse(
                this.svetiljkaTipService.update(this.svetiljkaTip));
        } else {
            this.subscribeToSaveResponse(
                this.svetiljkaTipService.create(this.svetiljkaTip));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SvetiljkaTip>>) {
        result.subscribe((res: HttpResponse<SvetiljkaTip>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SvetiljkaTip) {
        this.eventManager.broadcast({ name: 'svetiljkaTipListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-svetiljka-tip-popup',
    template: ''
})
export class SvetiljkaTipPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private svetiljkaTipPopupService: SvetiljkaTipPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.svetiljkaTipPopupService
                    .open(SvetiljkaTipDialogComponent as Component, params['id']);
            } else {
                this.svetiljkaTipPopupService
                    .open(SvetiljkaTipDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
