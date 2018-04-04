import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UgovorIntervencija } from './ugovor-intervencija.model';
import { UgovorIntervencijaPopupService } from './ugovor-intervencija-popup.service';
import { UgovorIntervencijaService } from './ugovor-intervencija.service';
import { Opstina, OpstinaService } from '../opstina';

@Component({
    selector: 'jhi-ugovor-intervencija-dialog',
    templateUrl: './ugovor-intervencija-dialog.component.html'
})
export class UgovorIntervencijaDialogComponent implements OnInit {

    ugovorIntervencija: UgovorIntervencija;
    isSaving: boolean;

    opstinas: Opstina[];
    datumOdDp: any;
    datumDoDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ugovorIntervencijaService: UgovorIntervencijaService,
        private opstinaService: OpstinaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.opstinaService.query()
            .subscribe((res: HttpResponse<Opstina[]>) => { this.opstinas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ugovorIntervencija.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ugovorIntervencijaService.update(this.ugovorIntervencija));
        } else {
            this.subscribeToSaveResponse(
                this.ugovorIntervencijaService.create(this.ugovorIntervencija));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UgovorIntervencija>>) {
        result.subscribe((res: HttpResponse<UgovorIntervencija>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UgovorIntervencija) {
        this.eventManager.broadcast({ name: 'ugovorIntervencijaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOpstinaById(index: number, item: Opstina) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ugovor-intervencija-popup',
    template: ''
})
export class UgovorIntervencijaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ugovorIntervencijaPopupService: UgovorIntervencijaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ugovorIntervencijaPopupService
                    .open(UgovorIntervencijaDialogComponent as Component, params['id']);
            } else {
                this.ugovorIntervencijaPopupService
                    .open(UgovorIntervencijaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
