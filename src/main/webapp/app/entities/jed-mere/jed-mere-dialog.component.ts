import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JedMere } from './jed-mere.model';
import { JedMerePopupService } from './jed-mere-popup.service';
import { JedMereService } from './jed-mere.service';

@Component({
    selector: 'jhi-jed-mere-dialog',
    templateUrl: './jed-mere-dialog.component.html'
})
export class JedMereDialogComponent implements OnInit {

    jedMere: JedMere;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jedMereService: JedMereService,
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
        if (this.jedMere.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jedMereService.update(this.jedMere));
        } else {
            this.subscribeToSaveResponse(
                this.jedMereService.create(this.jedMere));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JedMere>>) {
        result.subscribe((res: HttpResponse<JedMere>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JedMere) {
        this.eventManager.broadcast({ name: 'jedMereListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-jed-mere-popup',
    template: ''
})
export class JedMerePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jedMerePopupService: JedMerePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jedMerePopupService
                    .open(JedMereDialogComponent as Component, params['id']);
            } else {
                this.jedMerePopupService
                    .open(JedMereDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
