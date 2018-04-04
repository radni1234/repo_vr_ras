import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Svetiljka } from './svetiljka.model';
import { SvetiljkaService } from './svetiljka.service';

@Component({
    selector: 'jhi-svetiljka-detail',
    templateUrl: './svetiljka-detail.component.html'
})
export class SvetiljkaDetailComponent implements OnInit, OnDestroy {

    svetiljka: Svetiljka;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private svetiljkaService: SvetiljkaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSvetiljkas();
    }

    load(id) {
        this.svetiljkaService.find(id)
            .subscribe((svetiljkaResponse: HttpResponse<Svetiljka>) => {
                this.svetiljka = svetiljkaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSvetiljkas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'svetiljkaListModification',
            (response) => this.load(this.svetiljka.id)
        );
    }
}
