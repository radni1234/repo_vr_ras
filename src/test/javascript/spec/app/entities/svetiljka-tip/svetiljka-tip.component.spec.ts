/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { SvetiljkaTipComponent } from '../../../../../../main/webapp/app/entities/svetiljka-tip/svetiljka-tip.component';
import { SvetiljkaTipService } from '../../../../../../main/webapp/app/entities/svetiljka-tip/svetiljka-tip.service';
import { SvetiljkaTip } from '../../../../../../main/webapp/app/entities/svetiljka-tip/svetiljka-tip.model';

describe('Component Tests', () => {

    describe('SvetiljkaTip Management Component', () => {
        let comp: SvetiljkaTipComponent;
        let fixture: ComponentFixture<SvetiljkaTipComponent>;
        let service: SvetiljkaTipService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [SvetiljkaTipComponent],
                providers: [
                    SvetiljkaTipService
                ]
            })
            .overrideTemplate(SvetiljkaTipComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SvetiljkaTipComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SvetiljkaTipService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SvetiljkaTip(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.svetiljkaTips[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
