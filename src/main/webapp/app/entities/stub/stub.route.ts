import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StubComponent } from './stub.component';
import { StubDetailComponent } from './stub-detail.component';
import { StubPopupComponent } from './stub-dialog.component';
import { StubDeletePopupComponent } from './stub-delete-dialog.component';

@Injectable()
export class StubResolvePagingParams implements Resolve<any> {

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

export const stubRoute: Routes = [
    {
        path: 'stub',
        component: StubComponent,
        resolve: {
            'pagingParams': StubResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.stub.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'stub/:id',
        component: StubDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.stub.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stubPopupRoute: Routes = [
    {
        path: 'stub-new',
        component: StubPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.stub.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stub/:id/edit',
        component: StubPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.stub.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stub/:id/delete',
        component: StubDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.stub.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
