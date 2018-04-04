import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UgovorIntervencija } from './ugovor-intervencija.model';
import { UgovorIntervencijaService } from './ugovor-intervencija.service';

@Component({
    selector: 'jhi-ugovor-intervencija-detail',
    templateUrl: './ugovor-intervencija-detail.component.html'
})
export class UgovorIntervencijaDetailComponent implements OnInit, OnDestroy {

    ugovorIntervencija: UgovorIntervencija;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ugovorIntervencijaService: UgovorIntervencijaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUgovorIntervencijas();
    }

    load(id) {
        this.ugovorIntervencijaService.find(id)
            .subscribe((ugovorIntervencijaResponse: HttpResponse<UgovorIntervencija>) => {
                this.ugovorIntervencija = ugovorIntervencijaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUgovorIntervencijas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ugovorIntervencijaListModification',
            (response) => this.load(this.ugovorIntervencija.id)
        );
    }
}
