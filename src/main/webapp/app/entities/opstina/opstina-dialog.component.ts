import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Opstina } from './opstina.model';
import { OpstinaPopupService } from './opstina-popup.service';
import { OpstinaService } from './opstina.service';

@Component({
    selector: 'jhi-opstina-dialog',
    templateUrl: './opstina-dialog.component.html'
})
export class OpstinaDialogComponent implements OnInit {

    opstina: Opstina;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private opstinaService: OpstinaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.opstina.id !== undefined) {
            this.subscribeToSaveResponse(
                this.opstinaService.update(this.opstina));
        } else {
            this.subscribeToSaveResponse(
                this.opstinaService.create(this.opstina));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Opstina>>) {
        result.subscribe((res: HttpResponse<Opstina>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Opstina) {
        this.eventManager.broadcast({ name: 'opstinaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-opstina-popup',
    template: ''
})
export class OpstinaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private opstinaPopupService: OpstinaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.opstinaPopupService
                    .open(OpstinaDialogComponent as Component, params['id']);
            } else {
                this.opstinaPopupService
                    .open(OpstinaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
