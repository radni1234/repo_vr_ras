import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MaterijalTip } from './materijal-tip.model';
import { MaterijalTipPopupService } from './materijal-tip-popup.service';
import { MaterijalTipService } from './materijal-tip.service';

@Component({
    selector: 'jhi-materijal-tip-dialog',
    templateUrl: './materijal-tip-dialog.component.html'
})
export class MaterijalTipDialogComponent implements OnInit {

    materijalTip: MaterijalTip;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private materijalTipService: MaterijalTipService,
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
        if (this.materijalTip.id !== undefined) {
            this.subscribeToSaveResponse(
                this.materijalTipService.update(this.materijalTip));
        } else {
            this.subscribeToSaveResponse(
                this.materijalTipService.create(this.materijalTip));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MaterijalTip>>) {
        result.subscribe((res: HttpResponse<MaterijalTip>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MaterijalTip) {
        this.eventManager.broadcast({ name: 'materijalTipListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-materijal-tip-popup',
    template: ''
})
export class MaterijalTipPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private materijalTipPopupService: MaterijalTipPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.materijalTipPopupService
                    .open(MaterijalTipDialogComponent as Component, params['id']);
            } else {
                this.materijalTipPopupService
                    .open(MaterijalTipDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
