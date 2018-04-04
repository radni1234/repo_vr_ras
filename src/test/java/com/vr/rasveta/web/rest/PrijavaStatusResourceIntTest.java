package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.PrijavaStatus;
import com.vr.rasveta.repository.PrijavaStatusRepository;
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
 * Test class for the PrijavaStatusResource REST controller.
 *
 * @see PrijavaStatusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class PrijavaStatusResourceIntTest {

    private static final String DEFAULT_OPIS = "AAAAAAAAAA";
    private static final String UPDATED_OPIS = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATUM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATUM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_TRAJANJE = 1L;
    private static final Long UPDATED_TRAJANJE = 2L;

    @Autowired
    private PrijavaStatusRepository prijavaStatusRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPrijavaStatusMockMvc;

    private PrijavaStatus prijavaStatus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrijavaStatusResource prijavaStatusResource = new PrijavaStatusResource(prijavaStatusRepository);
        this.restPrijavaStatusMockMvc = MockMvcBuilders.standaloneSetup(prijavaStatusResource)
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
    public static PrijavaStatus createEntity(EntityManager em) {
        PrijavaStatus prijavaStatus = new PrijavaStatus()
            .opis(DEFAULT_OPIS)
            .datum(DEFAULT_DATUM)
            .trajanje(DEFAULT_TRAJANJE);
        return prijavaStatus;
    }

    @Before
    public void initTest() {
        prijavaStatus = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrijavaStatus() throws Exception {
        int databaseSizeBeforeCreate = prijavaStatusRepository.findAll().size();

        // Create the PrijavaStatus
        restPrijavaStatusMockMvc.perform(post("/api/prijava-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prijavaStatus)))
            .andExpect(status().isCreated());

        // Validate the PrijavaStatus in the database
        List<PrijavaStatus> prijavaStatusList = prijavaStatusRepository.findAll();
        assertThat(prijavaStatusList).hasSize(databaseSizeBeforeCreate + 1);
        PrijavaStatus testPrijavaStatus = prijavaStatusList.get(prijavaStatusList.size() - 1);
        assertThat(testPrijavaStatus.getOpis()).isEqualTo(DEFAULT_OPIS);
        assertThat(testPrijavaStatus.getDatum()).isEqualTo(DEFAULT_DATUM);
        assertThat(testPrijavaStatus.getTrajanje()).isEqualTo(DEFAULT_TRAJANJE);
    }

    @Test
    @Transactional
    public void createPrijavaStatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prijavaStatusRepository.findAll().size();

        // Create the PrijavaStatus with an existing ID
        prijavaStatus.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrijavaStatusMockMvc.perform(post("/api/prijava-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prijavaStatus)))
            .andExpect(status().isBadRequest());

        // Validate the PrijavaStatus in the database
        List<PrijavaStatus> prijavaStatusList = prijavaStatusRepository.findAll();
        assertThat(prijavaStatusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPrijavaStatuses() throws Exception {
        // Initialize the database
        prijavaStatusRepository.saveAndFlush(prijavaStatus);

        // Get all the prijavaStatusList
        restPrijavaStatusMockMvc.perform(get("/api/prijava-statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prijavaStatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].opis").value(hasItem(DEFAULT_OPIS.toString())))
            .andExpect(jsonPath("$.[*].datum").value(hasItem(DEFAULT_DATUM.toString())))
            .andExpect(jsonPath("$.[*].trajanje").value(hasItem(DEFAULT_TRAJANJE.intValue())));
    }

    @Test
    @Transactional
    public void getPrijavaStatus() throws Exception {
        // Initialize the database
        prijavaStatusRepository.saveAndFlush(prijavaStatus);

        // Get the prijavaStatus
        restPrijavaStatusMockMvc.perform(get("/api/prijava-statuses/{id}", prijavaStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(prijavaStatus.getId().intValue()))
            .andExpect(jsonPath("$.opis").value(DEFAULT_OPIS.toString()))
            .andExpect(jsonPath("$.datum").value(DEFAULT_DATUM.toString()))
            .andExpect(jsonPath("$.trajanje").value(DEFAULT_TRAJANJE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPrijavaStatus() throws Exception {
        // Get the prijavaStatus
        restPrijavaStatusMockMvc.perform(get("/api/prijava-statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrijavaStatus() throws Exception {
        // Initialize the database
        prijavaStatusRepository.saveAndFlush(prijavaStatus);
        int databaseSizeBeforeUpdate = prijavaStatusRepository.findAll().size();

        // Update the prijavaStatus
        PrijavaStatus updatedPrijavaStatus = prijavaStatusRepository.findOne(prijavaStatus.getId());
        // Disconnect from session so that the updates on updatedPrijavaStatus are not directly saved in db
        em.detach(updatedPrijavaStatus);
        updatedPrijavaStatus
            .opis(UPDATED_OPIS)
            .datum(UPDATED_DATUM)
            .trajanje(UPDATED_TRAJANJE);

        restPrijavaStatusMockMvc.perform(put("/api/prijava-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrijavaStatus)))
            .andExpect(status().isOk());

        // Validate the PrijavaStatus in the database
        List<PrijavaStatus> prijavaStatusList = prijavaStatusRepository.findAll();
        assertThat(prijavaStatusList).hasSize(databaseSizeBeforeUpdate);
        PrijavaStatus testPrijavaStatus = prijavaStatusList.get(prijavaStatusList.size() - 1);
        assertThat(testPrijavaStatus.getOpis()).isEqualTo(UPDATED_OPIS);
        assertThat(testPrijavaStatus.getDatum()).isEqualTo(UPDATED_DATUM);
        assertThat(testPrijavaStatus.getTrajanje()).isEqualTo(UPDATED_TRAJANJE);
    }

    @Test
    @Transactional
    public void updateNonExistingPrijavaStatus() throws Exception {
        int databaseSizeBeforeUpdate = prijavaStatusRepository.findAll().size();

        // Create the PrijavaStatus

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPrijavaStatusMockMvc.perform(put("/api/prijava-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prijavaStatus)))
            .andExpect(status().isCreated());

        // Validate the PrijavaStatus in the database
        List<PrijavaStatus> prijavaStatusList = prijavaStatusRepository.findAll();
        assertThat(prijavaStatusList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePrijavaStatus() throws Exception {
        // Initialize the database
        prijavaStatusRepository.saveAndFlush(prijavaStatus);
        int databaseSizeBeforeDelete = prijavaStatusRepository.findAll().size();

        // Get the prijavaStatus
        restPrijavaStatusMockMvc.perform(delete("/api/prijava-statuses/{id}", prijavaStatus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PrijavaStatus> prijavaStatusList = prijavaStatusRepository.findAll();
        assertThat(prijavaStatusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrijavaStatus.class);
        PrijavaStatus prijavaStatus1 = new PrijavaStatus();
        prijavaStatus1.setId(1L);
        PrijavaStatus prijavaStatus2 = new PrijavaStatus();
        prijavaStatus2.setId(prijavaStatus1.getId());
        assertThat(prijavaStatus1).isEqualTo(prijavaStatus2);
        prijavaStatus2.setId(2L);
        assertThat(prijavaStatus1).isNotEqualTo(prijavaStatus2);
        prijavaStatus1.setId(null);
        assertThat(prijavaStatus1).isNotEqualTo(prijavaStatus2);
    }
}
