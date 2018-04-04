import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UgovorIntervencijaStav } from './ugovor-intervencija-stav.model';
import { UgovorIntervencijaStavService } from './ugovor-intervencija-stav.service';

@Component({
    selector: 'jhi-ugovor-intervencija-stav-detail',
    templateUrl: './ugovor-intervencija-stav-detail.component.html'
})
export class UgovorIntervencijaStavDetailComponent implements OnInit, OnDestroy {

    ugovorIntervencijaStav: UgovorIntervencijaStav;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ugovorIntervencijaStavService: UgovorIntervencijaStavService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUgovorIntervencijaStavs();
    }

    load(id) {
        this.ugovorIntervencijaStavService.find(id)
            .subscribe((ugovorIntervencijaStavResponse: HttpResponse<UgovorIntervencijaStav>) => {
                this.ugovorIntervencijaStav = ugovorIntervencijaStavResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUgovorIntervencijaStavs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ugovorIntervencijaStavListModification',
            (response) => this.load(this.ugovorIntervencijaStav.id)
        );
    }
}
