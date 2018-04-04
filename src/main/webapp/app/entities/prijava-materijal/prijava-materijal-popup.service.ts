import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PrijavaMaterijal } from './prijava-materijal.model';
import { PrijavaMaterijalService } from './prijava-materijal.service';

@Injectable()
export class PrijavaMaterijalPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private prijavaMaterijalService: PrijavaMaterijalService

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
                this.prijavaMaterijalService.find(id)
                    .subscribe((prijavaMaterijalResponse: HttpResponse<PrijavaMaterijal>) => {
                        const prijavaMaterijal: PrijavaMaterijal = prijavaMaterijalResponse.body;
                        prijavaMaterijal.datum = this.datePipe
                            .transform(prijavaMaterijal.datum, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.prijavaMaterijalModalRef(component, prijavaMaterijal);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.prijavaMaterijalModalRef(component, new PrijavaMaterijal());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    prijavaMaterijalModalRef(component: Component, prijavaMaterijal: PrijavaMaterijal): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.prijavaMaterijal = prijavaMaterijal;
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
