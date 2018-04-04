package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.UgovorIntervencija;
import com.vr.rasveta.repository.UgovorIntervencijaRepository;
import com.vr.rasveta.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.vr.rasveta.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UgovorIntervencijaResource REST controller.
 *
 * @see UgovorIntervencijaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class UgovorIntervencijaResourceIntTest {

    private static final String DEFAULT_OPIS = "AAAAAAAAAA";
    private static final String UPDATED_OPIS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATUM_OD = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATUM_OD = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATUM_DO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATUM_DO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private UgovorIntervencijaRepository ugovorIntervencijaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUgovorIntervencijaMockMvc;

    private UgovorIntervencija ugovorIntervencija;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UgovorIntervencijaResource ugovorIntervencijaResource = new UgovorIntervencijaResource(ugovorIntervencijaRepository);
        this.restUgovorIntervencijaMockMvc = MockMvcBuilders.standaloneSetup(ugovorIntervencijaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UgovorIntervencija createEntity(EntityManager em) {
        UgovorIntervencija ugovorIntervencija = new UgovorIntervencija()
            .opis(DEFAULT_OPIS)
            .datumOd(DEFAULT_DATUM_OD)
            .datumDo(DEFAULT_DATUM_DO);
        return ugovorIntervencija;
    }

    @Before
    public void initTest() {
        ugovorIntervencija = createEntity(em);
    }

    @Test
    @Transactional
    public void createUgovorIntervencija() throws Exception {
        int databaseSizeBeforeCreate = ugovorIntervencijaRepository.findAll().size();

        // Create the UgovorIntervencija
        restUgovorIntervencijaMockMvc.perform(post("/api/ugovor-intervencijas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ugovorIntervencija)))
            .andExpect(status().isCreated());

        // Validate the UgovorIntervencija in the database
        List<UgovorIntervencija> ugovorIntervencijaList = ugovorIntervencijaRepository.findAll();
        assertThat(ugovorIntervencijaList).hasSize(databaseSizeBeforeCreate + 1);
        UgovorIntervencija testUgovorIntervencija = ugovorIntervencijaList.get(ugovorIntervencijaList.size() - 1);
        assertThat(testUgovorIntervencija.getOpis()).isEqualTo(DEFAULT_OPIS);
        assertThat(testUgovorIntervencija.getDatumOd()).isEqualTo(DEFAULT_DATUM_OD);
        assertThat(testUgovorIntervencija.getDatumDo()).isEqualTo(DEFAULT_DATUM_DO);
    }

    @Test
    @Transactional
    public void createUgovorIntervencijaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ugovorIntervencijaRepository.findAll().size();

        // Create the UgovorIntervencija with an existing ID
        ugovorIntervencija.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUgovorIntervencijaMockMvc.perform(post("/api/ugovor-intervencijas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ugovorIntervencija)))
            .andExpect(status().isBadRequest());

        // Validate the UgovorIntervencija in the database
        List<UgovorIntervencija> ugovorIntervencijaList = ugovorIntervencijaRepository.findAll();
        assertThat(ugovorIntervencijaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUgovorIntervencijas() throws Exception {
        // Initialize the database
        ugovorIntervencijaRepository.saveAndFlush(ugovorIntervencija);

        // Get all the ugovorIntervencijaList
        restUgovorIntervencijaMockMvc.perform(get("/api/ugovor-intervencijas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ugovorIntervencija.getId().intValue())))
            .andExpect(jsonPath("$.[*].opis").value(hasItem(DEFAULT_OPIS.toString())))
            .andExpect(jsonPath("$.[*].datumOd").value(hasItem(DEFAULT_DATUM_OD.toString())))
            .andExpect(jsonPath("$.[*].datumDo").value(hasItem(DEFAULT_DATUM_DO.toString())));
    }

    @Test
    @Transactional
    public void getUgovorIntervencija() throws Exception {
        // Initialize the database
        ugovorIntervencijaRepository.saveAndFlush(ugovorIntervencija);

        // Get the ugovorIntervencija
        restUgovorIntervencijaMockMvc.perform(get("/api/ugovor-intervencijas/{id}", ugovorIntervencija.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ugovorIntervencija.getId().intValue()))
            .andExpect(jsonPath("$.opis").value(DEFAULT_OPIS.toString()))
            .andExpect(jsonPath("$.datumOd").value(DEFAULT_DATUM_OD.toString()))
            .andExpect(jsonPath("$.datumDo").value(DEFAULT_DATUM_DO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUgovorIntervencija() throws Exception {
        // Get the ugovorIntervencija
        restUgovorIntervencijaMockMvc.perform(get("/api/ugovor-intervencijas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUgovorIntervencija() throws Exception {
        // Initialize the database
        ugovorIntervencijaRepository.saveAndFlush(ugovorIntervencija);
        int databaseSizeBeforeUpdate = ugovorIntervencijaRepository.findAll().size();

        // Update the ugovorIntervencija
        UgovorIntervencija updatedUgovorIntervencija = ugovorIntervencijaRepository.findOne(ugovorIntervencija.getId());
        // Disconnect from session so that the updates on updatedUgovorIntervencija are not directly saved in db
        em.detach(updatedUgovorIntervencija);
        updatedUgovorIntervencija
            .opis(UPDATED_OPIS)
            .datumOd(UPDATED_DATUM_OD)
            .datumDo(UPDATED_DATUM_DO);

        restUgovorIntervencijaMockMvc.perform(put("/api/ugovor-intervencijas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUgovorIntervencija)))
            .andExpect(status().isOk());

        // Validate the UgovorIntervencija in the database
        List<UgovorIntervencija> ugovorIntervencijaList = ugovorIntervencijaRepository.findAll();
        assertThat(ugovorIntervencijaList).hasSize(databaseSizeBeforeUpdate);
        UgovorIntervencija testUgovorIntervencija = ugovorIntervencijaList.get(ugovorIntervencijaList.size() - 1);
        assertThat(testUgovorIntervencija.getOpis()).isEqualTo(UPDATED_OPIS);
        assertThat(testUgovorIntervencija.getDatumOd()).isEqualTo(UPDATED_DATUM_OD);
        assertThat(testUgovorIntervencija.getDatumDo()).isEqualTo(UPDATED_DATUM_DO);
    }

    @Test
    @Transactional
    public void updateNonExistingUgovorIntervencija() throws Exception {
        int databaseSizeBeforeUpdate = ugovorIntervencijaRepository.findAll().size();

        // Create the UgovorIntervencija

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUgovorIntervencijaMockMvc.perform(put("/api/ugovor-intervencijas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ugovorIntervencija)))
            .andExpect(status().isCreated());

        // Validate the UgovorIntervencija in the database
        List<UgovorIntervencija> ugovorIntervencijaList = ugovorIntervencijaRepository.findAll();
        assertThat(ugovorIntervencijaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUgovorIntervencija() throws Exception {
        // Initialize the database
        ugovorIntervencijaRepository.saveAndFlush(ugovorIntervencija);
        int databaseSizeBeforeDelete = ugovorIntervencijaRepository.findAll().size();

        // Get the ugovorIntervencija
        restUgovorIntervencijaMockMvc.perform(delete("/api/ugovor-intervencijas/{id}", ugovorIntervencija.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UgovorIntervencija> ugovorIntervencijaList = ugovorIntervencijaRepository.findAll();
        assertThat(ugovorIntervencijaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UgovorIntervencija.class);
        UgovorIntervencija ugovorIntervencija1 = new UgovorIntervencija();
        ugovorIntervencija1.setId(1L);
        UgovorIntervencija ugovorIntervencija2 = new UgovorIntervencija();
        ugovorIntervencija2.setId(ugovorIntervencija1.getId());
        assertThat(ugovorIntervencija1).isEqualTo(ugovorIntervencija2);
        ugovorIntervencija2.setId(2L);
        assertThat(ugovorIntervencija1).isNotEqualTo(ugovorIntervencija2);
        ugovorIntervencija1.setId(null);
        assertThat(ugovorIntervencija1).isNotEqualTo(ugovorIntervencija2);
    }
}
