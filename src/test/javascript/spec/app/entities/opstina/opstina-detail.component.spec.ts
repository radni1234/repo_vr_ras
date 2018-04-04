/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RasvetaTestModule } from '../../../test.module';
import { OpstinaDetailComponent } from '../../../../../../main/webapp/app/entities/opstina/opstina-detail.component';
import { OpstinaService } from '../../../../../../main/webapp/app/entities/opstina/opstina.service';
import { Opstina } from '../../../../../../main/webapp/app/entities/opstina/opstina.model';

describe('Component Tests', () => {

    describe('Opstina Management Detail Component', () => {
        let comp: OpstinaDetailComponent;
        let fixture: ComponentFixture<OpstinaDetailComponent>;
        let service: OpstinaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [OpstinaDetailComponent],
                providers: [
                    OpstinaService
                ]
            })
            .overrideTemplate(OpstinaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OpstinaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OpstinaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Opstina(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.opstina).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
