import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Prijava } from './prijava.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Prijava>;

@Injectable()
export class PrijavaService {

    private resourceUrl =  SERVER_API_URL + 'api/prijavas';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(prijava: Prijava): Observable<EntityResponseType> {
        const copy = this.convert(prijava);
        return this.http.post<Prijava>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(prijava: Prijava): Observable<EntityResponseType> {
        const copy = this.convert(prijava);
        return this.http.put<Prijava>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Prijava>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Prijava[]>> {
        const options = createRequestOption(req);
        return this.http.get<Prijava[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Prijava[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Prijava = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Prijava[]>): HttpResponse<Prijava[]> {
        const jsonResponse: Prijava[] = res.body;
        const body: Prijava[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Prijava.
     */
    private convertItemFromServer(prijava: Prijava): Prijava {
        const copy: Prijava = Object.assign({}, prijava);
        copy.datum = this.dateUtils
            .convertDateTimeFromServer(prijava.datum);
        return copy;
    }

    /**
     * Convert a Prijava to a JSON which can be sent to the server.
     */
    private convert(prijava: Prijava): Prijava {
        const copy: Prijava = Object.assign({}, prijava);

        copy.datum = this.dateUtils.toDate(prijava.datum);
        return copy;
    }
}
