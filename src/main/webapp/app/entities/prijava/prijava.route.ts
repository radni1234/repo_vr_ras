import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PrijavaComponent } from './prijava.component';
import { PrijavaDetailComponent } from './prijava-detail.component';
import { PrijavaPopupComponent } from './prijava-dialog.component';
import { PrijavaDeletePopupComponent } from './prijava-delete-dialog.component';

@Injectable()
export class PrijavaResolvePagingParams implements Resolve<any> {

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

export const prijavaRoute: Routes = [
    {
        path: 'prijava',
        component: PrijavaComponent,
        resolve: {
            'pagingParams': PrijavaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijava.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'prijava/:id',
        component: PrijavaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijava.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const prijavaPopupRoute: Routes = [
    {
        path: 'prijava-new',
        component: PrijavaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijava.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'prijava/:id/edit',
        component: PrijavaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijava.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'prijava/:id/delete',
        component: PrijavaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijava.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
