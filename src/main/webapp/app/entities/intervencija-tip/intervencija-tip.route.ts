import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { IntervencijaTipComponent } from './intervencija-tip.component';
import { IntervencijaTipDetailComponent } from './intervencija-tip-detail.component';
import { IntervencijaTipPopupComponent } from './intervencija-tip-dialog.component';
import { IntervencijaTipDeletePopupComponent } from './intervencija-tip-delete-dialog.component';

@Injectable()
export class IntervencijaTipResolvePagingParams implements Resolve<any> {

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

export const intervencijaTipRoute: Routes = [
    {
        path: 'intervencija-tip',
        component: IntervencijaTipComponent,
        resolve: {
            'pagingParams': IntervencijaTipResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.intervencijaTip.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'intervencija-tip/:id',
        component: IntervencijaTipDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.intervencijaTip.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const intervencijaTipPopupRoute: Routes = [
    {
        path: 'intervencija-tip-new',
        component: IntervencijaTipPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.intervencijaTip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'intervencija-tip/:id/edit',
        component: IntervencijaTipPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.intervencijaTip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'intervencija-tip/:id/delete',
        component: IntervencijaTipDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.intervencijaTip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
