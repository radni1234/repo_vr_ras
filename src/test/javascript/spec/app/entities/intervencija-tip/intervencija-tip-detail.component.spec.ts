/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RasvetaTestModule } from '../../../test.module';
import { IntervencijaTipDetailComponent } from '../../../../../../main/webapp/app/entities/intervencija-tip/intervencija-tip-detail.component';
import { IntervencijaTipService } from '../../../../../../main/webapp/app/entities/intervencija-tip/intervencija-tip.service';
import { IntervencijaTip } from '../../../../../../main/webapp/app/entities/intervencija-tip/intervencija-tip.model';

describe('Component Tests', () => {

    describe('IntervencijaTip Management Detail Component', () => {
        let comp: IntervencijaTipDetailComponent;
        let fixture: ComponentFixture<IntervencijaTipDetailComponent>;
        let service: IntervencijaTipService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [IntervencijaTipDetailComponent],
                providers: [
                    IntervencijaTipService
                ]
            })
            .overrideTemplate(IntervencijaTipDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntervencijaTipDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntervencijaTipService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new IntervencijaTip(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.intervencijaTip).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
