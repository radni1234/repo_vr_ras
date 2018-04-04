import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { OpstinaComponent } from './opstina.component';
import { OpstinaDetailComponent } from './opstina-detail.component';
import { OpstinaPopupComponent } from './opstina-dialog.component';
import { OpstinaDeletePopupComponent } from './opstina-delete-dialog.component';

@Injectable()
export class OpstinaResolvePagingParams implements Resolve<any> {

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

export const opstinaRoute: Routes = [
    {
        path: 'opstina',
        component: OpstinaComponent,
        resolve: {
            'pagingParams': OpstinaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.opstina.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'opstina/:id',
        component: OpstinaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.opstina.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const opstinaPopupRoute: Routes = [
    {
        path: 'opstina-new',
        component: OpstinaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.opstina.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'opstina/:id/edit',
        component: OpstinaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.opstina.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'opstina/:id/delete',
        component: OpstinaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.opstina.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
