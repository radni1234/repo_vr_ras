import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Mesto } from './mesto.model';
import { MestoPopupService } from './mesto-popup.service';
import { MestoService } from './mesto.service';
import { Opstina, OpstinaService } from '../opstina';

@Component({
    selector: 'jhi-mesto-dialog',
    templateUrl: './mesto-dialog.component.html'
})
export class MestoDialogComponent implements OnInit {

    mesto: Mesto;
    isSaving: boolean;

    opstinas: Opstina[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private mestoService: MestoService,
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
        if (this.mesto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mestoService.update(this.mesto));
        } else {
            this.subscribeToSaveResponse(
                this.mestoService.create(this.mesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Mesto>>) {
        result.subscribe((res: HttpResponse<Mesto>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Mesto) {
        this.eventManager.broadcast({ name: 'mestoListModification', content: 'OK'});
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
    selector: 'jhi-mesto-popup',
    template: ''
})
export class MestoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mestoPopupService: MestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mestoPopupService
                    .open(MestoDialogComponent as Component, params['id']);
            } else {
                this.mestoPopupService
                    .open(MestoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
