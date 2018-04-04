package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.Stub;
import com.vr.rasveta.repository.StubRepository;
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
 * Test class for the StubResource REST controller.
 *
 * @see StubResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class StubResourceIntTest {

    private static final String DEFAULT_ADRESA = "AAAAAAAAAA";
    private static final String UPDATED_ADRESA = "BBBBBBBBBB";

    private static final Double DEFAULT_LON_D = 1D;
    private static final Double UPDATED_LON_D = 2D;

    private static final Double DEFAULT_LAT_D = 1D;
    private static final Double UPDATED_LAT_D = 2D;

    private static final Integer DEFAULT_RBR = 1;
    private static final Integer UPDATED_RBR = 2;

    private static final String DEFAULT_ADRESA_SLIKE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESA_SLIKE = "BBBBBBBBBB";

    @Autowired
    private StubRepository stubRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStubMockMvc;

    private Stub stub;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StubResource stubResource = new StubResource(stubRepository);
        this.restStubMockMvc = MockMvcBuilders.standaloneSetup(stubResource)
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
    public static Stub createEntity(EntityManager em) {
        Stub stub = new Stub()
            .adresa(DEFAULT_ADRESA)
            .lonD(DEFAULT_LON_D)
            .latD(DEFAULT_LAT_D)
            .rbr(DEFAULT_RBR)
            .adresaSlike(DEFAULT_ADRESA_SLIKE);
        return stub;
    }

    @Before
    public void initTest() {
        stub = createEntity(em);
    }

    @Test
    @Transactional
    public void createStub() throws Exception {
        int databaseSizeBeforeCreate = stubRepository.findAll().size();

        // Create the Stub
        restStubMockMvc.perform(post("/api/stubs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stub)))
            .andExpect(status().isCreated());

        // Validate the Stub in the database
        List<Stub> stubList = stubRepository.findAll();
        assertThat(stubList).hasSize(databaseSizeBeforeCreate + 1);
        Stub testStub = stubList.get(stubList.size() - 1);
        assertThat(testStub.getAdresa()).isEqualTo(DEFAULT_ADRESA);
        assertThat(testStub.getLonD()).isEqualTo(DEFAULT_LON_D);
        assertThat(testStub.getLatD()).isEqualTo(DEFAULT_LAT_D);
        assertThat(testStub.getRbr()).isEqualTo(DEFAULT_RBR);
        assertThat(testStub.getAdresaSlike()).isEqualTo(DEFAULT_ADRESA_SLIKE);
    }

    @Test
    @Transactional
    public void createStubWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stubRepository.findAll().size();

        // Create the Stub with an existing ID
        stub.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStubMockMvc.perform(post("/api/stubs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stub)))
            .andExpect(status().isBadRequest());

        // Validate the Stub in the database
        List<Stub> stubList = stubRepository.findAll();
        assertThat(stubList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStubs() throws Exception {
        // Initialize the database
        stubRepository.saveAndFlush(stub);

        // Get all the stubList
        restStubMockMvc.perform(get("/api/stubs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stub.getId().intValue())))
            .andExpect(jsonPath("$.[*].adresa").value(hasItem(DEFAULT_ADRESA.toString())))
            .andExpect(jsonPath("$.[*].lonD").value(hasItem(DEFAULT_LON_D.doubleValue())))
            .andExpect(jsonPath("$.[*].latD").value(hasItem(DEFAULT_LAT_D.doubleValue())))
            .andExpect(jsonPath("$.[*].rbr").value(hasItem(DEFAULT_RBR)))
            .andExpect(jsonPath("$.[*].adresaSlike").value(hasItem(DEFAULT_ADRESA_SLIKE.toString())));
    }

    @Test
    @Transactional
    public void getStub() throws Exception {
        // Initialize the database
        stubRepository.saveAndFlush(stub);

        // Get the stub
        restStubMockMvc.perform(get("/api/stubs/{id}", stub.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stub.getId().intValue()))
            .andExpect(jsonPath("$.adresa").value(DEFAULT_ADRESA.toString()))
            .andExpect(jsonPath("$.lonD").value(DEFAULT_LON_D.doubleValue()))
            .andExpect(jsonPath("$.latD").value(DEFAULT_LAT_D.doubleValue()))
            .andExpect(jsonPath("$.rbr").value(DEFAULT_RBR))
            .andExpect(jsonPath("$.adresaSlike").value(DEFAULT_ADRESA_SLIKE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStub() throws Exception {
        // Get the stub
        restStubMockMvc.perform(get("/api/stubs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStub() throws Exception {
        // Initialize the database
        stubRepository.saveAndFlush(stub);
        int databaseSizeBeforeUpdate = stubRepository.findAll().size();

        // Update the stub
        Stub updatedStub = stubRepository.findOne(stub.getId());
        // Disconnect from session so that the updates on updatedStub are not directly saved in db
        em.detach(updatedStub);
        updatedStub
            .adresa(UPDATED_ADRESA)
            .lonD(UPDATED_LON_D)
            .latD(UPDATED_LAT_D)
            .rbr(UPDATED_RBR)
            .adresaSlike(UPDATED_ADRESA_SLIKE);

        restStubMockMvc.perform(put("/api/stubs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStub)))
            .andExpect(status().isOk());

        // Validate the Stub in the database
        List<Stub> stubList = stubRepository.findAll();
        assertThat(stubList).hasSize(databaseSizeBeforeUpdate);
        Stub testStub = stubList.get(stubList.size() - 1);
        assertThat(testStub.getAdresa()).isEqualTo(UPDATED_ADRESA);
        assertThat(testStub.getLonD()).isEqualTo(UPDATED_LON_D);
        assertThat(testStub.getLatD()).isEqualTo(UPDATED_LAT_D);
        assertThat(testStub.getRbr()).isEqualTo(UPDATED_RBR);
        assertThat(testStub.getAdresaSlike()).isEqualTo(UPDATED_ADRESA_SLIKE);
    }

    @Test
    @Transactional
    public void updateNonExistingStub() throws Exception {
        int databaseSizeBeforeUpdate = stubRepository.findAll().size();

        // Create the Stub

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStubMockMvc.perform(put("/api/stubs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stub)))
            .andExpect(status().isCreated());

        // Validate the Stub in the database
        List<Stub> stubList = stubRepository.findAll();
        assertThat(stubList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStub() throws Exception {
        // Initialize the database
        stubRepository.saveAndFlush(stub);
        int databaseSizeBeforeDelete = stubRepository.findAll().size();

        // Get the stub
        restStubMockMvc.perform(delete("/api/stubs/{id}", stub.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Stub> stubList = stubRepository.findAll();
        assertThat(stubList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Stub.class);
        Stub stub1 = new Stub();
        stub1.setId(1L);
        Stub stub2 = new Stub();
        stub2.setId(stub1.getId());
        assertThat(stub1).isEqualTo(stub2);
        stub2.setId(2L);
        assertThat(stub1).isNotEqualTo(stub2);
        stub1.setId(null);
        assertThat(stub1).isNotEqualTo(stub2);
    }
}
