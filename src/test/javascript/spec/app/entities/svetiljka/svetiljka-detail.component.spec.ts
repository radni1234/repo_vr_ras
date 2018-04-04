/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RasvetaTestModule } from '../../../test.module';
import { SvetiljkaDetailComponent } from '../../../../../../main/webapp/app/entities/svetiljka/svetiljka-detail.component';
import { SvetiljkaService } from '../../../../../../main/webapp/app/entities/svetiljka/svetiljka.service';
import { Svetiljka } from '../../../../../../main/webapp/app/entities/svetiljka/svetiljka.model';

describe('Component Tests', () => {

    describe('Svetiljka Management Detail Component', () => {
        let comp: SvetiljkaDetailComponent;
        let fixture: ComponentFixture<SvetiljkaDetailComponent>;
        let service: SvetiljkaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [SvetiljkaDetailComponent],
                providers: [
                    SvetiljkaService
                ]
            })
            .overrideTemplate(SvetiljkaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SvetiljkaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SvetiljkaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Svetiljka(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.svetiljka).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
