import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PrijavaMaterijal } from './prijava-materijal.model';
import { PrijavaMaterijalPopupService } from './prijava-materijal-popup.service';
import { PrijavaMaterijalService } from './prijava-materijal.service';
import { MaterijalTip, MaterijalTipService } from '../materijal-tip';
import { PrijavaIntervencija, PrijavaIntervencijaService } from '../prijava-intervencija';

@Component({
    selector: 'jhi-prijava-materijal-dialog',
    templateUrl: './prijava-materijal-dialog.component.html'
})
export class PrijavaMaterijalDialogComponent implements OnInit {

    prijavaMaterijal: PrijavaMaterijal;
    isSaving: boolean;

    materijaltips: MaterijalTip[];

    prijavaintervencijas: PrijavaIntervencija[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private prijavaMaterijalService: PrijavaMaterijalService,
        private materijalTipService: MaterijalTipService,
        private prijavaIntervencijaService: PrijavaIntervencijaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.materijalTipService.query()
            .subscribe((res: HttpResponse<MaterijalTip[]>) => { this.materijaltips = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.prijavaIntervencijaService.query()
            .subscribe((res: HttpResponse<PrijavaIntervencija[]>) => { this.prijavaintervencijas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.prijavaMaterijal.id !== undefined) {
            this.subscribeToSaveResponse(
                this.prijavaMaterijalService.update(this.prijavaMaterijal));
        } else {
            this.subscribeToSaveResponse(
                this.prijavaMaterijalService.create(this.prijavaMaterijal));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PrijavaMaterijal>>) {
        result.subscribe((res: HttpResponse<PrijavaMaterijal>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PrijavaMaterijal) {
        this.eventManager.broadcast({ name: 'prijavaMaterijalListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMaterijalTipById(index: number, item: MaterijalTip) {
        return item.id;
    }

    trackPrijavaIntervencijaById(index: number, item: PrijavaIntervencija) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-prijava-materijal-popup',
    template: ''
})
export class PrijavaMaterijalPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private prijavaMaterijalPopupService: PrijavaMaterijalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.prijavaMaterijalPopupService
                    .open(PrijavaMaterijalDialogComponent as Component, params['id']);
            } else {
                this.prijavaMaterijalPopupService
                    .open(PrijavaMaterijalDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
