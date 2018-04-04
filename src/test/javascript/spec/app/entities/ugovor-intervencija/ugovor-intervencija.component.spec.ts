/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { UgovorIntervencijaComponent } from '../../../../../../main/webapp/app/entities/ugovor-intervencija/ugovor-intervencija.component';
import { UgovorIntervencijaService } from '../../../../../../main/webapp/app/entities/ugovor-intervencija/ugovor-intervencija.service';
import { UgovorIntervencija } from '../../../../../../main/webapp/app/entities/ugovor-intervencija/ugovor-intervencija.model';

describe('Component Tests', () => {

    describe('UgovorIntervencija Management Component', () => {
        let comp: UgovorIntervencijaComponent;
        let fixture: ComponentFixture<UgovorIntervencijaComponent>;
        let service: UgovorIntervencijaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [UgovorIntervencijaComponent],
                providers: [
                    UgovorIntervencijaService
                ]
            })
            .overrideTemplate(UgovorIntervencijaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UgovorIntervencijaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UgovorIntervencijaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UgovorIntervencija(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ugovorIntervencijas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
