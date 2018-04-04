/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { PrijavaIntervencijaComponent } from '../../../../../../main/webapp/app/entities/prijava-intervencija/prijava-intervencija.component';
import { PrijavaIntervencijaService } from '../../../../../../main/webapp/app/entities/prijava-intervencija/prijava-intervencija.service';
import { PrijavaIntervencija } from '../../../../../../main/webapp/app/entities/prijava-intervencija/prijava-intervencija.model';

describe('Component Tests', () => {

    describe('PrijavaIntervencija Management Component', () => {
        let comp: PrijavaIntervencijaComponent;
        let fixture: ComponentFixture<PrijavaIntervencijaComponent>;
        let service: PrijavaIntervencijaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [PrijavaIntervencijaComponent],
                providers: [
                    PrijavaIntervencijaService
                ]
            })
            .overrideTemplate(PrijavaIntervencijaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrijavaIntervencijaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrijavaIntervencijaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PrijavaIntervencija(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.prijavaIntervencijas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
