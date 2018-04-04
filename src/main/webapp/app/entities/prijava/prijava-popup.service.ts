import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Prijava } from './prijava.model';
import { PrijavaService } from './prijava.service';

@Injectable()
export class PrijavaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private prijavaService: PrijavaService

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
                this.prijavaService.find(id)
                    .subscribe((prijavaResponse: HttpResponse<Prijava>) => {
                        const prijava: Prijava = prijavaResponse.body;
                        prijava.datum = this.datePipe
                            .transform(prijava.datum, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.prijavaModalRef(component, prijava);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.prijavaModalRef(component, new Prijava());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    prijavaModalRef(component: Component, prijava: Prijava): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.prijava = prijava;
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
