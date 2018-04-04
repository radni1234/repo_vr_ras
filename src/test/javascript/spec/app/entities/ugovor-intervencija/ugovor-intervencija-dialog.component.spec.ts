/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { UgovorIntervencijaDialogComponent } from '../../../../../../main/webapp/app/entities/ugovor-intervencija/ugovor-intervencija-dialog.component';
import { UgovorIntervencijaService } from '../../../../../../main/webapp/app/entities/ugovor-intervencija/ugovor-intervencija.service';
import { UgovorIntervencija } from '../../../../../../main/webapp/app/entities/ugovor-intervencija/ugovor-intervencija.model';
import { OpstinaService } from '../../../../../../main/webapp/app/entities/opstina';

describe('Component Tests', () => {

    describe('UgovorIntervencija Management Dialog Component', () => {
        let comp: UgovorIntervencijaDialogComponent;
        let fixture: ComponentFixture<UgovorIntervencijaDialogComponent>;
        let service: UgovorIntervencijaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [UgovorIntervencijaDialogComponent],
                providers: [
                    OpstinaService,
                    UgovorIntervencijaService
                ]
            })
            .overrideTemplate(UgovorIntervencijaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UgovorIntervencijaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UgovorIntervencijaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UgovorIntervencija(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.ugovorIntervencija = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ugovorIntervencijaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UgovorIntervencija();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.ugovorIntervencija = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ugovorIntervencijaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
