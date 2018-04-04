/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RasvetaTestModule } from '../../../test.module';
import { PrijavaIntervencijaDetailComponent } from '../../../../../../main/webapp/app/entities/prijava-intervencija/prijava-intervencija-detail.component';
import { PrijavaIntervencijaService } from '../../../../../../main/webapp/app/entities/prijava-intervencija/prijava-intervencija.service';
import { PrijavaIntervencija } from '../../../../../../main/webapp/app/entities/prijava-intervencija/prijava-intervencija.model';

describe('Component Tests', () => {

    describe('PrijavaIntervencija Management Detail Component', () => {
        let comp: PrijavaIntervencijaDetailComponent;
        let fixture: ComponentFixture<PrijavaIntervencijaDetailComponent>;
        let service: PrijavaIntervencijaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [PrijavaIntervencijaDetailComponent],
                providers: [
                    PrijavaIntervencijaService
                ]
            })
            .overrideTemplate(PrijavaIntervencijaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrijavaIntervencijaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrijavaIntervencijaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PrijavaIntervencija(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.prijavaIntervencija).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
