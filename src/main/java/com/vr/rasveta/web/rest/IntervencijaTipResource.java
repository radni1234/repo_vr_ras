package com.vr.rasveta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vr.rasveta.domain.IntervencijaTip;

import com.vr.rasveta.repository.IntervencijaTipRepository;
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
 * REST controller for managing IntervencijaTip.
 */
@RestController
@RequestMapping("/api")
public class IntervencijaTipResource {

    private final Logger log = LoggerFactory.getLogger(IntervencijaTipResource.class);

    private static final String ENTITY_NAME = "intervencijaTip";

    private final IntervencijaTipRepository intervencijaTipRepository;

    public IntervencijaTipResource(IntervencijaTipRepository intervencijaTipRepository) {
        this.intervencijaTipRepository = intervencijaTipRepository;
    }

    /**
     * POST  /intervencija-tips : Create a new intervencijaTip.
     *
     * @param intervencijaTip the intervencijaTip to create
     * @return the ResponseEntity with status 201 (Created) and with body the new intervencijaTip, or with status 400 (Bad Request) if the intervencijaTip has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/intervencija-tips")
    @Timed
    public ResponseEntity<IntervencijaTip> createIntervencijaTip(@RequestBody IntervencijaTip intervencijaTip) throws URISyntaxException {
        log.debug("REST request to save IntervencijaTip : {}", intervencijaTip);
        if (intervencijaTip.getId() != null) {
            throw new BadRequestAlertException("A new intervencijaTip cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IntervencijaTip result = intervencijaTipRepository.save(intervencijaTip);
        return ResponseEntity.created(new URI("/api/intervencija-tips/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /intervencija-tips : Updates an existing intervencijaTip.
     *
     * @param intervencijaTip the intervencijaTip to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated intervencijaTip,
     * or with status 400 (Bad Request) if the intervencijaTip is not valid,
     * or with status 500 (Internal Server Error) if the intervencijaTip couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/intervencija-tips")
    @Timed
    public ResponseEntity<IntervencijaTip> updateIntervencijaTip(@RequestBody IntervencijaTip intervencijaTip) throws URISyntaxException {
        log.debug("REST request to update IntervencijaTip : {}", intervencijaTip);
        if (intervencijaTip.getId() == null) {
            return createIntervencijaTip(intervencijaTip);
        }
        IntervencijaTip result = intervencijaTipRepository.save(intervencijaTip);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, intervencijaTip.getId().toString()))
            .body(result);
    }

    /**
     * GET  /intervencija-tips : get all the intervencijaTips.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of intervencijaTips in body
     */
    @GetMapping("/intervencija-tips")
    @Timed
    public ResponseEntity<List<IntervencijaTip>> getAllIntervencijaTips(Pageable pageable) {
        log.debug("REST request to get a page of IntervencijaTips");
        Page<IntervencijaTip> page = intervencijaTipRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/intervencija-tips");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /intervencija-tips/:id : get the "id" intervencijaTip.
     *
     * @param id the id of the intervencijaTip to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the intervencijaTip, or with status 404 (Not Found)
     */
    @GetMapping("/intervencija-tips/{id}")
    @Timed
    public ResponseEntity<IntervencijaTip> getIntervencijaTip(@PathVariable Long id) {
        log.debug("REST request to get IntervencijaTip : {}", id);
        IntervencijaTip intervencijaTip = intervencijaTipRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(intervencijaTip));
    }

    /**
     * DELETE  /intervencija-tips/:id : delete the "id" intervencijaTip.
     *
     * @param id the id of the intervencijaTip to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/intervencija-tips/{id}")
    @Timed
    public ResponseEntity<Void> deleteIntervencijaTip(@PathVariable Long id) {
        log.debug("REST request to delete IntervencijaTip : {}", id);
        intervencijaTipRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
