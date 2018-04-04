import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { UgovorIntervencija } from './ugovor-intervencija.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UgovorIntervencija>;

@Injectable()
export class UgovorIntervencijaService {

    private resourceUrl =  SERVER_API_URL + 'api/ugovor-intervencijas';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(ugovorIntervencija: UgovorIntervencija): Observable<EntityResponseType> {
        const copy = this.convert(ugovorIntervencija);
        return this.http.post<UgovorIntervencija>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ugovorIntervencija: UgovorIntervencija): Observable<EntityResponseType> {
        const copy = this.convert(ugovorIntervencija);
        return this.http.put<UgovorIntervencija>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UgovorIntervencija>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UgovorIntervencija[]>> {
        const options = createRequestOption(req);
        return this.http.get<UgovorIntervencija[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UgovorIntervencija[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UgovorIntervencija = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UgovorIntervencija[]>): HttpResponse<UgovorIntervencija[]> {
        const jsonResponse: UgovorIntervencija[] = res.body;
        const body: UgovorIntervencija[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UgovorIntervencija.
     */
    private convertItemFromServer(ugovorIntervencija: UgovorIntervencija): UgovorIntervencija {
        const copy: UgovorIntervencija = Object.assign({}, ugovorIntervencija);
        copy.datumOd = this.dateUtils
            .convertLocalDateFromServer(ugovorIntervencija.datumOd);
        copy.datumDo = this.dateUtils
            .convertLocalDateFromServer(ugovorIntervencija.datumDo);
        return copy;
    }

    /**
     * Convert a UgovorIntervencija to a JSON which can be sent to the server.
     */
    private convert(ugovorIntervencija: UgovorIntervencija): UgovorIntervencija {
        const copy: UgovorIntervencija = Object.assign({}, ugovorIntervencija);
        copy.datumOd = this.dateUtils
            .convertLocalDateToServer(ugovorIntervencija.datumOd);
        copy.datumDo = this.dateUtils
            .convertLocalDateToServer(ugovorIntervencija.datumDo);
        return copy;
    }
}
