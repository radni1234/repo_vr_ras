/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { SvetiljkaDialogComponent } from '../../../../../../main/webapp/app/entities/svetiljka/svetiljka-dialog.component';
import { SvetiljkaService } from '../../../../../../main/webapp/app/entities/svetiljka/svetiljka.service';
import { Svetiljka } from '../../../../../../main/webapp/app/entities/svetiljka/svetiljka.model';
import { StubService } from '../../../../../../main/webapp/app/entities/stub';
import { SvetiljkaTipService } from '../../../../../../main/webapp/app/entities/svetiljka-tip';

describe('Component Tests', () => {

    describe('Svetiljka Management Dialog Component', () => {
        let comp: SvetiljkaDialogComponent;
        let fixture: ComponentFixture<SvetiljkaDialogComponent>;
        let service: SvetiljkaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [SvetiljkaDialogComponent],
                providers: [
                    StubService,
                    SvetiljkaTipService,
                    SvetiljkaService
                ]
            })
            .overrideTemplate(SvetiljkaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SvetiljkaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SvetiljkaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Svetiljka(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.svetiljka = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'svetiljkaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Svetiljka();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.svetiljka = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'svetiljkaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
