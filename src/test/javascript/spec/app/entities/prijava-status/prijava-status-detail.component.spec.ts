/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RasvetaTestModule } from '../../../test.module';
import { PrijavaStatusDetailComponent } from '../../../../../../main/webapp/app/entities/prijava-status/prijava-status-detail.component';
import { PrijavaStatusService } from '../../../../../../main/webapp/app/entities/prijava-status/prijava-status.service';
import { PrijavaStatus } from '../../../../../../main/webapp/app/entities/prijava-status/prijava-status.model';

describe('Component Tests', () => {

    describe('PrijavaStatus Management Detail Component', () => {
        let comp: PrijavaStatusDetailComponent;
        let fixture: ComponentFixture<PrijavaStatusDetailComponent>;
        let service: PrijavaStatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [PrijavaStatusDetailComponent],
                providers: [
                    PrijavaStatusService
                ]
            })
            .overrideTemplate(PrijavaStatusDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrijavaStatusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrijavaStatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PrijavaStatus(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.prijavaStatus).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
