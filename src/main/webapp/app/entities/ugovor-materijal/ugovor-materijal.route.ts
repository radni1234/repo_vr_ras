import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UgovorMaterijalComponent } from './ugovor-materijal.component';
import { UgovorMaterijalDetailComponent } from './ugovor-materijal-detail.component';
import { UgovorMaterijalPopupComponent } from './ugovor-materijal-dialog.component';
import { UgovorMaterijalDeletePopupComponent } from './ugovor-materijal-delete-dialog.component';

@Injectable()
export class UgovorMaterijalResolvePagingParams implements Resolve<any> {

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

export const ugovorMaterijalRoute: Routes = [
    {
        path: 'ugovor-materijal',
        component: UgovorMaterijalComponent,
        resolve: {
            'pagingParams': UgovorMaterijalResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorMaterijal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ugovor-materijal/:id',
        component: UgovorMaterijalDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorMaterijal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ugovorMaterijalPopupRoute: Routes = [
    {
        path: 'ugovor-materijal-new',
        component: UgovorMaterijalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorMaterijal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ugovor-materijal/:id/edit',
        component: UgovorMaterijalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorMaterijal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ugovor-materijal/:id/delete',
        component: UgovorMaterijalDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorMaterijal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
