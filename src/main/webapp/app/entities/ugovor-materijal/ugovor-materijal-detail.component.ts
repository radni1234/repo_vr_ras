import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UgovorMaterijal } from './ugovor-materijal.model';
import { UgovorMaterijalService } from './ugovor-materijal.service';

@Component({
    selector: 'jhi-ugovor-materijal-detail',
    templateUrl: './ugovor-materijal-detail.component.html'
})
export class UgovorMaterijalDetailComponent implements OnInit, OnDestroy {

    ugovorMaterijal: UgovorMaterijal;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ugovorMaterijalService: UgovorMaterijalService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUgovorMaterijals();
    }

    load(id) {
        this.ugovorMaterijalService.find(id)
            .subscribe((ugovorMaterijalResponse: HttpResponse<UgovorMaterijal>) => {
                this.ugovorMaterijal = ugovorMaterijalResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUgovorMaterijals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ugovorMaterijalListModification',
            (response) => this.load(this.ugovorMaterijal.id)
        );
    }
}
