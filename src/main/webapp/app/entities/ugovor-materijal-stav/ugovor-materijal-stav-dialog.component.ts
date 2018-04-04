import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UgovorMaterijalStav } from './ugovor-materijal-stav.model';
import { UgovorMaterijalStavPopupService } from './ugovor-materijal-stav-popup.service';
import { UgovorMaterijalStavService } from './ugovor-materijal-stav.service';
import { UgovorMaterijal, UgovorMaterijalService } from '../ugovor-materijal';
import { JedMere, JedMereService } from '../jed-mere';

@Component({
    selector: 'jhi-ugovor-materijal-stav-dialog',
    templateUrl: './ugovor-materijal-stav-dialog.component.html'
})
export class UgovorMaterijalStavDialogComponent implements OnInit {

    ugovorMaterijalStav: UgovorMaterijalStav;
    isSaving: boolean;

    ugovormaterijals: UgovorMaterijal[];

    jedmeres: JedMere[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ugovorMaterijalStavService: UgovorMaterijalStavService,
        private ugovorMaterijalService: UgovorMaterijalService,
        private jedMereService: JedMereService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ugovorMaterijalService.query()
            .subscribe((res: HttpResponse<UgovorMaterijal[]>) => { this.ugovormaterijals = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.jedMereService.query()
            .subscribe((res: HttpResponse<JedMere[]>) => { this.jedmeres = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ugovorMaterijalStav.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ugovorMaterijalStavService.update(this.ugovorMaterijalStav));
        } else {
            this.subscribeToSaveResponse(
                this.ugovorMaterijalStavService.create(this.ugovorMaterijalStav));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UgovorMaterijalStav>>) {
        result.subscribe((res: HttpResponse<UgovorMaterijalStav>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UgovorMaterijalStav) {
        this.eventManager.broadcast({ name: 'ugovorMaterijalStavListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUgovorMaterijalById(index: number, item: UgovorMaterijal) {
        return item.id;
    }

    trackJedMereById(index: number, item: JedMere) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ugovor-materijal-stav-popup',
    template: ''
})
export class UgovorMaterijalStavPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ugovorMaterijalStavPopupService: UgovorMaterijalStavPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ugovorMaterijalStavPopupService
                    .open(UgovorMaterijalStavDialogComponent as Component, params['id']);
            } else {
                this.ugovorMaterijalStavPopupService
                    .open(UgovorMaterijalStavDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
