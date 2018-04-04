import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UgovorMaterijal } from './ugovor-materijal.model';
import { UgovorMaterijalService } from './ugovor-materijal.service';

@Injectable()
export class UgovorMaterijalPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private ugovorMaterijalService: UgovorMaterijalService

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
                this.ugovorMaterijalService.find(id)
                    .subscribe((ugovorMaterijalResponse: HttpResponse<UgovorMaterijal>) => {
                        const ugovorMaterijal: UgovorMaterijal = ugovorMaterijalResponse.body;
                        if (ugovorMaterijal.datumOd) {
                            ugovorMaterijal.datumOd = {
                                year: ugovorMaterijal.datumOd.getFullYear(),
                                month: ugovorMaterijal.datumOd.getMonth() + 1,
                                day: ugovorMaterijal.datumOd.getDate()
                            };
                        }
                        if (ugovorMaterijal.datumDo) {
                            ugovorMaterijal.datumDo = {
                                year: ugovorMaterijal.datumDo.getFullYear(),
                                month: ugovorMaterijal.datumDo.getMonth() + 1,
                                day: ugovorMaterijal.datumDo.getDate()
                            };
                        }
                        this.ngbModalRef = this.ugovorMaterijalModalRef(component, ugovorMaterijal);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ugovorMaterijalModalRef(component, new UgovorMaterijal());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ugovorMaterijalModalRef(component: Component, ugovorMaterijal: UgovorMaterijal): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ugovorMaterijal = ugovorMaterijal;
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
