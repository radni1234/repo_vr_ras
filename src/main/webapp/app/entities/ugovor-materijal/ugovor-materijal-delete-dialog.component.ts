import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UgovorMaterijal } from './ugovor-materijal.model';
import { UgovorMaterijalPopupService } from './ugovor-materijal-popup.service';
import { UgovorMaterijalService } from './ugovor-materijal.service';

@Component({
    selector: 'jhi-ugovor-materijal-delete-dialog',
    templateUrl: './ugovor-materijal-delete-dialog.component.html'
})
export class UgovorMaterijalDeleteDialogComponent {

    ugovorMaterijal: UgovorMaterijal;

    constructor(
        private ugovorMaterijalService: UgovorMaterijalService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ugovorMaterijalService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ugovorMaterijalListModification',
                content: 'Deleted an ugovorMaterijal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ugovor-materijal-delete-popup',
    template: ''
})
export class UgovorMaterijalDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ugovorMaterijalPopupService: UgovorMaterijalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ugovorMaterijalPopupService
                .open(UgovorMaterijalDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
