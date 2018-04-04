import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PrijavaIntervencija } from './prijava-intervencija.model';
import { PrijavaIntervencijaService } from './prijava-intervencija.service';

@Injectable()
export class PrijavaIntervencijaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private prijavaIntervencijaService: PrijavaIntervencijaService

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
                this.prijavaIntervencijaService.find(id)
                    .subscribe((prijavaIntervencijaResponse: HttpResponse<PrijavaIntervencija>) => {
                        const prijavaIntervencija: PrijavaIntervencija = prijavaIntervencijaResponse.body;
                        prijavaIntervencija.datum = this.datePipe
                            .transform(prijavaIntervencija.datum, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.prijavaIntervencijaModalRef(component, prijavaIntervencija);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.prijavaIntervencijaModalRef(component, new PrijavaIntervencija());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    prijavaIntervencijaModalRef(component: Component, prijavaIntervencija: PrijavaIntervencija): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.prijavaIntervencija = prijavaIntervencija;
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
