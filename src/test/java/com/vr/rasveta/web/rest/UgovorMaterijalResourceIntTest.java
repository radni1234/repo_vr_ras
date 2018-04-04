package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.UgovorMaterijal;
import com.vr.rasveta.repository.UgovorMaterijalRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.vr.rasveta.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UgovorMaterijalResource REST controller.
 *
 * @see UgovorMaterijalResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class UgovorMaterijalResourceIntTest {

    private static final String DEFAULT_OPIS = "AAAAAAAAAA";
    private static final String UPDATED_OPIS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATUM_OD = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATUM_OD = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATUM_DO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATUM_DO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private UgovorMaterijalRepository ugovorMaterijalRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUgovorMaterijalMockMvc;

    private UgovorMaterijal ugovorMaterijal;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UgovorMaterijalResource ugovorMaterijalResource = new UgovorMaterijalResource(ugovorMaterijalRepository);
        this.restUgovorMaterijalMockMvc = MockMvcBuilders.standaloneSetup(ugovorMaterijalResource)
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
    public static UgovorMaterijal createEntity(EntityManager em) {
        UgovorMaterijal ugovorMaterijal = new UgovorMaterijal()
            .opis(DEFAULT_OPIS)
            .datumOd(DEFAULT_DATUM_OD)
            .datumDo(DEFAULT_DATUM_DO);
        return ugovorMaterijal;
    }

    @Before
    public void initTest() {
        ugovorMaterijal = createEntity(em);
    }

    @Test
    @Transactional
    public void createUgovorMaterijal() throws Exception {
        int databaseSizeBeforeCreate = ugovorMaterijalRepository.findAll().size();

        // Create the UgovorMaterijal
        restUgovorMaterijalMockMvc.perform(post("/api/ugovor-materijals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ugovorMaterijal)))
            .andExpect(status().isCreated());

        // Validate the UgovorMaterijal in the database
        List<UgovorMaterijal> ugovorMaterijalList = ugovorMaterijalRepository.findAll();
        assertThat(ugovorMaterijalList).hasSize(databaseSizeBeforeCreate + 1);
        UgovorMaterijal testUgovorMaterijal = ugovorMaterijalList.get(ugovorMaterijalList.size() - 1);
        assertThat(testUgovorMaterijal.getOpis()).isEqualTo(DEFAULT_OPIS);
        assertThat(testUgovorMaterijal.getDatumOd()).isEqualTo(DEFAULT_DATUM_OD);
        assertThat(testUgovorMaterijal.getDatumDo()).isEqualTo(DEFAULT_DATUM_DO);
    }

    @Test
    @Transactional
    public void createUgovorMaterijalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ugovorMaterijalRepository.findAll().size();

        // Create the UgovorMaterijal with an existing ID
        ugovorMaterijal.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUgovorMaterijalMockMvc.perform(post("/api/ugovor-materijals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ugovorMaterijal)))
            .andExpect(status().isBadRequest());

        // Validate the UgovorMaterijal in the database
        List<UgovorMaterijal> ugovorMaterijalList = ugovorMaterijalRepository.findAll();
        assertThat(ugovorMaterijalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUgovorMaterijals() throws Exception {
        // Initialize the database
        ugovorMaterijalRepository.saveAndFlush(ugovorMaterijal);

        // Get all the ugovorMaterijalList
        restUgovorMaterijalMockMvc.perform(get("/api/ugovor-materijals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ugovorMaterijal.getId().intValue())))
            .andExpect(jsonPath("$.[*].opis").value(hasItem(DEFAULT_OPIS.toString())))
            .andExpect(jsonPath("$.[*].datumOd").value(hasItem(DEFAULT_DATUM_OD.toString())))
            .andExpect(jsonPath("$.[*].datumDo").value(hasItem(DEFAULT_DATUM_DO.toString())));
    }

    @Test
    @Transactional
    public void getUgovorMaterijal() throws Exception {
        // Initialize the database
        ugovorMaterijalRepository.saveAndFlush(ugovorMaterijal);

        // Get the ugovorMaterijal
        restUgovorMaterijalMockMvc.perform(get("/api/ugovor-materijals/{id}", ugovorMaterijal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ugovorMaterijal.getId().intValue()))
            .andExpect(jsonPath("$.opis").value(DEFAULT_OPIS.toString()))
            .andExpect(jsonPath("$.datumOd").value(DEFAULT_DATUM_OD.toString()))
            .andExpect(jsonPath("$.datumDo").value(DEFAULT_DATUM_DO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUgovorMaterijal() throws Exception {
        // Get the ugovorMaterijal
        restUgovorMaterijalMockMvc.perform(get("/api/ugovor-materijals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUgovorMaterijal() throws Exception {
        // Initialize the database
        ugovorMaterijalRepository.saveAndFlush(ugovorMaterijal);
        int databaseSizeBeforeUpdate = ugovorMaterijalRepository.findAll().size();

        // Update the ugovorMaterijal
        UgovorMaterijal updatedUgovorMaterijal = ugovorMaterijalRepository.findOne(ugovorMaterijal.getId());
        // Disconnect from session so that the updates on updatedUgovorMaterijal are not directly saved in db
        em.detach(updatedUgovorMaterijal);
        updatedUgovorMaterijal
            .opis(UPDATED_OPIS)
            .datumOd(UPDATED_DATUM_OD)
            .datumDo(UPDATED_DATUM_DO);

        restUgovorMaterijalMockMvc.perform(put("/api/ugovor-materijals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUgovorMaterijal)))
            .andExpect(status().isOk());

        // Validate the UgovorMaterijal in the database
        List<UgovorMaterijal> ugovorMaterijalList = ugovorMaterijalRepository.findAll();
        assertThat(ugovorMaterijalList).hasSize(databaseSizeBeforeUpdate);
        UgovorMaterijal testUgovorMaterijal = ugovorMaterijalList.get(ugovorMaterijalList.size() - 1);
        assertThat(testUgovorMaterijal.getOpis()).isEqualTo(UPDATED_OPIS);
        assertThat(testUgovorMaterijal.getDatumOd()).isEqualTo(UPDATED_DATUM_OD);
        assertThat(testUgovorMaterijal.getDatumDo()).isEqualTo(UPDATED_DATUM_DO);
    }

    @Test
    @Transactional
    public void updateNonExistingUgovorMaterijal() throws Exception {
        int databaseSizeBeforeUpdate = ugovorMaterijalRepository.findAll().size();

        // Create the UgovorMaterijal

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUgovorMaterijalMockMvc.perform(put("/api/ugovor-materijals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ugovorMaterijal)))
            .andExpect(status().isCreated());

        // Validate the UgovorMaterijal in the database
        List<UgovorMaterijal> ugovorMaterijalList = ugovorMaterijalRepository.findAll();
        assertThat(ugovorMaterijalList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUgovorMaterijal() throws Exception {
        // Initialize the database
        ugovorMaterijalRepository.saveAndFlush(ugovorMaterijal);
        int databaseSizeBeforeDelete = ugovorMaterijalRepository.findAll().size();

        // Get the ugovorMaterijal
        restUgovorMaterijalMockMvc.perform(delete("/api/ugovor-materijals/{id}", ugovorMaterijal.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UgovorMaterijal> ugovorMaterijalList = ugovorMaterijalRepository.findAll();
        assertThat(ugovorMaterijalList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UgovorMaterijal.class);
        UgovorMaterijal ugovorMaterijal1 = new UgovorMaterijal();
        ugovorMaterijal1.setId(1L);
        UgovorMaterijal ugovorMaterijal2 = new UgovorMaterijal();
        ugovorMaterijal2.setId(ugovorMaterijal1.getId());
        assertThat(ugovorMaterijal1).isEqualTo(ugovorMaterijal2);
        ugovorMaterijal2.setId(2L);
        assertThat(ugovorMaterijal1).isNotEqualTo(ugovorMaterijal2);
        ugovorMaterijal1.setId(null);
        assertThat(ugovorMaterijal1).isNotEqualTo(ugovorMaterijal2);
    }
}
