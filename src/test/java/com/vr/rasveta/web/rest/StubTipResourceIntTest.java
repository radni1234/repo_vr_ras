package com.vr.rasveta.web.rest;

import com.vr.rasveta.RasvetaApp;

import com.vr.rasveta.domain.StubTip;
import com.vr.rasveta.repository.StubTipRepository;
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
 * Test class for the StubTipResource REST controller.
 *
 * @see StubTipResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RasvetaApp.class)
public class StubTipResourceIntTest {

    private static final String DEFAULT_NAZIV = "AAAAAAAAAA";
    private static final String UPDATED_NAZIV = "BBBBBBBBBB";

    @Autowired
    private StubTipRepository stubTipRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStubTipMockMvc;

    private StubTip stubTip;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StubTipResource stubTipResource = new StubTipResource(stubTipRepository);
        this.restStubTipMockMvc = MockMvcBuilders.standaloneSetup(stubTipResource)
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
    public static StubTip createEntity(EntityManager em) {
        StubTip stubTip = new StubTip()
            .naziv(DEFAULT_NAZIV);
        return stubTip;
    }

    @Before
    public void initTest() {
        stubTip = createEntity(em);
    }

    @Test
    @Transactional
    public void createStubTip() throws Exception {
        int databaseSizeBeforeCreate = stubTipRepository.findAll().size();

        // Create the StubTip
        restStubTipMockMvc.perform(post("/api/stub-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stubTip)))
            .andExpect(status().isCreated());

        // Validate the StubTip in the database
        List<StubTip> stubTipList = stubTipRepository.findAll();
        assertThat(stubTipList).hasSize(databaseSizeBeforeCreate + 1);
        StubTip testStubTip = stubTipList.get(stubTipList.size() - 1);
        assertThat(testStubTip.getNaziv()).isEqualTo(DEFAULT_NAZIV);
    }

    @Test
    @Transactional
    public void createStubTipWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stubTipRepository.findAll().size();

        // Create the StubTip with an existing ID
        stubTip.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStubTipMockMvc.perform(post("/api/stub-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stubTip)))
            .andExpect(status().isBadRequest());

        // Validate the StubTip in the database
        List<StubTip> stubTipList = stubTipRepository.findAll();
        assertThat(stubTipList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStubTips() throws Exception {
        // Initialize the database
        stubTipRepository.saveAndFlush(stubTip);

        // Get all the stubTipList
        restStubTipMockMvc.perform(get("/api/stub-tips?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stubTip.getId().intValue())))
            .andExpect(jsonPath("$.[*].naziv").value(hasItem(DEFAULT_NAZIV.toString())));
    }

    @Test
    @Transactional
    public void getStubTip() throws Exception {
        // Initialize the database
        stubTipRepository.saveAndFlush(stubTip);

        // Get the stubTip
        restStubTipMockMvc.perform(get("/api/stub-tips/{id}", stubTip.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stubTip.getId().intValue()))
            .andExpect(jsonPath("$.naziv").value(DEFAULT_NAZIV.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStubTip() throws Exception {
        // Get the stubTip
        restStubTipMockMvc.perform(get("/api/stub-tips/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStubTip() throws Exception {
        // Initialize the database
        stubTipRepository.saveAndFlush(stubTip);
        int databaseSizeBeforeUpdate = stubTipRepository.findAll().size();

        // Update the stubTip
        StubTip updatedStubTip = stubTipRepository.findOne(stubTip.getId());
        // Disconnect from session so that the updates on updatedStubTip are not directly saved in db
        em.detach(updatedStubTip);
        updatedStubTip
            .naziv(UPDATED_NAZIV);

        restStubTipMockMvc.perform(put("/api/stub-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStubTip)))
            .andExpect(status().isOk());

        // Validate the StubTip in the database
        List<StubTip> stubTipList = stubTipRepository.findAll();
        assertThat(stubTipList).hasSize(databaseSizeBeforeUpdate);
        StubTip testStubTip = stubTipList.get(stubTipList.size() - 1);
        assertThat(testStubTip.getNaziv()).isEqualTo(UPDATED_NAZIV);
    }

    @Test
    @Transactional
    public void updateNonExistingStubTip() throws Exception {
        int databaseSizeBeforeUpdate = stubTipRepository.findAll().size();

        // Create the StubTip

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStubTipMockMvc.perform(put("/api/stub-tips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stubTip)))
            .andExpect(status().isCreated());

        // Validate the StubTip in the database
        List<StubTip> stubTipList = stubTipRepository.findAll();
        assertThat(stubTipList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStubTip() throws Exception {
        // Initialize the database
        stubTipRepository.saveAndFlush(stubTip);
        int databaseSizeBeforeDelete = stubTipRepository.findAll().size();

        // Get the stubTip
        restStubTipMockMvc.perform(delete("/api/stub-tips/{id}", stubTip.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<StubTip> stubTipList = stubTipRepository.findAll();
        assertThat(stubTipList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StubTip.class);
        StubTip stubTip1 = new StubTip();
        stubTip1.setId(1L);
        StubTip stubTip2 = new StubTip();
        stubTip2.setId(stubTip1.getId());
        assertThat(stubTip1).isEqualTo(stubTip2);
        stubTip2.setId(2L);
        assertThat(stubTip1).isNotEqualTo(stubTip2);
        stubTip1.setId(null);
        assertThat(stubTip1).isNotEqualTo(stubTip2);
    }
}
