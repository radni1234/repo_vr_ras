import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IntervencijaTip } from './intervencija-tip.model';
import { IntervencijaTipService } from './intervencija-tip.service';

@Component({
    selector: 'jhi-intervencija-tip-detail',
    templateUrl: './intervencija-tip-detail.component.html'
})
export class IntervencijaTipDetailComponent implements OnInit, OnDestroy {

    intervencijaTip: IntervencijaTip;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private intervencijaTipService: IntervencijaTipService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIntervencijaTips();
    }

    load(id) {
        this.intervencijaTipService.find(id)
            .subscribe((intervencijaTipResponse: HttpResponse<IntervencijaTip>) => {
                this.intervencijaTip = intervencijaTipResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIntervencijaTips() {
        this.eventSubscriber = this.eventManager.subscribe(
            'intervencijaTipListModification',
            (response) => this.load(this.intervencijaTip.id)
        );
    }
}
