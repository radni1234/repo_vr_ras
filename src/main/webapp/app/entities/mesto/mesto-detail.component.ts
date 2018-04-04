import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Mesto } from './mesto.model';
import { MestoService } from './mesto.service';

@Component({
    selector: 'jhi-mesto-detail',
    templateUrl: './mesto-detail.component.html'
})
export class MestoDetailComponent implements OnInit, OnDestroy {

    mesto: Mesto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mestoService: MestoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMestos();
    }

    load(id) {
        this.mestoService.find(id)
            .subscribe((mestoResponse: HttpResponse<Mesto>) => {
                this.mesto = mestoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMestos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mestoListModification',
            (response) => this.load(this.mesto.id)
        );
    }
}
