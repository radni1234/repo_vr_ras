import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SvetiljkaTip } from './svetiljka-tip.model';
import { SvetiljkaTipService } from './svetiljka-tip.service';

@Injectable()
export class SvetiljkaTipPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private svetiljkaTipService: SvetiljkaTipService

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
                this.svetiljkaTipService.find(id)
                    .subscribe((svetiljkaTipResponse: HttpResponse<SvetiljkaTip>) => {
                        const svetiljkaTip: SvetiljkaTip = svetiljkaTipResponse.body;
                        this.ngbModalRef = this.svetiljkaTipModalRef(component, svetiljkaTip);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.svetiljkaTipModalRef(component, new SvetiljkaTip());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    svetiljkaTipModalRef(component: Component, svetiljkaTip: SvetiljkaTip): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.svetiljkaTip = svetiljkaTip;
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
