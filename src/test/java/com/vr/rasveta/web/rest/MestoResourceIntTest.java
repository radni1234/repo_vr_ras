package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.Mesto;
import com.vr.rasveta.repository.MestoRepository;
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
 * Test class for the MestoResource REST controller.
 *
 * @see MestoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class MestoResourceIntTest {

    private static final String DEFAULT_NAZIV = "AAAAAAAAAA";
    private static final String UPDATED_NAZIV = "BBBBBBBBBB";

    @Autowired
    private MestoRepository mestoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMestoMockMvc;

    private Mesto mesto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MestoResource mestoResource = new MestoResource(mestoRepository);
        this.restMestoMockMvc = MockMvcBuilders.standaloneSetup(mestoResource)
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
    public static Mesto createEntity(EntityManager em) {
        Mesto mesto = new Mesto()
            .naziv(DEFAULT_NAZIV);
        return mesto;
    }

    @Before
    public void initTest() {
        mesto = createEntity(em);
    }

    @Test
    @Transactional
    public void createMesto() throws Exception {
        int databaseSizeBeforeCreate = mestoRepository.findAll().size();

        // Create the Mesto
        restMestoMockMvc.perform(post("/api/mestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mesto)))
            .andExpect(status().isCreated());

        // Validate the Mesto in the database
        List<Mesto> mestoList = mestoRepository.findAll();
        assertThat(mestoList).hasSize(databaseSizeBeforeCreate + 1);
        Mesto testMesto = mestoList.get(mestoList.size() - 1);
        assertThat(testMesto.getNaziv()).isEqualTo(DEFAULT_NAZIV);
    }

    @Test
    @Transactional
    public void createMestoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mestoRepository.findAll().size();

        // Create the Mesto with an existing ID
        mesto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMestoMockMvc.perform(post("/api/mestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mesto)))
            .andExpect(status().isBadRequest());

        // Validate the Mesto in the database
        List<Mesto> mestoList = mestoRepository.findAll();
        assertThat(mestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMestos() throws Exception {
        // Initialize the database
        mestoRepository.saveAndFlush(mesto);

        // Get all the mestoList
        restMestoMockMvc.perform(get("/api/mestos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].naziv").value(hasItem(DEFAULT_NAZIV.toString())));
    }

    @Test
    @Transactional
    public void getMesto() throws Exception {
        // Initialize the database
        mestoRepository.saveAndFlush(mesto);

        // Get the mesto
        restMestoMockMvc.perform(get("/api/mestos/{id}", mesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mesto.getId().intValue()))
            .andExpect(jsonPath("$.naziv").value(DEFAULT_NAZIV.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMesto() throws Exception {
        // Get the mesto
        restMestoMockMvc.perform(get("/api/mestos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMesto() throws Exception {
        // Initialize the database
        mestoRepository.saveAndFlush(mesto);
        int databaseSizeBeforeUpdate = mestoRepository.findAll().size();

        // Update the mesto
        Mesto updatedMesto = mestoRepository.findOne(mesto.getId());
        // Disconnect from session so that the updates on updatedMesto are not directly saved in db
        em.detach(updatedMesto);
        updatedMesto
            .naziv(UPDATED_NAZIV);

        restMestoMockMvc.perform(put("/api/mestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMesto)))
            .andExpect(status().isOk());

        // Validate the Mesto in the database
        List<Mesto> mestoList = mestoRepository.findAll();
        assertThat(mestoList).hasSize(databaseSizeBeforeUpdate);
        Mesto testMesto = mestoList.get(mestoList.size() - 1);
        assertThat(testMesto.getNaziv()).isEqualTo(UPDATED_NAZIV);
    }

    @Test
    @Transactional
    public void updateNonExistingMesto() throws Exception {
        int databaseSizeBeforeUpdate = mestoRepository.findAll().size();

        // Create the Mesto

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMestoMockMvc.perform(put("/api/mestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mesto)))
            .andExpect(status().isCreated());

        // Validate the Mesto in the database
        List<Mesto> mestoList = mestoRepository.findAll();
        assertThat(mestoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMesto() throws Exception {
        // Initialize the database
        mestoRepository.saveAndFlush(mesto);
        int databaseSizeBeforeDelete = mestoRepository.findAll().size();

        // Get the mesto
        restMestoMockMvc.perform(delete("/api/mestos/{id}", mesto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mesto> mestoList = mestoRepository.findAll();
        assertThat(mestoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mesto.class);
        Mesto mesto1 = new Mesto();
        mesto1.setId(1L);
        Mesto mesto2 = new Mesto();
        mesto2.setId(mesto1.getId());
        assertThat(mesto1).isEqualTo(mesto2);
        mesto2.setId(2L);
        assertThat(mesto1).isNotEqualTo(mesto2);
        mesto1.setId(null);
        assertThat(mesto1).isNotEqualTo(mesto2);
    }
}
