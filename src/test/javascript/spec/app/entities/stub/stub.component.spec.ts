/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { StubComponent } from '../../../../../../main/webapp/app/entities/stub/stub.component';
import { StubService } from '../../../../../../main/webapp/app/entities/stub/stub.service';
import { Stub } from '../../../../../../main/webapp/app/entities/stub/stub.model';

describe('Component Tests', () => {

    describe('Stub Management Component', () => {
        let comp: StubComponent;
        let fixture: ComponentFixture<StubComponent>;
        let service: StubService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [StubComponent],
                providers: [
                    StubService
                ]
            })
            .overrideTemplate(StubComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StubComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StubService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Stub(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stubs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
