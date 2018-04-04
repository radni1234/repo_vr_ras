import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Stub } from './stub.model';
import { StubPopupService } from './stub-popup.service';
import { StubService } from './stub.service';

@Component({
    selector: 'jhi-stub-delete-dialog',
    templateUrl: './stub-delete-dialog.component.html'
})
export class StubDeleteDialogComponent {

    stub: Stub;

    constructor(
        private stubService: StubService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stubService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stubListModification',
                content: 'Deleted an stub'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stub-delete-popup',
    template: ''
})
export class StubDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stubPopupService: StubPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.stubPopupService
                .open(StubDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
