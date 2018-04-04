import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PrijavaMaterijal } from './prijava-materijal.model';
import { PrijavaMaterijalService } from './prijava-materijal.service';

@Component({
    selector: 'jhi-prijava-materijal-detail',
    templateUrl: './prijava-materijal-detail.component.html'
})
export class PrijavaMaterijalDetailComponent implements OnInit, OnDestroy {

    prijavaMaterijal: PrijavaMaterijal;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private prijavaMaterijalService: PrijavaMaterijalService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPrijavaMaterijals();
    }

    load(id) {
        this.prijavaMaterijalService.find(id)
            .subscribe((prijavaMaterijalResponse: HttpResponse<PrijavaMaterijal>) => {
                this.prijavaMaterijal = prijavaMaterijalResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPrijavaMaterijals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'prijavaMaterijalListModification',
            (response) => this.load(this.prijavaMaterijal.id)
        );
    }
}
