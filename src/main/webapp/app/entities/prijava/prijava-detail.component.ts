import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Prijava } from './prijava.model';
import { PrijavaService } from './prijava.service';

@Component({
    selector: 'jhi-prijava-detail',
    templateUrl: './prijava-detail.component.html'
})
export class PrijavaDetailComponent implements OnInit, OnDestroy {

    prijava: Prijava;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private prijavaService: PrijavaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPrijavas();
    }

    load(id) {
        this.prijavaService.find(id)
            .subscribe((prijavaResponse: HttpResponse<Prijava>) => {
                this.prijava = prijavaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPrijavas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'prijavaListModification',
            (response) => this.load(this.prijava.id)
        );
    }
}
