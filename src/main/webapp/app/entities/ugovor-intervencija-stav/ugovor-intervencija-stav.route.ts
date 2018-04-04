import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UgovorIntervencijaStavComponent } from './ugovor-intervencija-stav.component';
import { UgovorIntervencijaStavDetailComponent } from './ugovor-intervencija-stav-detail.component';
import { UgovorIntervencijaStavPopupComponent } from './ugovor-intervencija-stav-dialog.component';
import { UgovorIntervencijaStavDeletePopupComponent } from './ugovor-intervencija-stav-delete-dialog.component';

@Injectable()
export class UgovorIntervencijaStavResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const ugovorIntervencijaStavRoute: Routes = [
    {
        path: 'ugovor-intervencija-stav',
        component: UgovorIntervencijaStavComponent,
        resolve: {
            'pagingParams': UgovorIntervencijaStavResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorIntervencijaStav.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ugovor-intervencija-stav/:id',
        component: UgovorIntervencijaStavDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorIntervencijaStav.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ugovorIntervencijaStavPopupRoute: Routes = [
    {
        path: 'ugovor-intervencija-stav-new',
        component: UgovorIntervencijaStavPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorIntervencijaStav.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ugovor-intervencija-stav/:id/edit',
        component: UgovorIntervencijaStavPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorIntervencijaStav.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ugovor-intervencija-stav/:id/delete',
        component: UgovorIntervencijaStavDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorIntervencijaStav.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
