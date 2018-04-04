import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JedMere } from './jed-mere.model';
import { JedMerePopupService } from './jed-mere-popup.service';
import { JedMereService } from './jed-mere.service';

@Component({
    selector: 'jhi-jed-mere-delete-dialog',
    templateUrl: './jed-mere-delete-dialog.component.html'
})
export class JedMereDeleteDialogComponent {

    jedMere: JedMere;

    constructor(
        private jedMereService: JedMereService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jedMereService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jedMereListModification',
                content: 'Deleted an jedMere'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-jed-mere-delete-popup',
    template: ''
})
export class JedMereDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jedMerePopupService: JedMerePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jedMerePopupService
                .open(JedMereDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
