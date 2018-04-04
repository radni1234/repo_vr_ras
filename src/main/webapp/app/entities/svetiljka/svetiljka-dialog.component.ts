import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Svetiljka } from './svetiljka.model';
import { SvetiljkaPopupService } from './svetiljka-popup.service';
import { SvetiljkaService } from './svetiljka.service';
import { Stub, StubService } from '../stub';
import { SvetiljkaTip, SvetiljkaTipService } from '../svetiljka-tip';

@Component({
    selector: 'jhi-svetiljka-dialog',
    templateUrl: './svetiljka-dialog.component.html'
})
export class SvetiljkaDialogComponent implements OnInit {

    svetiljka: Svetiljka;
    isSaving: boolean;

    stubs: Stub[];

    svetiljkatips: SvetiljkaTip[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private svetiljkaService: SvetiljkaService,
        private stubService: StubService,
        private svetiljkaTipService: SvetiljkaTipService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.stubService.query()
            .subscribe((res: HttpResponse<Stub[]>) => { this.stubs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.svetiljkaTipService.query()
            .subscribe((res: HttpResponse<SvetiljkaTip[]>) => { this.svetiljkatips = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.svetiljka.id !== undefined) {
            this.subscribeToSaveResponse(
                this.svetiljkaService.update(this.svetiljka));
        } else {
            this.subscribeToSaveResponse(
                this.svetiljkaService.create(this.svetiljka));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Svetiljka>>) {
        result.subscribe((res: HttpResponse<Svetiljka>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Svetiljka) {
        this.eventManager.broadcast({ name: 'svetiljkaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStubById(index: number, item: Stub) {
        return item.id;
    }

    trackSvetiljkaTipById(index: number, item: SvetiljkaTip) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-svetiljka-popup',
    template: ''
})
export class SvetiljkaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private svetiljkaPopupService: SvetiljkaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.svetiljkaPopupService
                    .open(SvetiljkaDialogComponent as Component, params['id']);
            } else {
                this.svetiljkaPopupService
                    .open(SvetiljkaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
