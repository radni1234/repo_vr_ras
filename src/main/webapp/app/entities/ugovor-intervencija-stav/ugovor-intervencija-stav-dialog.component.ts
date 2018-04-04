import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UgovorIntervencijaStav } from './ugovor-intervencija-stav.model';
import { UgovorIntervencijaStavPopupService } from './ugovor-intervencija-stav-popup.service';
import { UgovorIntervencijaStavService } from './ugovor-intervencija-stav.service';
import { UgovorIntervencija, UgovorIntervencijaService } from '../ugovor-intervencija';
import { JedMere, JedMereService } from '../jed-mere';

@Component({
    selector: 'jhi-ugovor-intervencija-stav-dialog',
    templateUrl: './ugovor-intervencija-stav-dialog.component.html'
})
export class UgovorIntervencijaStavDialogComponent implements OnInit {

    ugovorIntervencijaStav: UgovorIntervencijaStav;
    isSaving: boolean;

    ugovorintervencijas: UgovorIntervencija[];

    jedmeres: JedMere[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ugovorIntervencijaStavService: UgovorIntervencijaStavService,
        private ugovorIntervencijaService: UgovorIntervencijaService,
        private jedMereService: JedMereService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ugovorIntervencijaService.query()
            .subscribe((res: HttpResponse<UgovorIntervencija[]>) => { this.ugovorintervencijas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.jedMereService.query()
            .subscribe((res: HttpResponse<JedMere[]>) => { this.jedmeres = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ugovorIntervencijaStav.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ugovorIntervencijaStavService.update(this.ugovorIntervencijaStav));
        } else {
            this.subscribeToSaveResponse(
                this.ugovorIntervencijaStavService.create(this.ugovorIntervencijaStav));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UgovorIntervencijaStav>>) {
        result.subscribe((res: HttpResponse<UgovorIntervencijaStav>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UgovorIntervencijaStav) {
        this.eventManager.broadcast({ name: 'ugovorIntervencijaStavListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUgovorIntervencijaById(index: number, item: UgovorIntervencija) {
        return item.id;
    }

    trackJedMereById(index: number, item: JedMere) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ugovor-intervencija-stav-popup',
    template: ''
})
export class UgovorIntervencijaStavPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ugovorIntervencijaStavPopupService: UgovorIntervencijaStavPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ugovorIntervencijaStavPopupService
                    .open(UgovorIntervencijaStavDialogComponent as Component, params['id']);
            } else {
                this.ugovorIntervencijaStavPopupService
                    .open(UgovorIntervencijaStavDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
