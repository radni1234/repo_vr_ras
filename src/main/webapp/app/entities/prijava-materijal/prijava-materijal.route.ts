import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PrijavaMaterijalComponent } from './prijava-materijal.component';
import { PrijavaMaterijalDetailComponent } from './prijava-materijal-detail.component';
import { PrijavaMaterijalPopupComponent } from './prijava-materijal-dialog.component';
import { PrijavaMaterijalDeletePopupComponent } from './prijava-materijal-delete-dialog.component';

@Injectable()
export class PrijavaMaterijalResolvePagingParams implements Resolve<any> {

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

export const prijavaMaterijalRoute: Routes = [
    {
        path: 'prijava-materijal',
        component: PrijavaMaterijalComponent,
        resolve: {
            'pagingParams': PrijavaMaterijalResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijavaMaterijal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'prijava-materijal/:id',
        component: PrijavaMaterijalDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijavaMaterijal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const prijavaMaterijalPopupRoute: Routes = [
    {
        path: 'prijava-materijal-new',
        component: PrijavaMaterijalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijavaMaterijal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'prijava-materijal/:id/edit',
        component: PrijavaMaterijalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijavaMaterijal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'prijava-materijal/:id/delete',
        component: PrijavaMaterijalDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijavaMaterijal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
