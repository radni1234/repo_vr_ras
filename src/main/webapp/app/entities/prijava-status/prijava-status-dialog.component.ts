import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PrijavaStatus } from './prijava-status.model';
import { PrijavaStatusPopupService } from './prijava-status-popup.service';
import { PrijavaStatusService } from './prijava-status.service';
import { Prijava, PrijavaService } from '../prijava';
import { Status, StatusService } from '../status';

@Component({
    selector: 'jhi-prijava-status-dialog',
    templateUrl: './prijava-status-dialog.component.html'
})
export class PrijavaStatusDialogComponent implements OnInit {

    prijavaStatus: PrijavaStatus;
    isSaving: boolean;

    prijavas: Prijava[];

    statuses: Status[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private prijavaStatusService: PrijavaStatusService,
        private prijavaService: PrijavaService,
        private statusService: StatusService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.prijavaService.query()
            .subscribe((res: HttpResponse<Prijava[]>) => { this.prijavas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.statusService.query()
            .subscribe((res: HttpResponse<Status[]>) => { this.statuses = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.prijavaStatus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.prijavaStatusService.update(this.prijavaStatus));
        } else {
            this.subscribeToSaveResponse(
                this.prijavaStatusService.create(this.prijavaStatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PrijavaStatus>>) {
        result.subscribe((res: HttpResponse<PrijavaStatus>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PrijavaStatus) {
        this.eventManager.broadcast({ name: 'prijavaStatusListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPrijavaById(index: number, item: Prijava) {
        return item.id;
    }

    trackStatusById(index: number, item: Status) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-prijava-status-popup',
    template: ''
})
export class PrijavaStatusPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private prijavaStatusPopupService: PrijavaStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.prijavaStatusPopupService
                    .open(PrijavaStatusDialogComponent as Component, params['id']);
            } else {
                this.prijavaStatusPopupService
                    .open(PrijavaStatusDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
