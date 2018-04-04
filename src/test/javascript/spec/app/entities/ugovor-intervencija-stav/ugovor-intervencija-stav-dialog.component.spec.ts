/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { UgovorIntervencijaStavDialogComponent } from '../../../../../../main/webapp/app/entities/ugovor-intervencija-stav/ugovor-intervencija-stav-dialog.component';
import { UgovorIntervencijaStavService } from '../../../../../../main/webapp/app/entities/ugovor-intervencija-stav/ugovor-intervencija-stav.service';
import { UgovorIntervencijaStav } from '../../../../../../main/webapp/app/entities/ugovor-intervencija-stav/ugovor-intervencija-stav.model';
import { UgovorIntervencijaService } from '../../../../../../main/webapp/app/entities/ugovor-intervencija';
import { JedMereService } from '../../../../../../main/webapp/app/entities/jed-mere';

describe('Component Tests', () => {

    describe('UgovorIntervencijaStav Management Dialog Component', () => {
        let comp: UgovorIntervencijaStavDialogComponent;
        let fixture: ComponentFixture<UgovorIntervencijaStavDialogComponent>;
        let service: UgovorIntervencijaStavService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [UgovorIntervencijaStavDialogComponent],
                providers: [
                    UgovorIntervencijaService,
                    JedMereService,
                    UgovorIntervencijaStavService
                ]
            })
            .overrideTemplate(UgovorIntervencijaStavDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UgovorIntervencijaStavDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UgovorIntervencijaStavService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UgovorIntervencijaStav(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.ugovorIntervencijaStav = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ugovorIntervencijaStavListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UgovorIntervencijaStav();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.ugovorIntervencijaStav = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ugovorIntervencijaStavListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
