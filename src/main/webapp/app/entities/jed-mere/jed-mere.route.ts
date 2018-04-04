import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { JedMereComponent } from './jed-mere.component';
import { JedMereDetailComponent } from './jed-mere-detail.component';
import { JedMerePopupComponent } from './jed-mere-dialog.component';
import { JedMereDeletePopupComponent } from './jed-mere-delete-dialog.component';

@Injectable()
export class JedMereResolvePagingParams implements Resolve<any> {

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

export const jedMereRoute: Routes = [
    {
        path: 'jed-mere',
        component: JedMereComponent,
        resolve: {
            'pagingParams': JedMereResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.jedMere.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'jed-mere/:id',
        component: JedMereDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.jedMere.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jedMerePopupRoute: Routes = [
    {
        path: 'jed-mere-new',
        component: JedMerePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.jedMere.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jed-mere/:id/edit',
        component: JedMerePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.jedMere.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jed-mere/:id/delete',
        component: JedMereDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.jedMere.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
