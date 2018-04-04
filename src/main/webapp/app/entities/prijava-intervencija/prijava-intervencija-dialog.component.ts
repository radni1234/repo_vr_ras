import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PrijavaIntervencija } from './prijava-intervencija.model';
import { PrijavaIntervencijaPopupService } from './prijava-intervencija-popup.service';
import { PrijavaIntervencijaService } from './prijava-intervencija.service';
import { IntervencijaTip, IntervencijaTipService } from '../intervencija-tip';
import { PrijavaStatus, PrijavaStatusService } from '../prijava-status';

@Component({
    selector: 'jhi-prijava-intervencija-dialog',
    templateUrl: './prijava-intervencija-dialog.component.html'
})
export class PrijavaIntervencijaDialogComponent implements OnInit {

    prijavaIntervencija: PrijavaIntervencija;
    isSaving: boolean;

    intervencijatips: IntervencijaTip[];

    prijavastatuses: PrijavaStatus[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private prijavaIntervencijaService: PrijavaIntervencijaService,
        private intervencijaTipService: IntervencijaTipService,
        private prijavaStatusService: PrijavaStatusService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.intervencijaTipService.query()
            .subscribe((res: HttpResponse<IntervencijaTip[]>) => { this.intervencijatips = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.prijavaStatusService.query()
            .subscribe((res: HttpResponse<PrijavaStatus[]>) => { this.prijavastatuses = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.prijavaIntervencija.id !== undefined) {
            this.subscribeToSaveResponse(
                this.prijavaIntervencijaService.update(this.prijavaIntervencija));
        } else {
            this.subscribeToSaveResponse(
                this.prijavaIntervencijaService.create(this.prijavaIntervencija));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PrijavaIntervencija>>) {
        result.subscribe((res: HttpResponse<PrijavaIntervencija>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PrijavaIntervencija) {
        this.eventManager.broadcast({ name: 'prijavaIntervencijaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackIntervencijaTipById(index: number, item: IntervencijaTip) {
        return item.id;
    }

    trackPrijavaStatusById(index: number, item: PrijavaStatus) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-prijava-intervencija-popup',
    template: ''
})
export class PrijavaIntervencijaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private prijavaIntervencijaPopupService: PrijavaIntervencijaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.prijavaIntervencijaPopupService
                    .open(PrijavaIntervencijaDialogComponent as Component, params['id']);
            } else {
                this.prijavaIntervencijaPopupService
                    .open(PrijavaIntervencijaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
