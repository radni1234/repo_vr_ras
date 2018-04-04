import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UgovorMaterijalStav } from './ugovor-materijal-stav.model';
import { UgovorMaterijalStavService } from './ugovor-materijal-stav.service';

@Injectable()
export class UgovorMaterijalStavPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private ugovorMaterijalStavService: UgovorMaterijalStavService

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
                this.ugovorMaterijalStavService.find(id)
                    .subscribe((ugovorMaterijalStavResponse: HttpResponse<UgovorMaterijalStav>) => {
                        const ugovorMaterijalStav: UgovorMaterijalStav = ugovorMaterijalStavResponse.body;
                        this.ngbModalRef = this.ugovorMaterijalStavModalRef(component, ugovorMaterijalStav);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ugovorMaterijalStavModalRef(component, new UgovorMaterijalStav());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ugovorMaterijalStavModalRef(component: Component, ugovorMaterijalStav: UgovorMaterijalStav): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ugovorMaterijalStav = ugovorMaterijalStav;
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
