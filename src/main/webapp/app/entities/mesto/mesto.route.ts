import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MestoComponent } from './mesto.component';
import { MestoDetailComponent } from './mesto-detail.component';
import { MestoPopupComponent } from './mesto-dialog.component';
import { MestoDeletePopupComponent } from './mesto-delete-dialog.component';

@Injectable()
export class MestoResolvePagingParams implements Resolve<any> {

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

export const mestoRoute: Routes = [
    {
        path: 'mesto',
        component: MestoComponent,
        resolve: {
            'pagingParams': MestoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.mesto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mesto/:id',
        component: MestoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.mesto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mestoPopupRoute: Routes = [
    {
        path: 'mesto-new',
        component: MestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.mesto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mesto/:id/edit',
        component: MestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.mesto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mesto/:id/delete',
        component: MestoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.mesto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
