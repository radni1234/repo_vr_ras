import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UgovorIntervencijaComponent } from './ugovor-intervencija.component';
import { UgovorIntervencijaDetailComponent } from './ugovor-intervencija-detail.component';
import { UgovorIntervencijaPopupComponent } from './ugovor-intervencija-dialog.component';
import { UgovorIntervencijaDeletePopupComponent } from './ugovor-intervencija-delete-dialog.component';

@Injectable()
export class UgovorIntervencijaResolvePagingParams implements Resolve<any> {

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

export const ugovorIntervencijaRoute: Routes = [
    {
        path: 'ugovor-intervencija',
        component: UgovorIntervencijaComponent,
        resolve: {
            'pagingParams': UgovorIntervencijaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorIntervencija.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ugovor-intervencija/:id',
        component: UgovorIntervencijaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorIntervencija.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ugovorIntervencijaPopupRoute: Routes = [
    {
        path: 'ugovor-intervencija-new',
        component: UgovorIntervencijaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorIntervencija.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ugovor-intervencija/:id/edit',
        component: UgovorIntervencijaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorIntervencija.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ugovor-intervencija/:id/delete',
        component: UgovorIntervencijaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorIntervencija.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
