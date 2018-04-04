/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { UgovorMaterijalStavDialogComponent } from '../../../../../../main/webapp/app/entities/ugovor-materijal-stav/ugovor-materijal-stav-dialog.component';
import { UgovorMaterijalStavService } from '../../../../../../main/webapp/app/entities/ugovor-materijal-stav/ugovor-materijal-stav.service';
import { UgovorMaterijalStav } from '../../../../../../main/webapp/app/entities/ugovor-materijal-stav/ugovor-materijal-stav.model';
import { UgovorMaterijalService } from '../../../../../../main/webapp/app/entities/ugovor-materijal';
import { JedMereService } from '../../../../../../main/webapp/app/entities/jed-mere';

describe('Component Tests', () => {

    describe('UgovorMaterijalStav Management Dialog Component', () => {
        let comp: UgovorMaterijalStavDialogComponent;
        let fixture: ComponentFixture<UgovorMaterijalStavDialogComponent>;
        let service: UgovorMaterijalStavService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [UgovorMaterijalStavDialogComponent],
                providers: [
                    UgovorMaterijalService,
                    JedMereService,
                    UgovorMaterijalStavService
                ]
            })
            .overrideTemplate(UgovorMaterijalStavDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UgovorMaterijalStavDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UgovorMaterijalStavService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UgovorMaterijalStav(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.ugovorMaterijalStav = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ugovorMaterijalStavListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UgovorMaterijalStav();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.ugovorMaterijalStav = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ugovorMaterijalStavListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
