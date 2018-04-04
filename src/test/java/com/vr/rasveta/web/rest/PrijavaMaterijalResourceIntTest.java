package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.PrijavaMaterijal;
import com.vr.rasveta.repository.PrijavaMaterijalRepository;
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
 * Test class for the PrijavaMaterijalResource REST controller.
 *
 * @see PrijavaMaterijalResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class PrijavaMaterijalResourceIntTest {

    private static final Integer DEFAULT_KOLICINA = 1;
    private static final Integer UPDATED_KOLICINA = 2;

    private static final String DEFAULT_OPIS = "AAAAAAAAAA";
    private static final String UPDATED_OPIS = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATUM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATUM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private PrijavaMaterijalRepository prijavaMaterijalRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPrijavaMaterijalMockMvc;

    private PrijavaMaterijal prijavaMaterijal;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrijavaMaterijalResource prijavaMaterijalResource = new PrijavaMaterijalResource(prijavaMaterijalRepository);
        this.restPrijavaMaterijalMockMvc = MockMvcBuilders.standaloneSetup(prijavaMaterijalResource)
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
    public static PrijavaMaterijal createEntity(EntityManager em) {
        PrijavaMaterijal prijavaMaterijal = new PrijavaMaterijal()
            .kolicina(DEFAULT_KOLICINA)
            .opis(DEFAULT_OPIS)
            .datum(DEFAULT_DATUM);
        return prijavaMaterijal;
    }

    @Before
    public void initTest() {
        prijavaMaterijal = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrijavaMaterijal() throws Exception {
        int databaseSizeBeforeCreate = prijavaMaterijalRepository.findAll().size();

        // Create the PrijavaMaterijal
        restPrijavaMaterijalMockMvc.perform(post("/api/prijava-materijals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prijavaMaterijal)))
            .andExpect(status().isCreated());

        // Validate the PrijavaMaterijal in the database
        List<PrijavaMaterijal> prijavaMaterijalList = prijavaMaterijalRepository.findAll();
        assertThat(prijavaMaterijalList).hasSize(databaseSizeBeforeCreate + 1);
        PrijavaMaterijal testPrijavaMaterijal = prijavaMaterijalList.get(prijavaMaterijalList.size() - 1);
        assertThat(testPrijavaMaterijal.getKolicina()).isEqualTo(DEFAULT_KOLICINA);
        assertThat(testPrijavaMaterijal.getOpis()).isEqualTo(DEFAULT_OPIS);
        assertThat(testPrijavaMaterijal.getDatum()).isEqualTo(DEFAULT_DATUM);
    }

    @Test
    @Transactional
    public void createPrijavaMaterijalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prijavaMaterijalRepository.findAll().size();

        // Create the PrijavaMaterijal with an existing ID
        prijavaMaterijal.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrijavaMaterijalMockMvc.perform(post("/api/prijava-materijals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prijavaMaterijal)))
            .andExpect(status().isBadRequest());

        // Validate the PrijavaMaterijal in the database
        List<PrijavaMaterijal> prijavaMaterijalList = prijavaMaterijalRepository.findAll();
        assertThat(prijavaMaterijalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPrijavaMaterijals() throws Exception {
        // Initialize the database
        prijavaMaterijalRepository.saveAndFlush(prijavaMaterijal);

        // Get all the prijavaMaterijalList
        restPrijavaMaterijalMockMvc.perform(get("/api/prijava-materijals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prijavaMaterijal.getId().intValue())))
            .andExpect(jsonPath("$.[*].kolicina").value(hasItem(DEFAULT_KOLICINA)))
            .andExpect(jsonPath("$.[*].opis").value(hasItem(DEFAULT_OPIS.toString())))
            .andExpect(jsonPath("$.[*].datum").value(hasItem(DEFAULT_DATUM.toString())));
    }

    @Test
    @Transactional
    public void getPrijavaMaterijal() throws Exception {
        // Initialize the database
        prijavaMaterijalRepository.saveAndFlush(prijavaMaterijal);

        // Get the prijavaMaterijal
        restPrijavaMaterijalMockMvc.perform(get("/api/prijava-materijals/{id}", prijavaMaterijal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(prijavaMaterijal.getId().intValue()))
            .andExpect(jsonPath("$.kolicina").value(DEFAULT_KOLICINA))
            .andExpect(jsonPath("$.opis").value(DEFAULT_OPIS.toString()))
            .andExpect(jsonPath("$.datum").value(DEFAULT_DATUM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPrijavaMaterijal() throws Exception {
        // Get the prijavaMaterijal
        restPrijavaMaterijalMockMvc.perform(get("/api/prijava-materijals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrijavaMaterijal() throws Exception {
        // Initialize the database
        prijavaMaterijalRepository.saveAndFlush(prijavaMaterijal);
        int databaseSizeBeforeUpdate = prijavaMaterijalRepository.findAll().size();

        // Update the prijavaMaterijal
        PrijavaMaterijal updatedPrijavaMaterijal = prijavaMaterijalRepository.findOne(prijavaMaterijal.getId());
        // Disconnect from session so that the updates on updatedPrijavaMaterijal are not directly saved in db
        em.detach(updatedPrijavaMaterijal);
        updatedPrijavaMaterijal
            .kolicina(UPDATED_KOLICINA)
            .opis(UPDATED_OPIS)
            .datum(UPDATED_DATUM);

        restPrijavaMaterijalMockMvc.perform(put("/api/prijava-materijals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrijavaMaterijal)))
            .andExpect(status().isOk());

        // Validate the PrijavaMaterijal in the database
        List<PrijavaMaterijal> prijavaMaterijalList = prijavaMaterijalRepository.findAll();
        assertThat(prijavaMaterijalList).hasSize(databaseSizeBeforeUpdate);
        PrijavaMaterijal testPrijavaMaterijal = prijavaMaterijalList.get(prijavaMaterijalList.size() - 1);
        assertThat(testPrijavaMaterijal.getKolicina()).isEqualTo(UPDATED_KOLICINA);
        assertThat(testPrijavaMaterijal.getOpis()).isEqualTo(UPDATED_OPIS);
        assertThat(testPrijavaMaterijal.getDatum()).isEqualTo(UPDATED_DATUM);
    }

    @Test
    @Transactional
    public void updateNonExistingPrijavaMaterijal() throws Exception {
        int databaseSizeBeforeUpdate = prijavaMaterijalRepository.findAll().size();

        // Create the PrijavaMaterijal

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPrijavaMaterijalMockMvc.perform(put("/api/prijava-materijals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prijavaMaterijal)))
            .andExpect(status().isCreated());

        // Validate the PrijavaMaterijal in the database
        List<PrijavaMaterijal> prijavaMaterijalList = prijavaMaterijalRepository.findAll();
        assertThat(prijavaMaterijalList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePrijavaMaterijal() throws Exception {
        // Initialize the database
        prijavaMaterijalRepository.saveAndFlush(prijavaMaterijal);
        int databaseSizeBeforeDelete = prijavaMaterijalRepository.findAll().size();

        // Get the prijavaMaterijal
        restPrijavaMaterijalMockMvc.perform(delete("/api/prijava-materijals/{id}", prijavaMaterijal.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PrijavaMaterijal> prijavaMaterijalList = prijavaMaterijalRepository.findAll();
        assertThat(prijavaMaterijalList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrijavaMaterijal.class);
        PrijavaMaterijal prijavaMaterijal1 = new PrijavaMaterijal();
        prijavaMaterijal1.setId(1L);
        PrijavaMaterijal prijavaMaterijal2 = new PrijavaMaterijal();
        prijavaMaterijal2.setId(prijavaMaterijal1.getId());
        assertThat(prijavaMaterijal1).isEqualTo(prijavaMaterijal2);
        prijavaMaterijal2.setId(2L);
        assertThat(prijavaMaterijal1).isNotEqualTo(prijavaMaterijal2);
        prijavaMaterijal1.setId(null);
        assertThat(prijavaMaterijal1).isNotEqualTo(prijavaMaterijal2);
    }
}
