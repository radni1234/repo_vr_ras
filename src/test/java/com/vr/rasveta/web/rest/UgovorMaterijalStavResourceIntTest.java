package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.UgovorMaterijalStav;
import com.vr.rasveta.repository.UgovorMaterijalStavRepository;
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
 * Test class for the UgovorMaterijalStavResource REST controller.
 *
 * @see UgovorMaterijalStavResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class UgovorMaterijalStavResourceIntTest {

    private static final String DEFAULT_NAZIV = "AAAAAAAAAA";
    private static final String UPDATED_NAZIV = "BBBBBBBBBB";

    private static final Double DEFAULT_CENA = 1D;
    private static final Double UPDATED_CENA = 2D;

    @Autowired
    private UgovorMaterijalStavRepository ugovorMaterijalStavRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUgovorMaterijalStavMockMvc;

    private UgovorMaterijalStav ugovorMaterijalStav;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UgovorMaterijalStavResource ugovorMaterijalStavResource = new UgovorMaterijalStavResource(ugovorMaterijalStavRepository);
        this.restUgovorMaterijalStavMockMvc = MockMvcBuilders.standaloneSetup(ugovorMaterijalStavResource)
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
    public static UgovorMaterijalStav createEntity(EntityManager em) {
        UgovorMaterijalStav ugovorMaterijalStav = new UgovorMaterijalStav()
            .naziv(DEFAULT_NAZIV)
            .cena(DEFAULT_CENA);
        return ugovorMaterijalStav;
    }

    @Before
    public void initTest() {
        ugovorMaterijalStav = createEntity(em);
    }

    @Test
    @Transactional
    public void createUgovorMaterijalStav() throws Exception {
        int databaseSizeBeforeCreate = ugovorMaterijalStavRepository.findAll().size();

        // Create the UgovorMaterijalStav
        restUgovorMaterijalStavMockMvc.perform(post("/api/ugovor-materijal-stavs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ugovorMaterijalStav)))
            .andExpect(status().isCreated());

        // Validate the UgovorMaterijalStav in the database
        List<UgovorMaterijalStav> ugovorMaterijalStavList = ugovorMaterijalStavRepository.findAll();
        assertThat(ugovorMaterijalStavList).hasSize(databaseSizeBeforeCreate + 1);
        UgovorMaterijalStav testUgovorMaterijalStav = ugovorMaterijalStavList.get(ugovorMaterijalStavList.size() - 1);
        assertThat(testUgovorMaterijalStav.getNaziv()).isEqualTo(DEFAULT_NAZIV);
        assertThat(testUgovorMaterijalStav.getCena()).isEqualTo(DEFAULT_CENA);
    }

    @Test
    @Transactional
    public void createUgovorMaterijalStavWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ugovorMaterijalStavRepository.findAll().size();

        // Create the UgovorMaterijalStav with an existing ID
        ugovorMaterijalStav.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUgovorMaterijalStavMockMvc.perform(post("/api/ugovor-materijal-stavs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ugovorMaterijalStav)))
            .andExpect(status().isBadRequest());

        // Validate the UgovorMaterijalStav in the database
        List<UgovorMaterijalStav> ugovorMaterijalStavList = ugovorMaterijalStavRepository.findAll();
        assertThat(ugovorMaterijalStavList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUgovorMaterijalStavs() throws Exception {
        // Initialize the database
        ugovorMaterijalStavRepository.saveAndFlush(ugovorMaterijalStav);

        // Get all the ugovorMaterijalStavList
        restUgovorMaterijalStavMockMvc.perform(get("/api/ugovor-materijal-stavs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ugovorMaterijalStav.getId().intValue())))
            .andExpect(jsonPath("$.[*].naziv").value(hasItem(DEFAULT_NAZIV.toString())))
            .andExpect(jsonPath("$.[*].cena").value(hasItem(DEFAULT_CENA.doubleValue())));
    }

    @Test
    @Transactional
    public void getUgovorMaterijalStav() throws Exception {
        // Initialize the database
        ugovorMaterijalStavRepository.saveAndFlush(ugovorMaterijalStav);

        // Get the ugovorMaterijalStav
        restUgovorMaterijalStavMockMvc.perform(get("/api/ugovor-materijal-stavs/{id}", ugovorMaterijalStav.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ugovorMaterijalStav.getId().intValue()))
            .andExpect(jsonPath("$.naziv").value(DEFAULT_NAZIV.toString()))
            .andExpect(jsonPath("$.cena").value(DEFAULT_CENA.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUgovorMaterijalStav() throws Exception {
        // Get the ugovorMaterijalStav
        restUgovorMaterijalStavMockMvc.perform(get("/api/ugovor-materijal-stavs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUgovorMaterijalStav() throws Exception {
        // Initialize the database
        ugovorMaterijalStavRepository.saveAndFlush(ugovorMaterijalStav);
        int databaseSizeBeforeUpdate = ugovorMaterijalStavRepository.findAll().size();

        // Update the ugovorMaterijalStav
        UgovorMaterijalStav updatedUgovorMaterijalStav = ugovorMaterijalStavRepository.findOne(ugovorMaterijalStav.getId());
        // Disconnect from session so that the updates on updatedUgovorMaterijalStav are not directly saved in db
        em.detach(updatedUgovorMaterijalStav);
        updatedUgovorMaterijalStav
            .naziv(UPDATED_NAZIV)
            .cena(UPDATED_CENA);

        restUgovorMaterijalStavMockMvc.perform(put("/api/ugovor-materijal-stavs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUgovorMaterijalStav)))
            .andExpect(status().isOk());

        // Validate the UgovorMaterijalStav in the database
        List<UgovorMaterijalStav> ugovorMaterijalStavList = ugovorMaterijalStavRepository.findAll();
        assertThat(ugovorMaterijalStavList).hasSize(databaseSizeBeforeUpdate);
        UgovorMaterijalStav testUgovorMaterijalStav = ugovorMaterijalStavList.get(ugovorMaterijalStavList.size() - 1);
        assertThat(testUgovorMaterijalStav.getNaziv()).isEqualTo(UPDATED_NAZIV);
        assertThat(testUgovorMaterijalStav.getCena()).isEqualTo(UPDATED_CENA);
    }

    @Test
    @Transactional
    public void updateNonExistingUgovorMaterijalStav() throws Exception {
        int databaseSizeBeforeUpdate = ugovorMaterijalStavRepository.findAll().size();

        // Create the UgovorMaterijalStav

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUgovorMaterijalStavMockMvc.perform(put("/api/ugovor-materijal-stavs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ugovorMaterijalStav)))
            .andExpect(status().isCreated());

        // Validate the UgovorMaterijalStav in the database
        List<UgovorMaterijalStav> ugovorMaterijalStavList = ugovorMaterijalStavRepository.findAll();
        assertThat(ugovorMaterijalStavList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUgovorMaterijalStav() throws Exception {
        // Initialize the database
        ugovorMaterijalStavRepository.saveAndFlush(ugovorMaterijalStav);
        int databaseSizeBeforeDelete = ugovorMaterijalStavRepository.findAll().size();

        // Get the ugovorMaterijalStav
        restUgovorMaterijalStavMockMvc.perform(delete("/api/ugovor-materijal-stavs/{id}", ugovorMaterijalStav.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UgovorMaterijalStav> ugovorMaterijalStavList = ugovorMaterijalStavRepository.findAll();
        assertThat(ugovorMaterijalStavList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UgovorMaterijalStav.class);
        UgovorMaterijalStav ugovorMaterijalStav1 = new UgovorMaterijalStav();
        ugovorMaterijalStav1.setId(1L);
        UgovorMaterijalStav ugovorMaterijalStav2 = new UgovorMaterijalStav();
        ugovorMaterijalStav2.setId(ugovorMaterijalStav1.getId());
        assertThat(ugovorMaterijalStav1).isEqualTo(ugovorMaterijalStav2);
        ugovorMaterijalStav2.setId(2L);
        assertThat(ugovorMaterijalStav1).isNotEqualTo(ugovorMaterijalStav2);
        ugovorMaterijalStav1.setId(null);
        assertThat(ugovorMaterijalStav1).isNotEqualTo(ugovorMaterijalStav2);
    }
}
