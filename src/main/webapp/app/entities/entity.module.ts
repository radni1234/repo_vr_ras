import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RasvetaOpstinaModule } from './opstina/opstina.module';
import { RasvetaMestoModule } from './mesto/mesto.module';
import { RasvetaStubTipModule } from './stub-tip/stub-tip.module';
import { RasvetaStubModule } from './stub/stub.module';
import { RasvetaSvetiljkaTipModule } from './svetiljka-tip/svetiljka-tip.module';
import { RasvetaSvetiljkaModule } from './svetiljka/svetiljka.module';
import { RasvetaJedMereModule } from './jed-mere/jed-mere.module';
import { RasvetaIntervencijaTipModule } from './intervencija-tip/intervencija-tip.module';
import { RasvetaMaterijalTipModule } from './materijal-tip/materijal-tip.module';
import { RasvetaStatusModule } from './status/status.module';
import { RasvetaUgovorMaterijalModule } from './ugovor-materijal/ugovor-materijal.module';
import { RasvetaUgovorMaterijalStavModule } from './ugovor-materijal-stav/ugovor-materijal-stav.module';
import { RasvetaUgovorIntervencijaModule } from './ugovor-intervencija/ugovor-intervencija.module';
import { RasvetaUgovorIntervencijaStavModule } from './ugovor-intervencija-stav/ugovor-intervencija-stav.module';
import { RasvetaPrijavaModule } from './prijava/prijava.module';
import { RasvetaPrijavaStatusModule } from './prijava-status/prijava-status.module';
import { RasvetaPrijavaIntervencijaModule } from './prijava-intervencija/prijava-intervencija.module';
import { RasvetaPrijavaMaterijalModule } from './prijava-materijal/prijava-materijal.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        RasvetaOpstinaModule,
        RasvetaMestoModule,
        RasvetaStubTipModule,
        RasvetaStubModule,
        RasvetaSvetiljkaTipModule,
        RasvetaSvetiljkaModule,
        RasvetaJedMereModule,
        RasvetaIntervencijaTipModule,
        RasvetaMaterijalTipModule,
        RasvetaStatusModule,
        RasvetaUgovorMaterijalModule,
        RasvetaUgovorMaterijalStavModule,
        RasvetaUgovorIntervencijaModule,
        RasvetaUgovorIntervencijaStavModule,
        RasvetaPrijavaModule,
        RasvetaPrijavaStatusModule,
        RasvetaPrijavaIntervencijaModule,
        RasvetaPrijavaMaterijalModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaEntityModule {}
