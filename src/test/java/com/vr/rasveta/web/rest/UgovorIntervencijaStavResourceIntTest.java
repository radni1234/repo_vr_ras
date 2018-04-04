package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.UgovorIntervencijaStav;
import com.vr.rasveta.repository.UgovorIntervencijaStavRepository;
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
 * Test class for the UgovorIntervencijaStavResource REST controller.
 *
 * @see UgovorIntervencijaStavResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class UgovorIntervencijaStavResourceIntTest {

    private static final String DEFAULT_NAZIV = "AAAAAAAAAA";
    private static final String UPDATED_NAZIV = "BBBBBBBBBB";

    private static final Double DEFAULT_CENA = 1D;
    private static final Double UPDATED_CENA = 2D;

    @Autowired
    private UgovorIntervencijaStavRepository ugovorIntervencijaStavRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUgovorIntervencijaStavMockMvc;

    private UgovorIntervencijaStav ugovorIntervencijaStav;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UgovorIntervencijaStavResource ugovorIntervencijaStavResource = new UgovorIntervencijaStavResource(ugovorIntervencijaStavRepository);
        this.restUgovorIntervencijaStavMockMvc = MockMvcBuilders.standaloneSetup(ugovorIntervencijaStavResource)
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
    public static UgovorIntervencijaStav createEntity(EntityManager em) {
        UgovorIntervencijaStav ugovorIntervencijaStav = new UgovorIntervencijaStav()
            .naziv(DEFAULT_NAZIV)
            .cena(DEFAULT_CENA);
        return ugovorIntervencijaStav;
    }

    @Before
    public void initTest() {
        ugovorIntervencijaStav = createEntity(em);
    }

    @Test
    @Transactional
    public void createUgovorIntervencijaStav() throws Exception {
        int databaseSizeBeforeCreate = ugovorIntervencijaStavRepository.findAll().size();

        // Create the UgovorIntervencijaStav
        restUgovorIntervencijaStavMockMvc.perform(post("/api/ugovor-intervencija-stavs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ugovorIntervencijaStav)))
            .andExpect(status().isCreated());

        // Validate the UgovorIntervencijaStav in the database
        List<UgovorIntervencijaStav> ugovorIntervencijaStavList = ugovorIntervencijaStavRepository.findAll();
        assertThat(ugovorIntervencijaStavList).hasSize(databaseSizeBeforeCreate + 1);
        UgovorIntervencijaStav testUgovorIntervencijaStav = ugovorIntervencijaStavList.get(ugovorIntervencijaStavList.size() - 1);
        assertThat(testUgovorIntervencijaStav.getNaziv()).isEqualTo(DEFAULT_NAZIV);
        assertThat(testUgovorIntervencijaStav.getCena()).isEqualTo(DEFAULT_CENA);
    }

    @Test
    @Transactional
    public void createUgovorIntervencijaStavWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ugovorIntervencijaStavRepository.findAll().size();

        // Create the UgovorIntervencijaStav with an existing ID
        ugovorIntervencijaStav.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUgovorIntervencijaStavMockMvc.perform(post("/api/ugovor-intervencija-stavs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ugovorIntervencijaStav)))
            .andExpect(status().isBadRequest());

        // Validate the UgovorIntervencijaStav in the database
        List<UgovorIntervencijaStav> ugovorIntervencijaStavList = ugovorIntervencijaStavRepository.findAll();
        assertThat(ugovorIntervencijaStavList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUgovorIntervencijaStavs() throws Exception {
        // Initialize the database
        ugovorIntervencijaStavRepository.saveAndFlush(ugovorIntervencijaStav);

        // Get all the ugovorIntervencijaStavList
        restUgovorIntervencijaStavMockMvc.perform(get("/api/ugovor-intervencija-stavs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ugovorIntervencijaStav.getId().intValue())))
            .andExpect(jsonPath("$.[*].naziv").value(hasItem(DEFAULT_NAZIV.toString())))
            .andExpect(jsonPath("$.[*].cena").value(hasItem(DEFAULT_CENA.doubleValue())));
    }

    @Test
    @Transactional
    public void getUgovorIntervencijaStav() throws Exception {
        // Initialize the database
        ugovorIntervencijaStavRepository.saveAndFlush(ugovorIntervencijaStav);

        // Get the ugovorIntervencijaStav
        restUgovorIntervencijaStavMockMvc.perform(get("/api/ugovor-intervencija-stavs/{id}", ugovorIntervencijaStav.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ugovorIntervencijaStav.getId().intValue()))
            .andExpect(jsonPath("$.naziv").value(DEFAULT_NAZIV.toString()))
            .andExpect(jsonPath("$.cena").value(DEFAULT_CENA.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUgovorIntervencijaStav() throws Exception {
        // Get the ugovorIntervencijaStav
        restUgovorIntervencijaStavMockMvc.perform(get("/api/ugovor-intervencija-stavs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUgovorIntervencijaStav() throws Exception {
        // Initialize the database
        ugovorIntervencijaStavRepository.saveAndFlush(ugovorIntervencijaStav);
        int databaseSizeBeforeUpdate = ugovorIntervencijaStavRepository.findAll().size();

        // Update the ugovorIntervencijaStav
        UgovorIntervencijaStav updatedUgovorIntervencijaStav = ugovorIntervencijaStavRepository.findOne(ugovorIntervencijaStav.getId());
        // Disconnect from session so that the updates on updatedUgovorIntervencijaStav are not directly saved in db
        em.detach(updatedUgovorIntervencijaStav);
        updatedUgovorIntervencijaStav
            .naziv(UPDATED_NAZIV)
            .cena(UPDATED_CENA);

        restUgovorIntervencijaStavMockMvc.perform(put("/api/ugovor-intervencija-stavs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUgovorIntervencijaStav)))
            .andExpect(status().isOk());

        // Validate the UgovorIntervencijaStav in the database
        List<UgovorIntervencijaStav> ugovorIntervencijaStavList = ugovorIntervencijaStavRepository.findAll();
        assertThat(ugovorIntervencijaStavList).hasSize(databaseSizeBeforeUpdate);
        UgovorIntervencijaStav testUgovorIntervencijaStav = ugovorIntervencijaStavList.get(ugovorIntervencijaStavList.size() - 1);
        assertThat(testUgovorIntervencijaStav.getNaziv()).isEqualTo(UPDATED_NAZIV);
        assertThat(testUgovorIntervencijaStav.getCena()).isEqualTo(UPDATED_CENA);
    }

    @Test
    @Transactional
    public void updateNonExistingUgovorIntervencijaStav() throws Exception {
        int databaseSizeBeforeUpdate = ugovorIntervencijaStavRepository.findAll().size();

        // Create the UgovorIntervencijaStav

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUgovorIntervencijaStavMockMvc.perform(put("/api/ugovor-intervencija-stavs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ugovorIntervencijaStav)))
            .andExpect(status().isCreated());

        // Validate the UgovorIntervencijaStav in the database
        List<UgovorIntervencijaStav> ugovorIntervencijaStavList = ugovorIntervencijaStavRepository.findAll();
        assertThat(ugovorIntervencijaStavList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUgovorIntervencijaStav() throws Exception {
        // Initialize the database
        ugovorIntervencijaStavRepository.saveAndFlush(ugovorIntervencijaStav);
        int databaseSizeBeforeDelete = ugovorIntervencijaStavRepository.findAll().size();

        // Get the ugovorIntervencijaStav
        restUgovorIntervencijaStavMockMvc.perform(delete("/api/ugovor-intervencija-stavs/{id}", ugovorIntervencijaStav.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UgovorIntervencijaStav> ugovorIntervencijaStavList = ugovorIntervencijaStavRepository.findAll();
        assertThat(ugovorIntervencijaStavList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UgovorIntervencijaStav.class);
        UgovorIntervencijaStav ugovorIntervencijaStav1 = new UgovorIntervencijaStav();
        ugovorIntervencijaStav1.setId(1L);
        UgovorIntervencijaStav ugovorIntervencijaStav2 = new UgovorIntervencijaStav();
        ugovorIntervencijaStav2.setId(ugovorIntervencijaStav1.getId());
        assertThat(ugovorIntervencijaStav1).isEqualTo(ugovorIntervencijaStav2);
        ugovorIntervencijaStav2.setId(2L);
        assertThat(ugovorIntervencijaStav1).isNotEqualTo(ugovorIntervencijaStav2);
        ugovorIntervencijaStav1.setId(null);
        assertThat(ugovorIntervencijaStav1).isNotEqualTo(ugovorIntervencijaStav2);
    }
}
