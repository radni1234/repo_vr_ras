import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UgovorMaterijalStavComponent } from './ugovor-materijal-stav.component';
import { UgovorMaterijalStavDetailComponent } from './ugovor-materijal-stav-detail.component';
import { UgovorMaterijalStavPopupComponent } from './ugovor-materijal-stav-dialog.component';
import { UgovorMaterijalStavDeletePopupComponent } from './ugovor-materijal-stav-delete-dialog.component';

@Injectable()
export class UgovorMaterijalStavResolvePagingParams implements Resolve<any> {

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

export const ugovorMaterijalStavRoute: Routes = [
    {
        path: 'ugovor-materijal-stav',
        component: UgovorMaterijalStavComponent,
        resolve: {
            'pagingParams': UgovorMaterijalStavResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorMaterijalStav.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ugovor-materijal-stav/:id',
        component: UgovorMaterijalStavDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorMaterijalStav.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ugovorMaterijalStavPopupRoute: Routes = [
    {
        path: 'ugovor-materijal-stav-new',
        component: UgovorMaterijalStavPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorMaterijalStav.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ugovor-materijal-stav/:id/edit',
        component: UgovorMaterijalStavPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorMaterijalStav.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ugovor-materijal-stav/:id/delete',
        component: UgovorMaterijalStavDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rasvetaApp.ugovorMaterijalStav.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
