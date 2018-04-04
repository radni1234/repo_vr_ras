package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.JedMere;
import com.vr.rasveta.repository.JedMereRepository;
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
 * Test class for the JedMereResource REST controller.
 *
 * @see JedMereResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class JedMereResourceIntTest {

    private static final String DEFAULT_NAZIV = "AAAAAAAAAA";
    private static final String UPDATED_NAZIV = "BBBBBBBBBB";

    @Autowired
    private JedMereRepository jedMereRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJedMereMockMvc;

    private JedMere jedMere;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JedMereResource jedMereResource = new JedMereResource(jedMereRepository);
        this.restJedMereMockMvc = MockMvcBuilders.standaloneSetup(jedMereResource)
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
    public static JedMere createEntity(EntityManager em) {
        JedMere jedMere = new JedMere()
            .naziv(DEFAULT_NAZIV);
        return jedMere;
    }

    @Before
    public void initTest() {
        jedMere = createEntity(em);
    }

    @Test
    @Transactional
    public void createJedMere() throws Exception {
        int databaseSizeBeforeCreate = jedMereRepository.findAll().size();

        // Create the JedMere
        restJedMereMockMvc.perform(post("/api/jed-meres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jedMere)))
            .andExpect(status().isCreated());

        // Validate the JedMere in the database
        List<JedMere> jedMereList = jedMereRepository.findAll();
        assertThat(jedMereList).hasSize(databaseSizeBeforeCreate + 1);
        JedMere testJedMere = jedMereList.get(jedMereList.size() - 1);
        assertThat(testJedMere.getNaziv()).isEqualTo(DEFAULT_NAZIV);
    }

    @Test
    @Transactional
    public void createJedMereWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jedMereRepository.findAll().size();

        // Create the JedMere with an existing ID
        jedMere.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJedMereMockMvc.perform(post("/api/jed-meres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jedMere)))
            .andExpect(status().isBadRequest());

        // Validate the JedMere in the database
        List<JedMere> jedMereList = jedMereRepository.findAll();
        assertThat(jedMereList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJedMeres() throws Exception {
        // Initialize the database
        jedMereRepository.saveAndFlush(jedMere);

        // Get all the jedMereList
        restJedMereMockMvc.perform(get("/api/jed-meres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jedMere.getId().intValue())))
            .andExpect(jsonPath("$.[*].naziv").value(hasItem(DEFAULT_NAZIV.toString())));
    }

    @Test
    @Transactional
    public void getJedMere() throws Exception {
        // Initialize the database
        jedMereRepository.saveAndFlush(jedMere);

        // Get the jedMere
        restJedMereMockMvc.perform(get("/api/jed-meres/{id}", jedMere.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jedMere.getId().intValue()))
            .andExpect(jsonPath("$.naziv").value(DEFAULT_NAZIV.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingJedMere() throws Exception {
        // Get the jedMere
        restJedMereMockMvc.perform(get("/api/jed-meres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJedMere() throws Exception {
        // Initialize the database
        jedMereRepository.saveAndFlush(jedMere);
        int databaseSizeBeforeUpdate = jedMereRepository.findAll().size();

        // Update the jedMere
        JedMere updatedJedMere = jedMereRepository.findOne(jedMere.getId());
        // Disconnect from session so that the updates on updatedJedMere are not directly saved in db
        em.detach(updatedJedMere);
        updatedJedMere
            .naziv(UPDATED_NAZIV);

        restJedMereMockMvc.perform(put("/api/jed-meres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJedMere)))
            .andExpect(status().isOk());

        // Validate the JedMere in the database
        List<JedMere> jedMereList = jedMereRepository.findAll();
        assertThat(jedMereList).hasSize(databaseSizeBeforeUpdate);
        JedMere testJedMere = jedMereList.get(jedMereList.size() - 1);
        assertThat(testJedMere.getNaziv()).isEqualTo(UPDATED_NAZIV);
    }

    @Test
    @Transactional
    public void updateNonExistingJedMere() throws Exception {
        int databaseSizeBeforeUpdate = jedMereRepository.findAll().size();

        // Create the JedMere

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restJedMereMockMvc.perform(put("/api/jed-meres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jedMere)))
            .andExpect(status().isCreated());

        // Validate the JedMere in the database
        List<JedMere> jedMereList = jedMereRepository.findAll();
        assertThat(jedMereList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteJedMere() throws Exception {
        // Initialize the database
        jedMereRepository.saveAndFlush(jedMere);
        int databaseSizeBeforeDelete = jedMereRepository.findAll().size();

        // Get the jedMere
        restJedMereMockMvc.perform(delete("/api/jed-meres/{id}", jedMere.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JedMere> jedMereList = jedMereRepository.findAll();
        assertThat(jedMereList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JedMere.class);
        JedMere jedMere1 = new JedMere();
        jedMere1.setId(1L);
        JedMere jedMere2 = new JedMere();
        jedMere2.setId(jedMere1.getId());
        assertThat(jedMere1).isEqualTo(jedMere2);
        jedMere2.setId(2L);
        assertThat(jedMere1).isNotEqualTo(jedMere2);
        jedMere1.setId(null);
        assertThat(jedMere1).isNotEqualTo(jedMere2);
    }
}
