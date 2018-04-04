import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Prijava } from './prijava.model';
import { PrijavaPopupService } from './prijava-popup.service';
import { PrijavaService } from './prijava.service';
import { Stub, StubService } from '../stub';

@Component({
    selector: 'jhi-prijava-dialog',
    templateUrl: './prijava-dialog.component.html'
})
export class PrijavaDialogComponent implements OnInit {

    prijava: Prijava;
    isSaving: boolean;

    stubs: Stub[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private prijavaService: PrijavaService,
        private stubService: StubService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.stubService.query()
            .subscribe((res: HttpResponse<Stub[]>) => { this.stubs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.prijava.id !== undefined) {
            this.subscribeToSaveResponse(
                this.prijavaService.update(this.prijava));
        } else {
            this.subscribeToSaveResponse(
                this.prijavaService.create(this.prijava));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Prijava>>) {
        result.subscribe((res: HttpResponse<Prijava>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Prijava) {
        this.eventManager.broadcast({ name: 'prijavaListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-prijava-popup',
    template: ''
})
export class PrijavaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private prijavaPopupService: PrijavaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.prijavaPopupService
                    .open(PrijavaDialogComponent as Component, params['id']);
            } else {
                this.prijavaPopupService
                    .open(PrijavaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
