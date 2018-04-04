/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { JedMereDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/jed-mere/jed-mere-delete-dialog.component';
import { JedMereService } from '../../../../../../main/webapp/app/entities/jed-mere/jed-mere.service';

describe('Component Tests', () => {

    describe('JedMere Management Delete Component', () => {
        let comp: JedMereDeleteDialogComponent;
        let fixture: ComponentFixture<JedMereDeleteDialogComponent>;
        let service: JedMereService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [JedMereDeleteDialogComponent],
                providers: [
                    JedMereService
                ]
            })
            .overrideTemplate(JedMereDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JedMereDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JedMereService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
