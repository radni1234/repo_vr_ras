/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { SvetiljkaTipDialogComponent } from '../../../../../../main/webapp/app/entities/svetiljka-tip/svetiljka-tip-dialog.component';
import { SvetiljkaTipService } from '../../../../../../main/webapp/app/entities/svetiljka-tip/svetiljka-tip.service';
import { SvetiljkaTip } from '../../../../../../main/webapp/app/entities/svetiljka-tip/svetiljka-tip.model';

describe('Component Tests', () => {

    describe('SvetiljkaTip Management Dialog Component', () => {
        let comp: SvetiljkaTipDialogComponent;
        let fixture: ComponentFixture<SvetiljkaTipDialogComponent>;
        let service: SvetiljkaTipService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [SvetiljkaTipDialogComponent],
                providers: [
                    SvetiljkaTipService
                ]
            })
            .overrideTemplate(SvetiljkaTipDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SvetiljkaTipDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SvetiljkaTipService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SvetiljkaTip(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.svetiljkaTip = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'svetiljkaTipListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SvetiljkaTip();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.svetiljkaTip = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'svetiljkaTipListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
