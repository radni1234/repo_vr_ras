import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Stub } from './stub.model';
import { StubService } from './stub.service';

@Component({
    selector: 'jhi-stub-detail',
    templateUrl: './stub-detail.component.html'
})
export class StubDetailComponent implements OnInit, OnDestroy {

    stub: Stub;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stubService: StubService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStubs();
    }

    load(id) {
        this.stubService.find(id)
            .subscribe((stubResponse: HttpResponse<Stub>) => {
                this.stub = stubResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStubs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stubListModification',
            (response) => this.load(this.stub.id)
        );
    }
}
