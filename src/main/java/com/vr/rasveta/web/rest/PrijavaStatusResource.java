package com.vr.rasveta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vr.rasveta.domain.PrijavaStatus;

import com.vr.rasveta.repository.PrijavaStatusRepository;
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
 * REST controller for managing PrijavaStatus.
 */
@RestController
@RequestMapping("/api")
public class PrijavaStatusResource {

    private final Logger log = LoggerFactory.getLogger(PrijavaStatusResource.class);

    private static final String ENTITY_NAME = "prijavaStatus";

    private final PrijavaStatusRepository prijavaStatusRepository;

    public PrijavaStatusResource(PrijavaStatusRepository prijavaStatusRepository) {
        this.prijavaStatusRepository = prijavaStatusRepository;
    }

    /**
     * POST  /prijava-statuses : Create a new prijavaStatus.
     *
     * @param prijavaStatus the prijavaStatus to create
     * @return the ResponseEntity with status 201 (Created) and with body the new prijavaStatus, or with status 400 (Bad Request) if the prijavaStatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/prijava-statuses")
    @Timed
    public ResponseEntity<PrijavaStatus> createPrijavaStatus(@RequestBody PrijavaStatus prijavaStatus) throws URISyntaxException {
        log.debug("REST request to save PrijavaStatus : {}", prijavaStatus);
        if (prijavaStatus.getId() != null) {
            throw new BadRequestAlertException("A new prijavaStatus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrijavaStatus result = prijavaStatusRepository.save(prijavaStatus);
        return ResponseEntity.created(new URI("/api/prijava-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /prijava-statuses : Updates an existing prijavaStatus.
     *
     * @param prijavaStatus the prijavaStatus to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated prijavaStatus,
     * or with status 400 (Bad Request) if the prijavaStatus is not valid,
     * or with status 500 (Internal Server Error) if the prijavaStatus couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/prijava-statuses")
    @Timed
    public ResponseEntity<PrijavaStatus> updatePrijavaStatus(@RequestBody PrijavaStatus prijavaStatus) throws URISyntaxException {
        log.debug("REST request to update PrijavaStatus : {}", prijavaStatus);
        if (prijavaStatus.getId() == null) {
            return createPrijavaStatus(prijavaStatus);
        }
        PrijavaStatus result = prijavaStatusRepository.save(prijavaStatus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, prijavaStatus.getId().toString()))
            .body(result);
    }

    /**
     * GET  /prijava-statuses : get all the prijavaStatuses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of prijavaStatuses in body
     */
    @GetMapping("/prijava-statuses")
    @Timed
    public ResponseEntity<List<PrijavaStatus>> getAllPrijavaStatuses(Pageable pageable) {
        log.debug("REST request to get a page of PrijavaStatuses");
        Page<PrijavaStatus> page = prijavaStatusRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/prijava-statuses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /prijava-statuses/:id : get the "id" prijavaStatus.
     *
     * @param id the id of the prijavaStatus to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the prijavaStatus, or with status 404 (Not Found)
     */
    @GetMapping("/prijava-statuses/{id}")
    @Timed
    public ResponseEntity<PrijavaStatus> getPrijavaStatus(@PathVariable Long id) {
        log.debug("REST request to get PrijavaStatus : {}", id);
        PrijavaStatus prijavaStatus = prijavaStatusRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(prijavaStatus));
    }

    /**
     * DELETE  /prijava-statuses/:id : delete the "id" prijavaStatus.
     *
     * @param id the id of the prijavaStatus to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/prijava-statuses/{id}")
    @Timed
    public ResponseEntity<Void> deletePrijavaStatus(@PathVariable Long id) {
        log.debug("REST request to delete PrijavaStatus : {}", id);
        prijavaStatusRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
