import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JedMere } from './jed-mere.model';
import { JedMereService } from './jed-mere.service';

@Component({
    selector: 'jhi-jed-mere-detail',
    templateUrl: './jed-mere-detail.component.html'
})
export class JedMereDetailComponent implements OnInit, OnDestroy {

    jedMere: JedMere;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jedMereService: JedMereService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJedMeres();
    }

    load(id) {
        this.jedMereService.find(id)
            .subscribe((jedMereResponse: HttpResponse<JedMere>) => {
                this.jedMere = jedMereResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJedMeres() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jedMereListModification',
            (response) => this.load(this.jedMere.id)
        );
    }
}
