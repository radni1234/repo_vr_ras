package com.vr.rasveta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vr.rasveta.domain.Prijava;

import com.vr.rasveta.repository.PrijavaRepository;
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
 * REST controller for managing Prijava.
 */
@RestController
@RequestMapping("/api")
public class PrijavaResource {

    private final Logger log = LoggerFactory.getLogger(PrijavaResource.class);

    private static final String ENTITY_NAME = "prijava";

    private final PrijavaRepository prijavaRepository;

    public PrijavaResource(PrijavaRepository prijavaRepository) {
        this.prijavaRepository = prijavaRepository;
    }

    /**
     * POST  /prijavas : Create a new prijava.
     *
     * @param prijava the prijava to create
     * @return the ResponseEntity with status 201 (Created) and with body the new prijava, or with status 400 (Bad Request) if the prijava has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/prijavas")
    @Timed
    public ResponseEntity<Prijava> createPrijava(@RequestBody Prijava prijava) throws URISyntaxException {
        log.debug("REST request to save Prijava : {}", prijava);
        if (prijava.getId() != null) {
            throw new BadRequestAlertException("A new prijava cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Prijava result = prijavaRepository.save(prijava);
        return ResponseEntity.created(new URI("/api/prijavas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /prijavas : Updates an existing prijava.
     *
     * @param prijava the prijava to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated prijava,
     * or with status 400 (Bad Request) if the prijava is not valid,
     * or with status 500 (Internal Server Error) if the prijava couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/prijavas")
    @Timed
    public ResponseEntity<Prijava> updatePrijava(@RequestBody Prijava prijava) throws URISyntaxException {
        log.debug("REST request to update Prijava : {}", prijava);
        if (prijava.getId() == null) {
            return createPrijava(prijava);
        }
        Prijava result = prijavaRepository.save(prijava);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, prijava.getId().toString()))
            .body(result);
    }

    /**
     * GET  /prijavas : get all the prijavas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of prijavas in body
     */
    @GetMapping("/prijavas")
    @Timed
    public ResponseEntity<List<Prijava>> getAllPrijavas(Pageable pageable) {
        log.debug("REST request to get a page of Prijavas");
        Page<Prijava> page = prijavaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/prijavas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /prijavas/:id : get the "id" prijava.
     *
     * @param id the id of the prijava to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the prijava, or with status 404 (Not Found)
     */
    @GetMapping("/prijavas/{id}")
    @Timed
    public ResponseEntity<Prijava> getPrijava(@PathVariable Long id) {
        log.debug("REST request to get Prijava : {}", id);
        Prijava prijava = prijavaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(prijava));
    }

    /**
     * DELETE  /prijavas/:id : delete the "id" prijava.
     *
     * @param id the id of the prijava to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/prijavas/{id}")
    @Timed
    public ResponseEntity<Void> deletePrijava(@PathVariable Long id) {
        log.debug("REST request to delete Prijava : {}", id);
        prijavaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
