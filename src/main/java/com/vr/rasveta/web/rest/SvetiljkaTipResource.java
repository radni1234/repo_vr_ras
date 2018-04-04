package com.vr.rasveta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vr.rasveta.domain.SvetiljkaTip;

import com.vr.rasveta.repository.SvetiljkaTipRepository;
import com.vr.rasveta.web.rest.errors.BadRequestAlertException;
import com.vr.rasveta.web.rest.util.HeaderUtil;
import com.vr.rasveta.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SvetiljkaTip.
 */
@RestController
@RequestMapping("/api")
public class SvetiljkaTipResource {

    private final Logger log = LoggerFactory.getLogger(SvetiljkaTipResource.class);

    private static final String ENTITY_NAME = "svetiljkaTip";

    private final SvetiljkaTipRepository svetiljkaTipRepository;

    public SvetiljkaTipResource(SvetiljkaTipRepository svetiljkaTipRepository) {
        this.svetiljkaTipRepository = svetiljkaTipRepository;
    }

    /**
     * POST  /svetiljka-tips : Create a new svetiljkaTip.
     *
     * @param svetiljkaTip the svetiljkaTip to create
     * @return the ResponseEntity with status 201 (Created) and with body the new svetiljkaTip, or with status 400 (Bad Request) if the svetiljkaTip has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/svetiljka-tips")
    @Timed
    public ResponseEntity<SvetiljkaTip> createSvetiljkaTip(@RequestBody SvetiljkaTip svetiljkaTip) throws URISyntaxException {
        log.debug("REST request to save SvetiljkaTip : {}", svetiljkaTip);
        if (svetiljkaTip.getId() != null) {
            throw new BadRequestAlertException("A new svetiljkaTip cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SvetiljkaTip result = svetiljkaTipRepository.save(svetiljkaTip);
        return ResponseEntity.created(new URI("/api/svetiljka-tips/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /svetiljka-tips : Updates an existing svetiljkaTip.
     *
     * @param svetiljkaTip the svetiljkaTip to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated svetiljkaTip,
     * or with status 400 (Bad Request) if the svetiljkaTip is not valid,
     * or with status 500 (Internal Server Error) if the svetiljkaTip couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/svetiljka-tips")
    @Timed
    public ResponseEntity<SvetiljkaTip> updateSvetiljkaTip(@RequestBody SvetiljkaTip svetiljkaTip) throws URISyntaxException {
        log.debug("REST request to update SvetiljkaTip : {}", svetiljkaTip);
        if (svetiljkaTip.getId() == null) {
            return createSvetiljkaTip(svetiljkaTip);
        }
        SvetiljkaTip result = svetiljkaTipRepository.save(svetiljkaTip);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, svetiljkaTip.getId().toString()))
            .body(result);
    }

    /**
     * GET  /svetiljka-tips : get all the svetiljkaTips.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of svetiljkaTips in body
     */
    @GetMapping("/svetiljka-tips")
    @Timed
    public ResponseEntity<List<SvetiljkaTip>> getAllSvetiljkaTips(Pageable pageable) {
        log.debug("REST request to get a page of SvetiljkaTips");
        Page<SvetiljkaTip> page = svetiljkaTipRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/svetiljka-tips");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /svetiljka-tips/:id : get the "id" svetiljkaTip.
     *
     * @param id the id of the svetiljkaTip to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the svetiljkaTip, or with status 404 (Not Found)
     */
    @GetMapping("/svetiljka-tips/{id}")
    @Timed
    public ResponseEntity<SvetiljkaTip> getSvetiljkaTip(@PathVariable Long id) {
        log.debug("REST request to get SvetiljkaTip : {}", id);
        SvetiljkaTip svetiljkaTip = svetiljkaTipRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(svetiljkaTip));
    }

    /**
     * DELETE  /svetiljka-tips/:id : delete the "id" svetiljkaTip.
     *
     * @param id the id of the svetiljkaTip to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/svetiljka-tips/{id}")
    @Timed
    public ResponseEntity<Void> deleteSvetiljkaTip(@PathVariable Long id) {
        log.debug("REST request to delete SvetiljkaTip : {}", id);
        svetiljkaTipRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
