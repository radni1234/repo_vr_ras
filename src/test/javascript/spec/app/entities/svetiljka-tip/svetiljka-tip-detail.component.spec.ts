/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RasvetaTestModule } from '../../../test.module';
import { SvetiljkaTipDetailComponent } from '../../../../../../main/webapp/app/entities/svetiljka-tip/svetiljka-tip-detail.component';
import { SvetiljkaTipService } from '../../../../../../main/webapp/app/entities/svetiljka-tip/svetiljka-tip.service';
import { SvetiljkaTip } from '../../../../../../main/webapp/app/entities/svetiljka-tip/svetiljka-tip.model';

describe('Component Tests', () => {

    describe('SvetiljkaTip Management Detail Component', () => {
        let comp: SvetiljkaTipDetailComponent;
        let fixture: ComponentFixture<SvetiljkaTipDetailComponent>;
        let service: SvetiljkaTipService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [SvetiljkaTipDetailComponent],
                providers: [
                    SvetiljkaTipService
                ]
            })
            .overrideTemplate(SvetiljkaTipDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SvetiljkaTipDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SvetiljkaTipService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SvetiljkaTip(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.svetiljkaTip).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
