package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.SvetiljkaTip;
import com.vr.rasveta.repository.SvetiljkaTipRepository;
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
import java.util.List;

import static com.vr.rasveta.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SvetiljkaTipResource REST controller.
 *
 * @see SvetiljkaTipResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class SvetiljkaTipResourceIntTest {

    private static final String DEFAULT_NAZIV = "AAAAAAAAAA";
    private static final String UPDATED_NAZIV = "BBBBBBBBBB";

    private static final String DEFAULT_IZVOR = "AAAAAAAAAA";
    private static final String UPDATED_IZVOR = "BBBBBBBBBB";

    private static final Double DEFAULT_SNAGA = 1D;
    private static final Double UPDATED_SNAGA = 2D;

    @Autowired
    private SvetiljkaTipRepository svetiljkaTipRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSvetiljkaTipMockMvc;

    private SvetiljkaTip svetiljkaTip;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SvetiljkaTipResource svetiljkaTipResource = new SvetiljkaTipResource(svetiljkaTipRepository);
        this.restSvetiljkaTipMockMvc = MockMvcBuilders.standaloneSetup(svetiljkaTipResource)
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
    public static SvetiljkaTip createEntity(EntityManager em) {
        SvetiljkaTip svetiljkaTip = new SvetiljkaTip()
            .naziv(DEFAULT_NAZIV)
            .izvor(DEFAULT_IZVOR)
            .snaga(DEFAULT_SNAGA);
        return svetiljkaTip;
    }

    @Before
    public void initTest() {
        svetiljkaTip = createEntity(em);
    }

    @Test
    @Transactional
    public void createSvetiljkaTip() throws Exception {
        int databaseSizeBeforeCreate = svetiljkaTipRepository.findAll().size();

        // Create the SvetiljkaTip
        restSvetiljkaTipMockMvc.perform(post("/api/svetiljka-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(svetiljkaTip)))
            .andExpect(status().isCreated());

        // Validate the SvetiljkaTip in the database
        List<SvetiljkaTip> svetiljkaTipList = svetiljkaTipRepository.findAll();
        assertThat(svetiljkaTipList).hasSize(databaseSizeBeforeCreate + 1);
        SvetiljkaTip testSvetiljkaTip = svetiljkaTipList.get(svetiljkaTipList.size() - 1);
        assertThat(testSvetiljkaTip.getNaziv()).isEqualTo(DEFAULT_NAZIV);
        assertThat(testSvetiljkaTip.getIzvor()).isEqualTo(DEFAULT_IZVOR);
        assertThat(testSvetiljkaTip.getSnaga()).isEqualTo(DEFAULT_SNAGA);
    }

    @Test
    @Transactional
    public void createSvetiljkaTipWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = svetiljkaTipRepository.findAll().size();

        // Create the SvetiljkaTip with an existing ID
        svetiljkaTip.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSvetiljkaTipMockMvc.perform(post("/api/svetiljka-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(svetiljkaTip)))
            .andExpect(status().isBadRequest());

        // Validate the SvetiljkaTip in the database
        List<SvetiljkaTip> svetiljkaTipList = svetiljkaTipRepository.findAll();
        assertThat(svetiljkaTipList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSvetiljkaTips() throws Exception {
        // Initialize the database
        svetiljkaTipRepository.saveAndFlush(svetiljkaTip);

        // Get all the svetiljkaTipList
        restSvetiljkaTipMockMvc.perform(get("/api/svetiljka-tips?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(svetiljkaTip.getId().intValue())))
            .andExpect(jsonPath("$.[*].naziv").value(hasItem(DEFAULT_NAZIV.toString())))
            .andExpect(jsonPath("$.[*].izvor").value(hasItem(DEFAULT_IZVOR.toString())))
            .andExpect(jsonPath("$.[*].snaga").value(hasItem(DEFAULT_SNAGA.doubleValue())));
    }

    @Test
    @Transactional
    public void getSvetiljkaTip() throws Exception {
        // Initialize the database
        svetiljkaTipRepository.saveAndFlush(svetiljkaTip);

        // Get the svetiljkaTip
        restSvetiljkaTipMockMvc.perform(get("/api/svetiljka-tips/{id}", svetiljkaTip.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(svetiljkaTip.getId().intValue()))
            .andExpect(jsonPath("$.naziv").value(DEFAULT_NAZIV.toString()))
            .andExpect(jsonPath("$.izvor").value(DEFAULT_IZVOR.toString()))
            .andExpect(jsonPath("$.snaga").value(DEFAULT_SNAGA.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSvetiljkaTip() throws Exception {
        // Get the svetiljkaTip
        restSvetiljkaTipMockMvc.perform(get("/api/svetiljka-tips/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSvetiljkaTip() throws Exception {
        // Initialize the database
        svetiljkaTipRepository.saveAndFlush(svetiljkaTip);
        int databaseSizeBeforeUpdate = svetiljkaTipRepository.findAll().size();

        // Update the svetiljkaTip
        SvetiljkaTip updatedSvetiljkaTip = svetiljkaTipRepository.findOne(svetiljkaTip.getId());
        // Disconnect from session so that the updates on updatedSvetiljkaTip are not directly saved in db
        em.detach(updatedSvetiljkaTip);
        updatedSvetiljkaTip
            .naziv(UPDATED_NAZIV)
            .izvor(UPDATED_IZVOR)
            .snaga(UPDATED_SNAGA);

        restSvetiljkaTipMockMvc.perform(put("/api/svetiljka-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSvetiljkaTip)))
            .andExpect(status().isOk());

        // Validate the SvetiljkaTip in the database
        List<SvetiljkaTip> svetiljkaTipList = svetiljkaTipRepository.findAll();
        assertThat(svetiljkaTipList).hasSize(databaseSizeBeforeUpdate);
        SvetiljkaTip testSvetiljkaTip = svetiljkaTipList.get(svetiljkaTipList.size() - 1);
        assertThat(testSvetiljkaTip.getNaziv()).isEqualTo(UPDATED_NAZIV);
        assertThat(testSvetiljkaTip.getIzvor()).isEqualTo(UPDATED_IZVOR);
        assertThat(testSvetiljkaTip.getSnaga()).isEqualTo(UPDATED_SNAGA);
    }

    @Test
    @Transactional
    public void updateNonExistingSvetiljkaTip() throws Exception {
        int databaseSizeBeforeUpdate = svetiljkaTipRepository.findAll().size();

        // Create the SvetiljkaTip

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSvetiljkaTipMockMvc.perform(put("/api/svetiljka-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(svetiljkaTip)))
            .andExpect(status().isCreated());

        // Validate the SvetiljkaTip in the database
        List<SvetiljkaTip> svetiljkaTipList = svetiljkaTipRepository.findAll();
        assertThat(svetiljkaTipList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSvetiljkaTip() throws Exception {
        // Initialize the database
        svetiljkaTipRepository.saveAndFlush(svetiljkaTip);
        int databaseSizeBeforeDelete = svetiljkaTipRepository.findAll().size();

        // Get the svetiljkaTip
        restSvetiljkaTipMockMvc.perform(delete("/api/svetiljka-tips/{id}", svetiljkaTip.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SvetiljkaTip> svetiljkaTipList = svetiljkaTipRepository.findAll();
        assertThat(svetiljkaTipList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SvetiljkaTip.class);
        SvetiljkaTip svetiljkaTip1 = new SvetiljkaTip();
        svetiljkaTip1.setId(1L);
        SvetiljkaTip svetiljkaTip2 = new SvetiljkaTip();
        svetiljkaTip2.setId(svetiljkaTip1.getId());
        assertThat(svetiljkaTip1).isEqualTo(svetiljkaTip2);
        svetiljkaTip2.setId(2L);
        assertThat(svetiljkaTip1).isNotEqualTo(svetiljkaTip2);
        svetiljkaTip1.setId(null);
        assertThat(svetiljkaTip1).isNotEqualTo(svetiljkaTip2);
    }
}
