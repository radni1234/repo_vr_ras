import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StubTip } from './stub-tip.model';
import { StubTipService } from './stub-tip.service';

@Component({
    selector: 'jhi-stub-tip-detail',
    templateUrl: './stub-tip-detail.component.html'
})
export class StubTipDetailComponent implements OnInit, OnDestroy {

    stubTip: StubTip;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stubTipService: StubTipService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStubTips();
    }

    load(id) {
        this.stubTipService.find(id)
            .subscribe((stubTipResponse: HttpResponse<StubTip>) => {
                this.stubTip = stubTipResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStubTips() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stubTipListModification',
            (response) => this.load(this.stubTip.id)
        );
    }
}
