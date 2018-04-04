import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UgovorIntervencijaStav } from './ugovor-intervencija-stav.model';
import { UgovorIntervencijaStavService } from './ugovor-intervencija-stav.service';

@Injectable()
export class UgovorIntervencijaStavPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private ugovorIntervencijaStavService: UgovorIntervencijaStavService

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
                this.ugovorIntervencijaStavService.find(id)
                    .subscribe((ugovorIntervencijaStavResponse: HttpResponse<UgovorIntervencijaStav>) => {
                        const ugovorIntervencijaStav: UgovorIntervencijaStav = ugovorIntervencijaStavResponse.body;
                        this.ngbModalRef = this.ugovorIntervencijaStavModalRef(component, ugovorIntervencijaStav);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ugovorIntervencijaStavModalRef(component, new UgovorIntervencijaStav());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ugovorIntervencijaStavModalRef(component: Component, ugovorIntervencijaStav: UgovorIntervencijaStav): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ugovorIntervencijaStav = ugovorIntervencijaStav;
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
