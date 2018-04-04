package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.Opstina;
import com.vr.rasveta.repository.OpstinaRepository;
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
 * Test class for the OpstinaResource REST controller.
 *
 * @see OpstinaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class OpstinaResourceIntTest {

    private static final String DEFAULT_NAZIV = "AAAAAAAAAA";
    private static final String UPDATED_NAZIV = "BBBBBBBBBB";

    @Autowired
    private OpstinaRepository opstinaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOpstinaMockMvc;

    private Opstina opstina;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OpstinaResource opstinaResource = new OpstinaResource(opstinaRepository);
        this.restOpstinaMockMvc = MockMvcBuilders.standaloneSetup(opstinaResource)
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
    public static Opstina createEntity(EntityManager em) {
        Opstina opstina = new Opstina()
            .naziv(DEFAULT_NAZIV);
        return opstina;
    }

    @Before
    public void initTest() {
        opstina = createEntity(em);
    }

    @Test
    @Transactional
    public void createOpstina() throws Exception {
        int databaseSizeBeforeCreate = opstinaRepository.findAll().size();

        // Create the Opstina
        restOpstinaMockMvc.perform(post("/api/opstinas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(opstina)))
            .andExpect(status().isCreated());

        // Validate the Opstina in the database
        List<Opstina> opstinaList = opstinaRepository.findAll();
        assertThat(opstinaList).hasSize(databaseSizeBeforeCreate + 1);
        Opstina testOpstina = opstinaList.get(opstinaList.size() - 1);
        assertThat(testOpstina.getNaziv()).isEqualTo(DEFAULT_NAZIV);
    }

    @Test
    @Transactional
    public void createOpstinaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = opstinaRepository.findAll().size();

        // Create the Opstina with an existing ID
        opstina.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOpstinaMockMvc.perform(post("/api/opstinas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(opstina)))
            .andExpect(status().isBadRequest());

        // Validate the Opstina in the database
        List<Opstina> opstinaList = opstinaRepository.findAll();
        assertThat(opstinaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOpstinas() throws Exception {
        // Initialize the database
        opstinaRepository.saveAndFlush(opstina);

        // Get all the opstinaList
        restOpstinaMockMvc.perform(get("/api/opstinas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(opstina.getId().intValue())))
            .andExpect(jsonPath("$.[*].naziv").value(hasItem(DEFAULT_NAZIV.toString())));
    }

    @Test
    @Transactional
    public void getOpstina() throws Exception {
        // Initialize the database
        opstinaRepository.saveAndFlush(opstina);

        // Get the opstina
        restOpstinaMockMvc.perform(get("/api/opstinas/{id}", opstina.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(opstina.getId().intValue()))
            .andExpect(jsonPath("$.naziv").value(DEFAULT_NAZIV.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOpstina() throws Exception {
        // Get the opstina
        restOpstinaMockMvc.perform(get("/api/opstinas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOpstina() throws Exception {
        // Initialize the database
        opstinaRepository.saveAndFlush(opstina);
        int databaseSizeBeforeUpdate = opstinaRepository.findAll().size();

        // Update the opstina
        Opstina updatedOpstina = opstinaRepository.findOne(opstina.getId());
        // Disconnect from session so that the updates on updatedOpstina are not directly saved in db
        em.detach(updatedOpstina);
        updatedOpstina
            .naziv(UPDATED_NAZIV);

        restOpstinaMockMvc.perform(put("/api/opstinas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOpstina)))
            .andExpect(status().isOk());

        // Validate the Opstina in the database
        List<Opstina> opstinaList = opstinaRepository.findAll();
        assertThat(opstinaList).hasSize(databaseSizeBeforeUpdate);
        Opstina testOpstina = opstinaList.get(opstinaList.size() - 1);
        assertThat(testOpstina.getNaziv()).isEqualTo(UPDATED_NAZIV);
    }

    @Test
    @Transactional
    public void updateNonExistingOpstina() throws Exception {
        int databaseSizeBeforeUpdate = opstinaRepository.findAll().size();

        // Create the Opstina

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOpstinaMockMvc.perform(put("/api/opstinas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(opstina)))
            .andExpect(status().isCreated());

        // Validate the Opstina in the database
        List<Opstina> opstinaList = opstinaRepository.findAll();
        assertThat(opstinaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOpstina() throws Exception {
        // Initialize the database
        opstinaRepository.saveAndFlush(opstina);
        int databaseSizeBeforeDelete = opstinaRepository.findAll().size();

        // Get the opstina
        restOpstinaMockMvc.perform(delete("/api/opstinas/{id}", opstina.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Opstina> opstinaList = opstinaRepository.findAll();
        assertThat(opstinaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Opstina.class);
        Opstina opstina1 = new Opstina();
        opstina1.setId(1L);
        Opstina opstina2 = new Opstina();
        opstina2.setId(opstina1.getId());
        assertThat(opstina1).isEqualTo(opstina2);
        opstina2.setId(2L);
        assertThat(opstina1).isNotEqualTo(opstina2);
        opstina1.setId(null);
        assertThat(opstina1).isNotEqualTo(opstina2);
    }
}
