import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PrijavaStatus } from './prijava-status.model';
import { PrijavaStatusService } from './prijava-status.service';

@Injectable()
export class PrijavaStatusPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private prijavaStatusService: PrijavaStatusService

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
                this.prijavaStatusService.find(id)
                    .subscribe((prijavaStatusResponse: HttpResponse<PrijavaStatus>) => {
                        const prijavaStatus: PrijavaStatus = prijavaStatusResponse.body;
                        prijavaStatus.datum = this.datePipe
                            .transform(prijavaStatus.datum, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.prijavaStatusModalRef(component, prijavaStatus);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.prijavaStatusModalRef(component, new PrijavaStatus());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    prijavaStatusModalRef(component: Component, prijavaStatus: PrijavaStatus): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.prijavaStatus = prijavaStatus;
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
