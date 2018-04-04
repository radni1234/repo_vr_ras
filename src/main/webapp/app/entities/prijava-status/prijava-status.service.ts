import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PrijavaStatus } from './prijava-status.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PrijavaStatus>;

@Injectable()
export class PrijavaStatusService {

    private resourceUrl =  SERVER_API_URL + 'api/prijava-statuses';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(prijavaStatus: PrijavaStatus): Observable<EntityResponseType> {
        const copy = this.convert(prijavaStatus);
        return this.http.post<PrijavaStatus>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(prijavaStatus: PrijavaStatus): Observable<EntityResponseType> {
        const copy = this.convert(prijavaStatus);
        return this.http.put<PrijavaStatus>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PrijavaStatus>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PrijavaStatus[]>> {
        const options = createRequestOption(req);
        return this.http.get<PrijavaStatus[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PrijavaStatus[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PrijavaStatus = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PrijavaStatus[]>): HttpResponse<PrijavaStatus[]> {
        const jsonResponse: PrijavaStatus[] = res.body;
        const body: PrijavaStatus[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PrijavaStatus.
     */
    private convertItemFromServer(prijavaStatus: PrijavaStatus): PrijavaStatus {
        const copy: PrijavaStatus = Object.assign({}, prijavaStatus);
        copy.datum = this.dateUtils
            .convertDateTimeFromServer(prijavaStatus.datum);
        return copy;
    }

    /**
     * Convert a PrijavaStatus to a JSON which can be sent to the server.
     */
    private convert(prijavaStatus: PrijavaStatus): PrijavaStatus {
        const copy: PrijavaStatus = Object.assign({}, prijavaStatus);

        copy.datum = this.dateUtils.toDate(prijavaStatus.datum);
        return copy;
    }
}
