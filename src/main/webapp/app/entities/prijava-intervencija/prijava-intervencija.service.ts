import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PrijavaIntervencija } from './prijava-intervencija.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PrijavaIntervencija>;

@Injectable()
export class PrijavaIntervencijaService {

    private resourceUrl =  SERVER_API_URL + 'api/prijava-intervencijas';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(prijavaIntervencija: PrijavaIntervencija): Observable<EntityResponseType> {
        const copy = this.convert(prijavaIntervencija);
        return this.http.post<PrijavaIntervencija>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(prijavaIntervencija: PrijavaIntervencija): Observable<EntityResponseType> {
        const copy = this.convert(prijavaIntervencija);
        return this.http.put<PrijavaIntervencija>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PrijavaIntervencija>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PrijavaIntervencija[]>> {
        const options = createRequestOption(req);
        return this.http.get<PrijavaIntervencija[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PrijavaIntervencija[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PrijavaIntervencija = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PrijavaIntervencija[]>): HttpResponse<PrijavaIntervencija[]> {
        const jsonResponse: PrijavaIntervencija[] = res.body;
        const body: PrijavaIntervencija[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PrijavaIntervencija.
     */
    private convertItemFromServer(prijavaIntervencija: PrijavaIntervencija): PrijavaIntervencija {
        const copy: PrijavaIntervencija = Object.assign({}, prijavaIntervencija);
        copy.datum = this.dateUtils
            .convertDateTimeFromServer(prijavaIntervencija.datum);
        return copy;
    }

    /**
     * Convert a PrijavaIntervencija to a JSON which can be sent to the server.
     */
    private convert(prijavaIntervencija: PrijavaIntervencija): PrijavaIntervencija {
        const copy: PrijavaIntervencija = Object.assign({}, prijavaIntervencija);

        copy.datum = this.dateUtils.toDate(prijavaIntervencija.datum);
        return copy;
    }
}
