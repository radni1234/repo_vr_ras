package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.MaterijalTip;
import com.vr.rasveta.repository.MaterijalTipRepository;
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
 * Test class for the MaterijalTipResource REST controller.
 *
 * @see MaterijalTipResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class MaterijalTipResourceIntTest {

    private static final String DEFAULT_NAZIV = "AAAAAAAAAA";
    private static final String UPDATED_NAZIV = "BBBBBBBBBB";

    @Autowired
    private MaterijalTipRepository materijalTipRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMaterijalTipMockMvc;

    private MaterijalTip materijalTip;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MaterijalTipResource materijalTipResource = new MaterijalTipResource(materijalTipRepository);
        this.restMaterijalTipMockMvc = MockMvcBuilders.standaloneSetup(materijalTipResource)
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
    public static MaterijalTip createEntity(EntityManager em) {
        MaterijalTip materijalTip = new MaterijalTip()
            .naziv(DEFAULT_NAZIV);
        return materijalTip;
    }

    @Before
    public void initTest() {
        materijalTip = createEntity(em);
    }

    @Test
    @Transactional
    public void createMaterijalTip() throws Exception {
        int databaseSizeBeforeCreate = materijalTipRepository.findAll().size();

        // Create the MaterijalTip
        restMaterijalTipMockMvc.perform(post("/api/materijal-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materijalTip)))
            .andExpect(status().isCreated());

        // Validate the MaterijalTip in the database
        List<MaterijalTip> materijalTipList = materijalTipRepository.findAll();
        assertThat(materijalTipList).hasSize(databaseSizeBeforeCreate + 1);
        MaterijalTip testMaterijalTip = materijalTipList.get(materijalTipList.size() - 1);
        assertThat(testMaterijalTip.getNaziv()).isEqualTo(DEFAULT_NAZIV);
    }

    @Test
    @Transactional
    public void createMaterijalTipWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = materijalTipRepository.findAll().size();

        // Create the MaterijalTip with an existing ID
        materijalTip.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaterijalTipMockMvc.perform(post("/api/materijal-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materijalTip)))
            .andExpect(status().isBadRequest());

        // Validate the MaterijalTip in the database
        List<MaterijalTip> materijalTipList = materijalTipRepository.findAll();
        assertThat(materijalTipList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMaterijalTips() throws Exception {
        // Initialize the database
        materijalTipRepository.saveAndFlush(materijalTip);

        // Get all the materijalTipList
        restMaterijalTipMockMvc.perform(get("/api/materijal-tips?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(materijalTip.getId().intValue())))
            .andExpect(jsonPath("$.[*].naziv").value(hasItem(DEFAULT_NAZIV.toString())));
    }

    @Test
    @Transactional
    public void getMaterijalTip() throws Exception {
        // Initialize the database
        materijalTipRepository.saveAndFlush(materijalTip);

        // Get the materijalTip
        restMaterijalTipMockMvc.perform(get("/api/materijal-tips/{id}", materijalTip.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(materijalTip.getId().intValue()))
            .andExpect(jsonPath("$.naziv").value(DEFAULT_NAZIV.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMaterijalTip() throws Exception {
        // Get the materijalTip
        restMaterijalTipMockMvc.perform(get("/api/materijal-tips/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMaterijalTip() throws Exception {
        // Initialize the database
        materijalTipRepository.saveAndFlush(materijalTip);
        int databaseSizeBeforeUpdate = materijalTipRepository.findAll().size();

        // Update the materijalTip
        MaterijalTip updatedMaterijalTip = materijalTipRepository.findOne(materijalTip.getId());
        // Disconnect from session so that the updates on updatedMaterijalTip are not directly saved in db
        em.detach(updatedMaterijalTip);
        updatedMaterijalTip
            .naziv(UPDATED_NAZIV);

        restMaterijalTipMockMvc.perform(put("/api/materijal-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMaterijalTip)))
            .andExpect(status().isOk());

        // Validate the MaterijalTip in the database
        List<MaterijalTip> materijalTipList = materijalTipRepository.findAll();
        assertThat(materijalTipList).hasSize(databaseSizeBeforeUpdate);
        MaterijalTip testMaterijalTip = materijalTipList.get(materijalTipList.size() - 1);
        assertThat(testMaterijalTip.getNaziv()).isEqualTo(UPDATED_NAZIV);
    }

    @Test
    @Transactional
    public void updateNonExistingMaterijalTip() throws Exception {
        int databaseSizeBeforeUpdate = materijalTipRepository.findAll().size();

        // Create the MaterijalTip

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMaterijalTipMockMvc.perform(put("/api/materijal-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materijalTip)))
            .andExpect(status().isCreated());

        // Validate the MaterijalTip in the database
        List<MaterijalTip> materijalTipList = materijalTipRepository.findAll();
        assertThat(materijalTipList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMaterijalTip() throws Exception {
        // Initialize the database
        materijalTipRepository.saveAndFlush(materijalTip);
        int databaseSizeBeforeDelete = materijalTipRepository.findAll().size();

        // Get the materijalTip
        restMaterijalTipMockMvc.perform(delete("/api/materijal-tips/{id}", materijalTip.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MaterijalTip> materijalTipList = materijalTipRepository.findAll();
        assertThat(materijalTipList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MaterijalTip.class);
        MaterijalTip materijalTip1 = new MaterijalTip();
        materijalTip1.setId(1L);
        MaterijalTip materijalTip2 = new MaterijalTip();
        materijalTip2.setId(materijalTip1.getId());
        assertThat(materijalTip1).isEqualTo(materijalTip2);
        materijalTip2.setId(2L);
        assertThat(materijalTip1).isNotEqualTo(materijalTip2);
        materijalTip1.setId(null);
        assertThat(materijalTip1).isNotEqualTo(materijalTip2);
    }
}
