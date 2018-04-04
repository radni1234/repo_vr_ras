/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RasvetaTestModule } from '../../../test.module';
import { StubDetailComponent } from '../../../../../../main/webapp/app/entities/stub/stub-detail.component';
import { StubService } from '../../../../../../main/webapp/app/entities/stub/stub.service';
import { Stub } from '../../../../../../main/webapp/app/entities/stub/stub.model';

describe('Component Tests', () => {

    describe('Stub Management Detail Component', () => {
        let comp: StubDetailComponent;
        let fixture: ComponentFixture<StubDetailComponent>;
        let service: StubService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [StubDetailComponent],
                providers: [
                    StubService
                ]
            })
            .overrideTemplate(StubDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StubDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StubService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Stub(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.stub).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
