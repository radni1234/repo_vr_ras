/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { MestoComponent } from '../../../../../../main/webapp/app/entities/mesto/mesto.component';
import { MestoService } from '../../../../../../main/webapp/app/entities/mesto/mesto.service';
import { Mesto } from '../../../../../../main/webapp/app/entities/mesto/mesto.model';

describe('Component Tests', () => {

    describe('Mesto Management Component', () => {
        let comp: MestoComponent;
        let fixture: ComponentFixture<MestoComponent>;
        let service: MestoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [MestoComponent],
                providers: [
                    MestoService
                ]
            })
            .overrideTemplate(MestoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MestoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MestoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Mesto(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.mestos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
