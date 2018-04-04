import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PrijavaMaterijal } from './prijava-materijal.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PrijavaMaterijal>;

@Injectable()
export class PrijavaMaterijalService {

    private resourceUrl =  SERVER_API_URL + 'api/prijava-materijals';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(prijavaMaterijal: PrijavaMaterijal): Observable<EntityResponseType> {
        const copy = this.convert(prijavaMaterijal);
        return this.http.post<PrijavaMaterijal>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(prijavaMaterijal: PrijavaMaterijal): Observable<EntityResponseType> {
        const copy = this.convert(prijavaMaterijal);
        return this.http.put<PrijavaMaterijal>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PrijavaMaterijal>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PrijavaMaterijal[]>> {
        const options = createRequestOption(req);
        return this.http.get<PrijavaMaterijal[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PrijavaMaterijal[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PrijavaMaterijal = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PrijavaMaterijal[]>): HttpResponse<PrijavaMaterijal[]> {
        const jsonResponse: PrijavaMaterijal[] = res.body;
        const body: PrijavaMaterijal[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PrijavaMaterijal.
     */
    private convertItemFromServer(prijavaMaterijal: PrijavaMaterijal): PrijavaMaterijal {
        const copy: PrijavaMaterijal = Object.assign({}, prijavaMaterijal);
        copy.datum = this.dateUtils
            .convertDateTimeFromServer(prijavaMaterijal.datum);
        return copy;
    }

    /**
     * Convert a PrijavaMaterijal to a JSON which can be sent to the server.
     */
    private convert(prijavaMaterijal: PrijavaMaterijal): PrijavaMaterijal {
        const copy: PrijavaMaterijal = Object.assign({}, prijavaMaterijal);

        copy.datum = this.dateUtils.toDate(prijavaMaterijal.datum);
        return copy;
    }
}
