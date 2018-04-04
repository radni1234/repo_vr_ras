import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PrijavaStatus } from './prijava-status.model';
import { PrijavaStatusService } from './prijava-status.service';

@Component({
    selector: 'jhi-prijava-status-detail',
    templateUrl: './prijava-status-detail.component.html'
})
export class PrijavaStatusDetailComponent implements OnInit, OnDestroy {

    prijavaStatus: PrijavaStatus;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private prijavaStatusService: PrijavaStatusService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPrijavaStatuses();
    }

    load(id) {
        this.prijavaStatusService.find(id)
            .subscribe((prijavaStatusResponse: HttpResponse<PrijavaStatus>) => {
                this.prijavaStatus = prijavaStatusResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPrijavaStatuses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'prijavaStatusListModification',
            (response) => this.load(this.prijavaStatus.id)
        );
    }
}
