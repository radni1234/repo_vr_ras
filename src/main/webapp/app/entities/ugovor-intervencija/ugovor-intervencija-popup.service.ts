import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UgovorIntervencija } from './ugovor-intervencija.model';
import { UgovorIntervencijaService } from './ugovor-intervencija.service';

@Injectable()
export class UgovorIntervencijaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private ugovorIntervencijaService: UgovorIntervencijaService

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
                this.ugovorIntervencijaService.find(id)
                    .subscribe((ugovorIntervencijaResponse: HttpResponse<UgovorIntervencija>) => {
                        const ugovorIntervencija: UgovorIntervencija = ugovorIntervencijaResponse.body;
                        if (ugovorIntervencija.datumOd) {
                            ugovorIntervencija.datumOd = {
                                year: ugovorIntervencija.datumOd.getFullYear(),
                                month: ugovorIntervencija.datumOd.getMonth() + 1,
                                day: ugovorIntervencija.datumOd.getDate()
                            };
                        }
                        if (ugovorIntervencija.datumDo) {
                            ugovorIntervencija.datumDo = {
                                year: ugovorIntervencija.datumDo.getFullYear(),
                                month: ugovorIntervencija.datumDo.getMonth() + 1,
                                day: ugovorIntervencija.datumDo.getDate()
                            };
                        }
                        this.ngbModalRef = this.ugovorIntervencijaModalRef(component, ugovorIntervencija);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ugovorIntervencijaModalRef(component, new UgovorIntervencija());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ugovorIntervencijaModalRef(component: Component, ugovorIntervencija: UgovorIntervencija): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ugovorIntervencija = ugovorIntervencija;
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
