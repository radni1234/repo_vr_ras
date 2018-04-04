package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.IntervencijaTip;
import com.vr.rasveta.repository.IntervencijaTipRepository;
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
 * Test class for the IntervencijaTipResource REST controller.
 *
 * @see IntervencijaTipResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class IntervencijaTipResourceIntTest {

    private static final String DEFAULT_NAZIV = "AAAAAAAAAA";
    private static final String UPDATED_NAZIV = "BBBBBBBBBB";

    @Autowired
    private IntervencijaTipRepository intervencijaTipRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIntervencijaTipMockMvc;

    private IntervencijaTip intervencijaTip;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IntervencijaTipResource intervencijaTipResource = new IntervencijaTipResource(intervencijaTipRepository);
        this.restIntervencijaTipMockMvc = MockMvcBuilders.standaloneSetup(intervencijaTipResource)
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
    public static IntervencijaTip createEntity(EntityManager em) {
        IntervencijaTip intervencijaTip = new IntervencijaTip()
            .naziv(DEFAULT_NAZIV);
        return intervencijaTip;
    }

    @Before
    public void initTest() {
        intervencijaTip = createEntity(em);
    }

    @Test
    @Transactional
    public void createIntervencijaTip() throws Exception {
        int databaseSizeBeforeCreate = intervencijaTipRepository.findAll().size();

        // Create the IntervencijaTip
        restIntervencijaTipMockMvc.perform(post("/api/intervencija-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intervencijaTip)))
            .andExpect(status().isCreated());

        // Validate the IntervencijaTip in the database
        List<IntervencijaTip> intervencijaTipList = intervencijaTipRepository.findAll();
        assertThat(intervencijaTipList).hasSize(databaseSizeBeforeCreate + 1);
        IntervencijaTip testIntervencijaTip = intervencijaTipList.get(intervencijaTipList.size() - 1);
        assertThat(testIntervencijaTip.getNaziv()).isEqualTo(DEFAULT_NAZIV);
    }

    @Test
    @Transactional
    public void createIntervencijaTipWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = intervencijaTipRepository.findAll().size();

        // Create the IntervencijaTip with an existing ID
        intervencijaTip.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIntervencijaTipMockMvc.perform(post("/api/intervencija-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intervencijaTip)))
            .andExpect(status().isBadRequest());

        // Validate the IntervencijaTip in the database
        List<IntervencijaTip> intervencijaTipList = intervencijaTipRepository.findAll();
        assertThat(intervencijaTipList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIntervencijaTips() throws Exception {
        // Initialize the database
        intervencijaTipRepository.saveAndFlush(intervencijaTip);

        // Get all the intervencijaTipList
        restIntervencijaTipMockMvc.perform(get("/api/intervencija-tips?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(intervencijaTip.getId().intValue())))
            .andExpect(jsonPath("$.[*].naziv").value(hasItem(DEFAULT_NAZIV.toString())));
    }

    @Test
    @Transactional
    public void getIntervencijaTip() throws Exception {
        // Initialize the database
        intervencijaTipRepository.saveAndFlush(intervencijaTip);

        // Get the intervencijaTip
        restIntervencijaTipMockMvc.perform(get("/api/intervencija-tips/{id}", intervencijaTip.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(intervencijaTip.getId().intValue()))
            .andExpect(jsonPath("$.naziv").value(DEFAULT_NAZIV.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIntervencijaTip() throws Exception {
        // Get the intervencijaTip
        restIntervencijaTipMockMvc.perform(get("/api/intervencija-tips/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIntervencijaTip() throws Exception {
        // Initialize the database
        intervencijaTipRepository.saveAndFlush(intervencijaTip);
        int databaseSizeBeforeUpdate = intervencijaTipRepository.findAll().size();

        // Update the intervencijaTip
        IntervencijaTip updatedIntervencijaTip = intervencijaTipRepository.findOne(intervencijaTip.getId());
        // Disconnect from session so that the updates on updatedIntervencijaTip are not directly saved in db
        em.detach(updatedIntervencijaTip);
        updatedIntervencijaTip
            .naziv(UPDATED_NAZIV);

        restIntervencijaTipMockMvc.perform(put("/api/intervencija-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIntervencijaTip)))
            .andExpect(status().isOk());

        // Validate the IntervencijaTip in the database
        List<IntervencijaTip> intervencijaTipList = intervencijaTipRepository.findAll();
        assertThat(intervencijaTipList).hasSize(databaseSizeBeforeUpdate);
        IntervencijaTip testIntervencijaTip = intervencijaTipList.get(intervencijaTipList.size() - 1);
        assertThat(testIntervencijaTip.getNaziv()).isEqualTo(UPDATED_NAZIV);
    }

    @Test
    @Transactional
    public void updateNonExistingIntervencijaTip() throws Exception {
        int databaseSizeBeforeUpdate = intervencijaTipRepository.findAll().size();

        // Create the IntervencijaTip

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIntervencijaTipMockMvc.perform(put("/api/intervencija-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intervencijaTip)))
            .andExpect(status().isCreated());

        // Validate the IntervencijaTip in the database
        List<IntervencijaTip> intervencijaTipList = intervencijaTipRepository.findAll();
        assertThat(intervencijaTipList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIntervencijaTip() throws Exception {
        // Initialize the database
        intervencijaTipRepository.saveAndFlush(intervencijaTip);
        int databaseSizeBeforeDelete = intervencijaTipRepository.findAll().size();

        // Get the intervencijaTip
        restIntervencijaTipMockMvc.perform(delete("/api/intervencija-tips/{id}", intervencijaTip.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IntervencijaTip> intervencijaTipList = intervencijaTipRepository.findAll();
        assertThat(intervencijaTipList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IntervencijaTip.class);
        IntervencijaTip intervencijaTip1 = new IntervencijaTip();
        intervencijaTip1.setId(1L);
        IntervencijaTip intervencijaTip2 = new IntervencijaTip();
        intervencijaTip2.setId(intervencijaTip1.getId());
        assertThat(intervencijaTip1).isEqualTo(intervencijaTip2);
        intervencijaTip2.setId(2L);
        assertThat(intervencijaTip1).isNotEqualTo(intervencijaTip2);
        intervencijaTip1.setId(null);
        assertThat(intervencijaTip1).isNotEqualTo(intervencijaTip2);
    }
}
