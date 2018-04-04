import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { IntervencijaTip } from './intervencija-tip.model';
import { IntervencijaTipService } from './intervencija-tip.service';

@Injectable()
export class IntervencijaTipPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private intervencijaTipService: IntervencijaTipService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.intervencijaTipService.find(id)
                    .subscribe((intervencijaTipResponse: HttpResponse<IntervencijaTip>) => {
                        const intervencijaTip: IntervencijaTip = intervencijaTipResponse.body;
                        this.ngbModalRef = this.intervencijaTipModalRef(component, intervencijaTip);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.intervencijaTipModalRef(component, new IntervencijaTip());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    intervencijaTipModalRef(component: Component, intervencijaTip: IntervencijaTip): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.intervencijaTip = intervencijaTip;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
