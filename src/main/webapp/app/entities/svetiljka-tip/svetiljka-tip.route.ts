import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SvetiljkaTipComponent } from './svetiljka-tip.component';
import { SvetiljkaTipDetailComponent } from './svetiljka-tip-detail.component';
import { SvetiljkaTipPopupComponent } from './svetiljka-tip-dialog.component';
import { SvetiljkaTipDeletePopupComponent } from './svetiljka-tip-delete-dialog.component';

@Injectable()
export class SvetiljkaTipResolvePagingParams implements Resolve<any> {

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

export const svetiljkaTipRoute: Routes = [
    {
        path: 'svetiljka-tip',
        component: SvetiljkaTipComponent,
        resolve: {
            'pagingParams': SvetiljkaTipResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.svetiljkaTip.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'svetiljka-tip/:id',
        component: SvetiljkaTipDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.svetiljkaTip.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const svetiljkaTipPopupRoute: Routes = [
    {
        path: 'svetiljka-tip-new',
        component: SvetiljkaTipPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.svetiljkaTip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'svetiljka-tip/:id/edit',
        component: SvetiljkaTipPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.svetiljkaTip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'svetiljka-tip/:id/delete',
        component: SvetiljkaTipDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.svetiljkaTip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
