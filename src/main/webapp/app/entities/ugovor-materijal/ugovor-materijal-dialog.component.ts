import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UgovorMaterijal } from './ugovor-materijal.model';
import { UgovorMaterijalPopupService } from './ugovor-materijal-popup.service';
import { UgovorMaterijalService } from './ugovor-materijal.service';
import { Opstina, OpstinaService } from '../opstina';

@Component({
    selector: 'jhi-ugovor-materijal-dialog',
    templateUrl: './ugovor-materijal-dialog.component.html'
})
export class UgovorMaterijalDialogComponent implements OnInit {

    ugovorMaterijal: UgovorMaterijal;
    isSaving: boolean;

    opstinas: Opstina[];
    datumOdDp: any;
    datumDoDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ugovorMaterijalService: UgovorMaterijalService,
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
        if (this.ugovorMaterijal.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ugovorMaterijalService.update(this.ugovorMaterijal));
        } else {
            this.subscribeToSaveResponse(
                this.ugovorMaterijalService.create(this.ugovorMaterijal));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UgovorMaterijal>>) {
        result.subscribe((res: HttpResponse<UgovorMaterijal>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UgovorMaterijal) {
        this.eventManager.broadcast({ name: 'ugovorMaterijalListModification', content: 'OK'});
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
    selector: 'jhi-ugovor-materijal-popup',
    template: ''
})
export class UgovorMaterijalPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ugovorMaterijalPopupService: UgovorMaterijalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ugovorMaterijalPopupService
                    .open(UgovorMaterijalDialogComponent as Component, params['id']);
            } else {
                this.ugovorMaterijalPopupService
                    .open(UgovorMaterijalDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
