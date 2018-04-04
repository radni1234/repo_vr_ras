/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { PrijavaDialogComponent } from '../../../../../../main/webapp/app/entities/prijava/prijava-dialog.component';
import { PrijavaService } from '../../../../../../main/webapp/app/entities/prijava/prijava.service';
import { Prijava } from '../../../../../../main/webapp/app/entities/prijava/prijava.model';
import { StubService } from '../../../../../../main/webapp/app/entities/stub';

describe('Component Tests', () => {

    describe('Prijava Management Dialog Component', () => {
        let comp: PrijavaDialogComponent;
        let fixture: ComponentFixture<PrijavaDialogComponent>;
        let service: PrijavaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [PrijavaDialogComponent],
                providers: [
                    StubService,
                    PrijavaService
                ]
            })
            .overrideTemplate(PrijavaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrijavaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrijavaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Prijava(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.prijava = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'prijavaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Prijava();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.prijava = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'prijavaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
