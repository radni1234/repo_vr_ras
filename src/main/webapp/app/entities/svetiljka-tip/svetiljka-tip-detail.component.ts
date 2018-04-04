import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SvetiljkaTip } from './svetiljka-tip.model';
import { SvetiljkaTipService } from './svetiljka-tip.service';

@Component({
    selector: 'jhi-svetiljka-tip-detail',
    templateUrl: './svetiljka-tip-detail.component.html'
})
export class SvetiljkaTipDetailComponent implements OnInit, OnDestroy {

    svetiljkaTip: SvetiljkaTip;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private svetiljkaTipService: SvetiljkaTipService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSvetiljkaTips();
    }

    load(id) {
        this.svetiljkaTipService.find(id)
            .subscribe((svetiljkaTipResponse: HttpResponse<SvetiljkaTip>) => {
                this.svetiljkaTip = svetiljkaTipResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSvetiljkaTips() {
        this.eventSubscriber = this.eventManager.subscribe(
            'svetiljkaTipListModification',
            (response) => this.load(this.svetiljkaTip.id)
        );
    }
}
