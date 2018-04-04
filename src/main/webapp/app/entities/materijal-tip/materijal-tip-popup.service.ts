import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { MaterijalTip } from './materijal-tip.model';
import { MaterijalTipService } from './materijal-tip.service';

@Injectable()
export class MaterijalTipPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private materijalTipService: MaterijalTipService

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
                this.materijalTipService.find(id)
                    .subscribe((materijalTipResponse: HttpResponse<MaterijalTip>) => {
                        const materijalTip: MaterijalTip = materijalTipResponse.body;
                        this.ngbModalRef = this.materijalTipModalRef(component, materijalTip);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.materijalTipModalRef(component, new MaterijalTip());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    materijalTipModalRef(component: Component, materijalTip: MaterijalTip): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.materijalTip = materijalTip;
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
