import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MaterijalTipComponent } from './materijal-tip.component';
import { MaterijalTipDetailComponent } from './materijal-tip-detail.component';
import { MaterijalTipPopupComponent } from './materijal-tip-dialog.component';
import { MaterijalTipDeletePopupComponent } from './materijal-tip-delete-dialog.component';

@Injectable()
export class MaterijalTipResolvePagingParams implements Resolve<any> {

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

export const materijalTipRoute: Routes = [
    {
        path: 'materijal-tip',
        component: MaterijalTipComponent,
        resolve: {
            'pagingParams': MaterijalTipResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.materijalTip.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'materijal-tip/:id',
        component: MaterijalTipDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.materijalTip.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const materijalTipPopupRoute: Routes = [
    {
        path: 'materijal-tip-new',
        component: MaterijalTipPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.materijalTip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'materijal-tip/:id/edit',
        component: MaterijalTipPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.materijalTip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'materijal-tip/:id/delete',
        component: MaterijalTipDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.materijalTip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
