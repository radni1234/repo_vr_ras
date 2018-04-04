package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.Prijava;
import com.vr.rasveta.repository.PrijavaRepository;
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
 * Test class for the PrijavaResource REST controller.
 *
 * @see PrijavaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class PrijavaResourceIntTest {

    private static final String DEFAULT_OPIS = "AAAAAAAAAA";
    private static final String UPDATED_OPIS = "BBBBBBBBBB";

    private static final String DEFAULT_PRIJAVIO = "AAAAAAAAAA";
    private static final String UPDATED_PRIJAVIO = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFON = "AAAAAAAAAA";
    private static final String UPDATED_TELEFON = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATUM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATUM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private PrijavaRepository prijavaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPrijavaMockMvc;

    private Prijava prijava;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrijavaResource prijavaResource = new PrijavaResource(prijavaRepository);
        this.restPrijavaMockMvc = MockMvcBuilders.standaloneSetup(prijavaResource)
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
    public static Prijava createEntity(EntityManager em) {
        Prijava prijava = new Prijava()
            .opis(DEFAULT_OPIS)
            .prijavio(DEFAULT_PRIJAVIO)
            .telefon(DEFAULT_TELEFON)
            .email(DEFAULT_EMAIL)
            .datum(DEFAULT_DATUM);
        return prijava;
    }

    @Before
    public void initTest() {
        prijava = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrijava() throws Exception {
        int databaseSizeBeforeCreate = prijavaRepository.findAll().size();

        // Create the Prijava
        restPrijavaMockMvc.perform(post("/api/prijavas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prijava)))
            .andExpect(status().isCreated());

        // Validate the Prijava in the database
        List<Prijava> prijavaList = prijavaRepository.findAll();
        assertThat(prijavaList).hasSize(databaseSizeBeforeCreate + 1);
        Prijava testPrijava = prijavaList.get(prijavaList.size() - 1);
        assertThat(testPrijava.getOpis()).isEqualTo(DEFAULT_OPIS);
        assertThat(testPrijava.getPrijavio()).isEqualTo(DEFAULT_PRIJAVIO);
        assertThat(testPrijava.getTelefon()).isEqualTo(DEFAULT_TELEFON);
        assertThat(testPrijava.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testPrijava.getDatum()).isEqualTo(DEFAULT_DATUM);
    }

    @Test
    @Transactional
    public void createPrijavaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prijavaRepository.findAll().size();

        // Create the Prijava with an existing ID
        prijava.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrijavaMockMvc.perform(post("/api/prijavas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prijava)))
            .andExpect(status().isBadRequest());

        // Validate the Prijava in the database
        List<Prijava> prijavaList = prijavaRepository.findAll();
        assertThat(prijavaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPrijavas() throws Exception {
        // Initialize the database
        prijavaRepository.saveAndFlush(prijava);

        // Get all the prijavaList
        restPrijavaMockMvc.perform(get("/api/prijavas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prijava.getId().intValue())))
            .andExpect(jsonPath("$.[*].opis").value(hasItem(DEFAULT_OPIS.toString())))
            .andExpect(jsonPath("$.[*].prijavio").value(hasItem(DEFAULT_PRIJAVIO.toString())))
            .andExpect(jsonPath("$.[*].telefon").value(hasItem(DEFAULT_TELEFON.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].datum").value(hasItem(DEFAULT_DATUM.toString())));
    }

    @Test
    @Transactional
    public void getPrijava() throws Exception {
        // Initialize the database
        prijavaRepository.saveAndFlush(prijava);

        // Get the prijava
        restPrijavaMockMvc.perform(get("/api/prijavas/{id}", prijava.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(prijava.getId().intValue()))
            .andExpect(jsonPath("$.opis").value(DEFAULT_OPIS.toString()))
            .andExpect(jsonPath("$.prijavio").value(DEFAULT_PRIJAVIO.toString()))
            .andExpect(jsonPath("$.telefon").value(DEFAULT_TELEFON.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.datum").value(DEFAULT_DATUM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPrijava() throws Exception {
        // Get the prijava
        restPrijavaMockMvc.perform(get("/api/prijavas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrijava() throws Exception {
        // Initialize the database
        prijavaRepository.saveAndFlush(prijava);
        int databaseSizeBeforeUpdate = prijavaRepository.findAll().size();

        // Update the prijava
        Prijava updatedPrijava = prijavaRepository.findOne(prijava.getId());
        // Disconnect from session so that the updates on updatedPrijava are not directly saved in db
        em.detach(updatedPrijava);
        updatedPrijava
            .opis(UPDATED_OPIS)
            .prijavio(UPDATED_PRIJAVIO)
            .telefon(UPDATED_TELEFON)
            .email(UPDATED_EMAIL)
            .datum(UPDATED_DATUM);

        restPrijavaMockMvc.perform(put("/api/prijavas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrijava)))
            .andExpect(status().isOk());

        // Validate the Prijava in the database
        List<Prijava> prijavaList = prijavaRepository.findAll();
        assertThat(prijavaList).hasSize(databaseSizeBeforeUpdate);
        Prijava testPrijava = prijavaList.get(prijavaList.size() - 1);
        assertThat(testPrijava.getOpis()).isEqualTo(UPDATED_OPIS);
        assertThat(testPrijava.getPrijavio()).isEqualTo(UPDATED_PRIJAVIO);
        assertThat(testPrijava.getTelefon()).isEqualTo(UPDATED_TELEFON);
        assertThat(testPrijava.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPrijava.getDatum()).isEqualTo(UPDATED_DATUM);
    }

    @Test
    @Transactional
    public void updateNonExistingPrijava() throws Exception {
        int databaseSizeBeforeUpdate = prijavaRepository.findAll().size();

        // Create the Prijava

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPrijavaMockMvc.perform(put("/api/prijavas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prijava)))
            .andExpect(status().isCreated());

        // Validate the Prijava in the database
        List<Prijava> prijavaList = prijavaRepository.findAll();
        assertThat(prijavaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePrijava() throws Exception {
        // Initialize the database
        prijavaRepository.saveAndFlush(prijava);
        int databaseSizeBeforeDelete = prijavaRepository.findAll().size();

        // Get the prijava
        restPrijavaMockMvc.perform(delete("/api/prijavas/{id}", prijava.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Prijava> prijavaList = prijavaRepository.findAll();
        assertThat(prijavaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Prijava.class);
        Prijava prijava1 = new Prijava();
        prijava1.setId(1L);
        Prijava prijava2 = new Prijava();
        prijava2.setId(prijava1.getId());
        assertThat(prijava1).isEqualTo(prijava2);
        prijava2.setId(2L);
        assertThat(prijava1).isNotEqualTo(prijava2);
        prijava1.setId(null);
        assertThat(prijava1).isNotEqualTo(prijava2);
    }
}
