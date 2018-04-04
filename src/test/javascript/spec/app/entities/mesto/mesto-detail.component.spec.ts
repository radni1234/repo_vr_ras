/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RasvetaTestModule } from '../../../test.module';
import { MestoDetailComponent } from '../../../../../../main/webapp/app/entities/mesto/mesto-detail.component';
import { MestoService } from '../../../../../../main/webapp/app/entities/mesto/mesto.service';
import { Mesto } from '../../../../../../main/webapp/app/entities/mesto/mesto.model';

describe('Component Tests', () => {

    describe('Mesto Management Detail Component', () => {
        let comp: MestoDetailComponent;
        let fixture: ComponentFixture<MestoDetailComponent>;
        let service: MestoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [MestoDetailComponent],
                providers: [
                    MestoService
                ]
            })
            .overrideTemplate(MestoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MestoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MestoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Mesto(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.mesto).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
