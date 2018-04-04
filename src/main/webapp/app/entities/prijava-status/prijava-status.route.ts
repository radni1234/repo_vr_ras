import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PrijavaStatusComponent } from './prijava-status.component';
import { PrijavaStatusDetailComponent } from './prijava-status-detail.component';
import { PrijavaStatusPopupComponent } from './prijava-status-dialog.component';
import { PrijavaStatusDeletePopupComponent } from './prijava-status-delete-dialog.component';

@Injectable()
export class PrijavaStatusResolvePagingParams implements Resolve<any> {

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

export const prijavaStatusRoute: Routes = [
    {
        path: 'prijava-status',
        component: PrijavaStatusComponent,
        resolve: {
            'pagingParams': PrijavaStatusResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijavaStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'prijava-status/:id',
        component: PrijavaStatusDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijavaStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const prijavaStatusPopupRoute: Routes = [
    {
        path: 'prijava-status-new',
        component: PrijavaStatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijavaStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'prijava-status/:id/edit',
        component: PrijavaStatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijavaStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'prijava-status/:id/delete',
        component: PrijavaStatusDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.prijavaStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
