import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Opstina } from './opstina.model';
import { OpstinaService } from './opstina.service';

@Component({
    selector: 'jhi-opstina-detail',
    templateUrl: './opstina-detail.component.html'
})
export class OpstinaDetailComponent implements OnInit, OnDestroy {

    opstina: Opstina;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private opstinaService: OpstinaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOpstinas();
    }

    load(id) {
        this.opstinaService.find(id)
            .subscribe((opstinaResponse: HttpResponse<Opstina>) => {
                this.opstina = opstinaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOpstinas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'opstinaListModification',
            (response) => this.load(this.opstina.id)
        );
    }
}
