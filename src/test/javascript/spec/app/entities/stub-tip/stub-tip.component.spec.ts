/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { StubTipComponent } from '../../../../../../main/webapp/app/entities/stub-tip/stub-tip.component';
import { StubTipService } from '../../../../../../main/webapp/app/entities/stub-tip/stub-tip.service';
import { StubTip } from '../../../../../../main/webapp/app/entities/stub-tip/stub-tip.model';

describe('Component Tests', () => {

    describe('StubTip Management Component', () => {
        let comp: StubTipComponent;
        let fixture: ComponentFixture<StubTipComponent>;
        let service: StubTipService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [StubTipComponent],
                providers: [
                    StubTipService
                ]
            })
            .overrideTemplate(StubTipComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StubTipComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StubTipService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StubTip(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stubTips[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
