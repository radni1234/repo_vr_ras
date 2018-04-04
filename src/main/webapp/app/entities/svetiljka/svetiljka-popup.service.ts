import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Svetiljka } from './svetiljka.model';
import { SvetiljkaService } from './svetiljka.service';

@Injectable()
export class SvetiljkaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private svetiljkaService: SvetiljkaService

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
                this.svetiljkaService.find(id)
                    .subscribe((svetiljkaResponse: HttpResponse<Svetiljka>) => {
                        const svetiljka: Svetiljka = svetiljkaResponse.body;
                        this.ngbModalRef = this.svetiljkaModalRef(component, svetiljka);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.svetiljkaModalRef(component, new Svetiljka());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    svetiljkaModalRef(component: Component, svetiljka: Svetiljka): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.svetiljka = svetiljka;
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
