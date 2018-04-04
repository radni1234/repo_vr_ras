import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UgovorMaterijalStav } from './ugovor-materijal-stav.model';
import { UgovorMaterijalStavService } from './ugovor-materijal-stav.service';

@Component({
    selector: 'jhi-ugovor-materijal-stav-detail',
    templateUrl: './ugovor-materijal-stav-detail.component.html'
})
export class UgovorMaterijalStavDetailComponent implements OnInit, OnDestroy {

    ugovorMaterijalStav: UgovorMaterijalStav;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ugovorMaterijalStavService: UgovorMaterijalStavService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUgovorMaterijalStavs();
    }

    load(id) {
        this.ugovorMaterijalStavService.find(id)
            .subscribe((ugovorMaterijalStavResponse: HttpResponse<UgovorMaterijalStav>) => {
                this.ugovorMaterijalStav = ugovorMaterijalStavResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUgovorMaterijalStavs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ugovorMaterijalStavListModification',
            (response) => this.load(this.ugovorMaterijalStav.id)
        );
    }
}
