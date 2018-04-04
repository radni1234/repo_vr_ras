import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MaterijalTip } from './materijal-tip.model';
import { MaterijalTipService } from './materijal-tip.service';

@Component({
    selector: 'jhi-materijal-tip-detail',
    templateUrl: './materijal-tip-detail.component.html'
})
export class MaterijalTipDetailComponent implements OnInit, OnDestroy {

    materijalTip: MaterijalTip;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private materijalTipService: MaterijalTipService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMaterijalTips();
    }

    load(id) {
        this.materijalTipService.find(id)
            .subscribe((materijalTipResponse: HttpResponse<MaterijalTip>) => {
                this.materijalTip = materijalTipResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMaterijalTips() {
        this.eventSubscriber = this.eventManager.subscribe(
            'materijalTipListModification',
            (response) => this.load(this.materijalTip.id)
        );
    }
}
