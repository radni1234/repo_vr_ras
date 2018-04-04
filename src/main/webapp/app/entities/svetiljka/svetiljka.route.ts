import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SvetiljkaComponent } from './svetiljka.component';
import { SvetiljkaDetailComponent } from './svetiljka-detail.component';
import { SvetiljkaPopupComponent } from './svetiljka-dialog.component';
import { SvetiljkaDeletePopupComponent } from './svetiljka-delete-dialog.component';

@Injectable()
export class SvetiljkaResolvePagingParams implements Resolve<any> {

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

export const svetiljkaRoute: Routes = [
    {
        path: 'svetiljka',
        component: SvetiljkaComponent,
        resolve: {
            'pagingParams': SvetiljkaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.svetiljka.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'svetiljka/:id',
        component: SvetiljkaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.svetiljka.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const svetiljkaPopupRoute: Routes = [
    {
        path: 'svetiljka-new',
        component: SvetiljkaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.svetiljka.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'svetiljka/:id/edit',
        component: SvetiljkaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.svetiljka.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'svetiljka/:id/delete',
        component: SvetiljkaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.svetiljka.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
