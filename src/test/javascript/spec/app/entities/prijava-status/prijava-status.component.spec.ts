/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { PrijavaStatusComponent } from '../../../../../../main/webapp/app/entities/prijava-status/prijava-status.component';
import { PrijavaStatusService } from '../../../../../../main/webapp/app/entities/prijava-status/prijava-status.service';
import { PrijavaStatus } from '../../../../../../main/webapp/app/entities/prijava-status/prijava-status.model';

describe('Component Tests', () => {

    describe('PrijavaStatus Management Component', () => {
        let comp: PrijavaStatusComponent;
        let fixture: ComponentFixture<PrijavaStatusComponent>;
        let service: PrijavaStatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [PrijavaStatusComponent],
                providers: [
                    PrijavaStatusService
                ]
            })
            .overrideTemplate(PrijavaStatusComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrijavaStatusComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrijavaStatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PrijavaStatus(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.prijavaStatuses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
