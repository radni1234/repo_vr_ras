/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { PrijavaStatusDialogComponent } from '../../../../../../main/webapp/app/entities/prijava-status/prijava-status-dialog.component';
import { PrijavaStatusService } from '../../../../../../main/webapp/app/entities/prijava-status/prijava-status.service';
import { PrijavaStatus } from '../../../../../../main/webapp/app/entities/prijava-status/prijava-status.model';
import { PrijavaService } from '../../../../../../main/webapp/app/entities/prijava';
import { StatusService } from '../../../../../../main/webapp/app/entities/status';

describe('Component Tests', () => {

    describe('PrijavaStatus Management Dialog Component', () => {
        let comp: PrijavaStatusDialogComponent;
        let fixture: ComponentFixture<PrijavaStatusDialogComponent>;
        let service: PrijavaStatusService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [PrijavaStatusDialogComponent],
                providers: [
                    PrijavaService,
                    StatusService,
                    PrijavaStatusService
                ]
            })
            .overrideTemplate(PrijavaStatusDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrijavaStatusDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrijavaStatusService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PrijavaStatus(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.prijavaStatus = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'prijavaStatusListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PrijavaStatus();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.prijavaStatus = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'prijavaStatusListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
