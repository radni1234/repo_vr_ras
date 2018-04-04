/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { PrijavaIntervencijaDialogComponent } from '../../../../../../main/webapp/app/entities/prijava-intervencija/prijava-intervencija-dialog.component';
import { PrijavaIntervencijaService } from '../../../../../../main/webapp/app/entities/prijava-intervencija/prijava-intervencija.service';
import { PrijavaIntervencija } from '../../../../../../main/webapp/app/entities/prijava-intervencija/prijava-intervencija.model';
import { IntervencijaTipService } from '../../../../../../main/webapp/app/entities/intervencija-tip';
import { PrijavaStatusService } from '../../../../../../main/webapp/app/entities/prijava-status';

describe('Component Tests', () => {

    describe('PrijavaIntervencija Management Dialog Component', () => {
        let comp: PrijavaIntervencijaDialogComponent;
        let fixture: ComponentFixture<PrijavaIntervencijaDialogComponent>;
        let service: PrijavaIntervencijaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [PrijavaIntervencijaDialogComponent],
                providers: [
                    IntervencijaTipService,
                    PrijavaStatusService,
                    PrijavaIntervencijaService
                ]
            })
            .overrideTemplate(PrijavaIntervencijaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrijavaIntervencijaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrijavaIntervencijaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PrijavaIntervencija(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.prijavaIntervencija = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'prijavaIntervencijaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PrijavaIntervencija();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.prijavaIntervencija = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'prijavaIntervencijaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
