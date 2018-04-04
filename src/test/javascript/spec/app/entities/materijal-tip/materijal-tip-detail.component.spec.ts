/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RasvetaTestModule } from '../../../test.module';
import { MaterijalTipDetailComponent } from '../../../../../../main/webapp/app/entities/materijal-tip/materijal-tip-detail.component';
import { MaterijalTipService } from '../../../../../../main/webapp/app/entities/materijal-tip/materijal-tip.service';
import { MaterijalTip } from '../../../../../../main/webapp/app/entities/materijal-tip/materijal-tip.model';

describe('Component Tests', () => {

    describe('MaterijalTip Management Detail Component', () => {
        let comp: MaterijalTipDetailComponent;
        let fixture: ComponentFixture<MaterijalTipDetailComponent>;
        let service: MaterijalTipService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [MaterijalTipDetailComponent],
                providers: [
                    MaterijalTipService
                ]
            })
            .overrideTemplate(MaterijalTipDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaterijalTipDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterijalTipService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MaterijalTip(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.materijalTip).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
