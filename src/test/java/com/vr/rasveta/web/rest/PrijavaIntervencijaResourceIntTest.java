package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.PrijavaIntervencija;
import com.vr.rasveta.repository.PrijavaIntervencijaRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.vr.rasveta.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PrijavaIntervencijaResource REST controller.
 *
 * @see PrijavaIntervencijaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class PrijavaIntervencijaResourceIntTest {

    private static final String DEFAULT_OPIS = "AAAAAAAAAA";
    private static final String UPDATED_OPIS = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATUM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATUM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private PrijavaIntervencijaRepository prijavaIntervencijaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPrijavaIntervencijaMockMvc;

    private PrijavaIntervencija prijavaIntervencija;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrijavaIntervencijaResource prijavaIntervencijaResource = new PrijavaIntervencijaResource(prijavaIntervencijaRepository);
        this.restPrijavaIntervencijaMockMvc = MockMvcBuilders.standaloneSetup(prijavaIntervencijaResource)
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
    public static PrijavaIntervencija createEntity(EntityManager em) {
        PrijavaIntervencija prijavaIntervencija = new PrijavaIntervencija()
            .opis(DEFAULT_OPIS)
            .datum(DEFAULT_DATUM);
        return prijavaIntervencija;
    }

    @Before
    public void initTest() {
        prijavaIntervencija = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrijavaIntervencija() throws Exception {
        int databaseSizeBeforeCreate = prijavaIntervencijaRepository.findAll().size();

        // Create the PrijavaIntervencija
        restPrijavaIntervencijaMockMvc.perform(post("/api/prijava-intervencijas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prijavaIntervencija)))
            .andExpect(status().isCreated());

        // Validate the PrijavaIntervencija in the database
        List<PrijavaIntervencija> prijavaIntervencijaList = prijavaIntervencijaRepository.findAll();
        assertThat(prijavaIntervencijaList).hasSize(databaseSizeBeforeCreate + 1);
        PrijavaIntervencija testPrijavaIntervencija = prijavaIntervencijaList.get(prijavaIntervencijaList.size() - 1);
        assertThat(testPrijavaIntervencija.getOpis()).isEqualTo(DEFAULT_OPIS);
        assertThat(testPrijavaIntervencija.getDatum()).isEqualTo(DEFAULT_DATUM);
    }

    @Test
    @Transactional
    public void createPrijavaIntervencijaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prijavaIntervencijaRepository.findAll().size();

        // Create the PrijavaIntervencija with an existing ID
        prijavaIntervencija.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrijavaIntervencijaMockMvc.perform(post("/api/prijava-intervencijas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prijavaIntervencija)))
            .andExpect(status().isBadRequest());

        // Validate the PrijavaIntervencija in the database
        List<PrijavaIntervencija> prijavaIntervencijaList = prijavaIntervencijaRepository.findAll();
        assertThat(prijavaIntervencijaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPrijavaIntervencijas() throws Exception {
        // Initialize the database
        prijavaIntervencijaRepository.saveAndFlush(prijavaIntervencija);

        // Get all the prijavaIntervencijaList
        restPrijavaIntervencijaMockMvc.perform(get("/api/prijava-intervencijas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prijavaIntervencija.getId().intValue())))
            .andExpect(jsonPath("$.[*].opis").value(hasItem(DEFAULT_OPIS.toString())))
            .andExpect(jsonPath("$.[*].datum").value(hasItem(DEFAULT_DATUM.toString())));
    }

    @Test
    @Transactional
    public void getPrijavaIntervencija() throws Exception {
        // Initialize the database
        prijavaIntervencijaRepository.saveAndFlush(prijavaIntervencija);

        // Get the prijavaIntervencija
        restPrijavaIntervencijaMockMvc.perform(get("/api/prijava-intervencijas/{id}", prijavaIntervencija.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(prijavaIntervencija.getId().intValue()))
            .andExpect(jsonPath("$.opis").value(DEFAULT_OPIS.toString()))
            .andExpect(jsonPath("$.datum").value(DEFAULT_DATUM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPrijavaIntervencija() throws Exception {
        // Get the prijavaIntervencija
        restPrijavaIntervencijaMockMvc.perform(get("/api/prijava-intervencijas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrijavaIntervencija() throws Exception {
        // Initialize the database
        prijavaIntervencijaRepository.saveAndFlush(prijavaIntervencija);
        int databaseSizeBeforeUpdate = prijavaIntervencijaRepository.findAll().size();

        // Update the prijavaIntervencija
        PrijavaIntervencija updatedPrijavaIntervencija = prijavaIntervencijaRepository.findOne(prijavaIntervencija.getId());
        // Disconnect from session so that the updates on updatedPrijavaIntervencija are not directly saved in db
        em.detach(updatedPrijavaIntervencija);
        updatedPrijavaIntervencija
            .opis(UPDATED_OPIS)
            .datum(UPDATED_DATUM);

        restPrijavaIntervencijaMockMvc.perform(put("/api/prijava-intervencijas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrijavaIntervencija)))
            .andExpect(status().isOk());

        // Validate the PrijavaIntervencija in the database
        List<PrijavaIntervencija> prijavaIntervencijaList = prijavaIntervencijaRepository.findAll();
        assertThat(prijavaIntervencijaList).hasSize(databaseSizeBeforeUpdate);
        PrijavaIntervencija testPrijavaIntervencija = prijavaIntervencijaList.get(prijavaIntervencijaList.size() - 1);
        assertThat(testPrijavaIntervencija.getOpis()).isEqualTo(UPDATED_OPIS);
        assertThat(testPrijavaIntervencija.getDatum()).isEqualTo(UPDATED_DATUM);
    }

    @Test
    @Transactional
    public void updateNonExistingPrijavaIntervencija() throws Exception {
        int databaseSizeBeforeUpdate = prijavaIntervencijaRepository.findAll().size();

        // Create the PrijavaIntervencija

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPrijavaIntervencijaMockMvc.perform(put("/api/prijava-intervencijas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prijavaIntervencija)))
            .andExpect(status().isCreated());

        // Validate the PrijavaIntervencija in the database
        List<PrijavaIntervencija> prijavaIntervencijaList = prijavaIntervencijaRepository.findAll();
        assertThat(prijavaIntervencijaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePrijavaIntervencija() throws Exception {
        // Initialize the database
        prijavaIntervencijaRepository.saveAndFlush(prijavaIntervencija);
        int databaseSizeBeforeDelete = prijavaIntervencijaRepository.findAll().size();

        // Get the prijavaIntervencija
        restPrijavaIntervencijaMockMvc.perform(delete("/api/prijava-intervencijas/{id}", prijavaIntervencija.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PrijavaIntervencija> prijavaIntervencijaList = prijavaIntervencijaRepository.findAll();
        assertThat(prijavaIntervencijaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrijavaIntervencija.class);
        PrijavaIntervencija prijavaIntervencija1 = new PrijavaIntervencija();
        prijavaIntervencija1.setId(1L);
        PrijavaIntervencija prijavaIntervencija2 = new PrijavaIntervencija();
        prijavaIntervencija2.setId(prijavaIntervencija1.getId());
        assertThat(prijavaIntervencija1).isEqualTo(prijavaIntervencija2);
        prijavaIntervencija2.setId(2L);
        assertThat(prijavaIntervencija1).isNotEqualTo(prijavaIntervencija2);
        prijavaIntervencija1.setId(null);
        assertThat(prijavaIntervencija1).isNotEqualTo(prijavaIntervencija2);
    }
}
