import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PrijavaIntervencijaComponent } from './prijava-intervencija.component';
import { PrijavaIntervencijaDetailComponent } from './prijava-intervencija-detail.component';
import { PrijavaIntervencijaPopupComponent } from './prijava-intervencija-dialog.component';
import { PrijavaIntervencijaDeletePopupComponent } from './prijava-intervencija-delete-dialog.component';

@Injectable()
export class PrijavaIntervencijaResolvePagingParams implements Resolve<any> {

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

export const prijavaIntervencijaRoute: Routes = [
    {
        path: 'prijava-intervencija',
        component: PrijavaIntervencijaComponent,
        resolve: {
            'pagingParams': PrijavaIntervencijaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijavaIntervencija.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'prijava-intervencija/:id',
        component: PrijavaIntervencijaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijavaIntervencija.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const prijavaIntervencijaPopupRoute: Routes = [
    {
        path: 'prijava-intervencija-new',
        component: PrijavaIntervencijaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijavaIntervencija.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'prijava-intervencija/:id/edit',
        component: PrijavaIntervencijaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijavaIntervencija.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'prijava-intervencija/:id/delete',
        component: PrijavaIntervencijaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijavaIntervencija.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
