/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RasvetaTestModule } from '../../../test.module';
import { PrijavaDetailComponent } from '../../../../../../main/webapp/app/entities/prijava/prijava-detail.component';
import { PrijavaService } from '../../../../../../main/webapp/app/entities/prijava/prijava.service';
import { Prijava } from '../../../../../../main/webapp/app/entities/prijava/prijava.model';

describe('Component Tests', () => {

    describe('Prijava Management Detail Component', () => {
        let comp: PrijavaDetailComponent;
        let fixture: ComponentFixture<PrijavaDetailComponent>;
        let service: PrijavaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [PrijavaDetailComponent],
                providers: [
                    PrijavaService
                ]
            })
            .overrideTemplate(PrijavaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrijavaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrijavaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Prijava(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.prijava).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
