import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PrijavaIntervencija } from './prijava-intervencija.model';
import { PrijavaIntervencijaService } from './prijava-intervencija.service';

@Component({
    selector: 'jhi-prijava-intervencija-detail',
    templateUrl: './prijava-intervencija-detail.component.html'
})
export class PrijavaIntervencijaDetailComponent implements OnInit, OnDestroy {

    prijavaIntervencija: PrijavaIntervencija;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private prijavaIntervencijaService: PrijavaIntervencijaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPrijavaIntervencijas();
    }

    load(id) {
        this.prijavaIntervencijaService.find(id)
            .subscribe((prijavaIntervencijaResponse: HttpResponse<PrijavaIntervencija>) => {
                this.prijavaIntervencija = prijavaIntervencijaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPrijavaIntervencijas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'prijavaIntervencijaListModification',
            (response) => this.load(this.prijavaIntervencija.id)
        );
    }
}
