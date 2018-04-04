import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StubTipComponent } from './stub-tip.component';
import { StubTipDetailComponent } from './stub-tip-detail.component';
import { StubTipPopupComponent } from './stub-tip-dialog.component';
import { StubTipDeletePopupComponent } from './stub-tip-delete-dialog.component';

@Injectable()
export class StubTipResolvePagingParams implements Resolve<any> {

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

export const stubTipRoute: Routes = [
    {
        path: 'stub-tip',
        component: StubTipComponent,
        resolve: {
            'pagingParams': StubTipResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.stubTip.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'stub-tip/:id',
        component: StubTipDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.stubTip.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stubTipPopupRoute: Routes = [
    {
        path: 'stub-tip-new',
        component: StubTipPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.stubTip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stub-tip/:id/edit',
        component: StubTipPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.stubTip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stub-tip/:id/delete',
        component: StubTipDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.stubTip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
