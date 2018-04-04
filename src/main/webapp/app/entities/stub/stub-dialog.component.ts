import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Stub } from './stub.model';
import { StubPopupService } from './stub-popup.service';
import { StubService } from './stub.service';
import { Mesto, MestoService } from '../mesto';
import { StubTip, StubTipService } from '../stub-tip';
import { Status, StatusService } from '../status';

@Component({
    selector: 'jhi-stub-dialog',
    templateUrl: './stub-dialog.component.html'
})
export class StubDialogComponent implements OnInit {

    stub: Stub;
    isSaving: boolean;

    mestos: Mesto[];

    stubtips: StubTip[];

    statuses: Status[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stubService: StubService,
        private mestoService: MestoService,
        private stubTipService: StubTipService,
        private statusService: StatusService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.mestoService.query()
            .subscribe((res: HttpResponse<Mesto[]>) => { this.mestos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.stubTipService.query()
            .subscribe((res: HttpResponse<StubTip[]>) => { this.stubtips = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.statusService.query()
            .subscribe((res: HttpResponse<Status[]>) => { this.statuses = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stub.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stubService.update(this.stub));
        } else {
            this.subscribeToSaveResponse(
                this.stubService.create(this.stub));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Stub>>) {
        result.subscribe((res: HttpResponse<Stub>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Stub) {
        this.eventManager.broadcast({ name: 'stubListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMestoById(index: number, item: Mesto) {
        return item.id;
    }

    trackStubTipById(index: number, item: StubTip) {
        return item.id;
    }

    trackStatusById(index: number, item: Status) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-stub-popup',
    template: ''
})
export class StubPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stubPopupService: StubPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stubPopupService
                    .open(StubDialogComponent as Component, params['id']);
            } else {
                this.stubPopupService
                    .open(StubDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
