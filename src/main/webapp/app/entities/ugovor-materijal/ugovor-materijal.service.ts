import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { UgovorMaterijal } from './ugovor-materijal.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UgovorMaterijal>;

@Injectable()
export class UgovorMaterijalService {

    private resourceUrl =  SERVER_API_URL + 'api/ugovor-materijals';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(ugovorMaterijal: UgovorMaterijal): Observable<EntityResponseType> {
        const copy = this.convert(ugovorMaterijal);
        return this.http.post<UgovorMaterijal>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ugovorMaterijal: UgovorMaterijal): Observable<EntityResponseType> {
        const copy = this.convert(ugovorMaterijal);
        return this.http.put<UgovorMaterijal>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UgovorMaterijal>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UgovorMaterijal[]>> {
        const options = createRequestOption(req);
        return this.http.get<UgovorMaterijal[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UgovorMaterijal[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UgovorMaterijal = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UgovorMaterijal[]>): HttpResponse<UgovorMaterijal[]> {
        const jsonResponse: UgovorMaterijal[] = res.body;
        const body: UgovorMaterijal[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UgovorMaterijal.
     */
    private convertItemFromServer(ugovorMaterijal: UgovorMaterijal): UgovorMaterijal {
        const copy: UgovorMaterijal = Object.assign({}, ugovorMaterijal);
        copy.datumOd = this.dateUtils
            .convertLocalDateFromServer(ugovorMaterijal.datumOd);
        copy.datumDo = this.dateUtils
            .convertLocalDateFromServer(ugovorMaterijal.datumDo);
        return copy;
    }

    /**
     * Convert a UgovorMaterijal to a JSON which can be sent to the server.
     */
    private convert(ugovorMaterijal: UgovorMaterijal): UgovorMaterijal {
        const copy: UgovorMaterijal = Object.assign({}, ugovorMaterijal);
        copy.datumOd = this.dateUtils
            .convertLocalDateToServer(ugovorMaterijal.datumOd);
        copy.datumDo = this.dateUtils
            .convertLocalDateToServer(ugovorMaterijal.datumDo);
        return copy;
    }
}
