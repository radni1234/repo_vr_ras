package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.Svetiljka;
import com.vr.rasveta.repository.SvetiljkaRepository;
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
 * Test class for the SvetiljkaResource REST controller.
 *
 * @see SvetiljkaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class SvetiljkaResourceIntTest {

    private static final Integer DEFAULT_KOM = 1;
    private static final Integer UPDATED_KOM = 2;

    @Autowired
    private SvetiljkaRepository svetiljkaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSvetiljkaMockMvc;

    private Svetiljka svetiljka;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SvetiljkaResource svetiljkaResource = new SvetiljkaResource(svetiljkaRepository);
        this.restSvetiljkaMockMvc = MockMvcBuilders.standaloneSetup(svetiljkaResource)
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
    public static Svetiljka createEntity(EntityManager em) {
        Svetiljka svetiljka = new Svetiljka()
            .kom(DEFAULT_KOM);
        return svetiljka;
    }

    @Before
    public void initTest() {
        svetiljka = createEntity(em);
    }

    @Test
    @Transactional
    public void createSvetiljka() throws Exception {
        int databaseSizeBeforeCreate = svetiljkaRepository.findAll().size();

        // Create the Svetiljka
        restSvetiljkaMockMvc.perform(post("/api/svetiljkas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(svetiljka)))
            .andExpect(status().isCreated());

        // Validate the Svetiljka in the database
        List<Svetiljka> svetiljkaList = svetiljkaRepository.findAll();
        assertThat(svetiljkaList).hasSize(databaseSizeBeforeCreate + 1);
        Svetiljka testSvetiljka = svetiljkaList.get(svetiljkaList.size() - 1);
        assertThat(testSvetiljka.getKom()).isEqualTo(DEFAULT_KOM);
    }

    @Test
    @Transactional
    public void createSvetiljkaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = svetiljkaRepository.findAll().size();

        // Create the Svetiljka with an existing ID
        svetiljka.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSvetiljkaMockMvc.perform(post("/api/svetiljkas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(svetiljka)))
            .andExpect(status().isBadRequest());

        // Validate the Svetiljka in the database
        List<Svetiljka> svetiljkaList = svetiljkaRepository.findAll();
        assertThat(svetiljkaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSvetiljkas() throws Exception {
        // Initialize the database
        svetiljkaRepository.saveAndFlush(svetiljka);

        // Get all the svetiljkaList
        restSvetiljkaMockMvc.perform(get("/api/svetiljkas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(svetiljka.getId().intValue())))
            .andExpect(jsonPath("$.[*].kom").value(hasItem(DEFAULT_KOM)));
    }

    @Test
    @Transactional
    public void getSvetiljka() throws Exception {
        // Initialize the database
        svetiljkaRepository.saveAndFlush(svetiljka);

        // Get the svetiljka
        restSvetiljkaMockMvc.perform(get("/api/svetiljkas/{id}", svetiljka.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(svetiljka.getId().intValue()))
            .andExpect(jsonPath("$.kom").value(DEFAULT_KOM));
    }

    @Test
    @Transactional
    public void getNonExistingSvetiljka() throws Exception {
        // Get the svetiljka
        restSvetiljkaMockMvc.perform(get("/api/svetiljkas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSvetiljka() throws Exception {
        // Initialize the database
        svetiljkaRepository.saveAndFlush(svetiljka);
        int databaseSizeBeforeUpdate = svetiljkaRepository.findAll().size();

        // Update the svetiljka
        Svetiljka updatedSvetiljka = svetiljkaRepository.findOne(svetiljka.getId());
        // Disconnect from session so that the updates on updatedSvetiljka are not directly saved in db
        em.detach(updatedSvetiljka);
        updatedSvetiljka
            .kom(UPDATED_KOM);

        restSvetiljkaMockMvc.perform(put("/api/svetiljkas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSvetiljka)))
            .andExpect(status().isOk());

        // Validate the Svetiljka in the database
        List<Svetiljka> svetiljkaList = svetiljkaRepository.findAll();
        assertThat(svetiljkaList).hasSize(databaseSizeBeforeUpdate);
        Svetiljka testSvetiljka = svetiljkaList.get(svetiljkaList.size() - 1);
        assertThat(testSvetiljka.getKom()).isEqualTo(UPDATED_KOM);
    }

    @Test
    @Transactional
    public void updateNonExistingSvetiljka() throws Exception {
        int databaseSizeBeforeUpdate = svetiljkaRepository.findAll().size();

        // Create the Svetiljka

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSvetiljkaMockMvc.perform(put("/api/svetiljkas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(svetiljka)))
            .andExpect(status().isCreated());

        // Validate the Svetiljka in the database
        List<Svetiljka> svetiljkaList = svetiljkaRepository.findAll();
        assertThat(svetiljkaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSvetiljka() throws Exception {
        // Initialize the database
        svetiljkaRepository.saveAndFlush(svetiljka);
        int databaseSizeBeforeDelete = svetiljkaRepository.findAll().size();

        // Get the svetiljka
        restSvetiljkaMockMvc.perform(delete("/api/svetiljkas/{id}", svetiljka.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Svetiljka> svetiljkaList = svetiljkaRepository.findAll();
        assertThat(svetiljkaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Svetiljka.class);
        Svetiljka svetiljka1 = new Svetiljka();
        svetiljka1.setId(1L);
        Svetiljka svetiljka2 = new Svetiljka();
        svetiljka2.setId(svetiljka1.getId());
        assertThat(svetiljka1).isEqualTo(svetiljka2);
        svetiljka2.setId(2L);
        assertThat(svetiljka1).isNotEqualTo(svetiljka2);
        svetiljka1.setId(null);
        assertThat(svetiljka1).isNotEqualTo(svetiljka2);
    }
}
