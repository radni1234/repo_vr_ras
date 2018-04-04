package com.vr.rasveta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vr.rasveta.domain.PrijavaIntervencija;

import com.vr.rasveta.repository.PrijavaIntervencijaRepository;
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
 * REST controller for managing PrijavaIntervencija.
 */
@RestController
@RequestMapping("/api")
public class PrijavaIntervencijaResource {

    private final Logger log = LoggerFactory.getLogger(PrijavaIntervencijaResource.class);

    private static final String ENTITY_NAME = "prijavaIntervencija";

    private final PrijavaIntervencijaRepository prijavaIntervencijaRepository;

    public PrijavaIntervencijaResource(PrijavaIntervencijaRepository prijavaIntervencijaRepository) {
        this.prijavaIntervencijaRepository = prijavaIntervencijaRepository;
    }

    /**
     * POST  /prijava-intervencijas : Create a new prijavaIntervencija.
     *
     * @param prijavaIntervencija the prijavaIntervencija to create
     * @return the ResponseEntity with status 201 (Created) and with body the new prijavaIntervencija, or with status 400 (Bad Request) if the prijavaIntervencija has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/prijava-intervencijas")
    @Timed
    public ResponseEntity<PrijavaIntervencija> createPrijavaIntervencija(@RequestBody PrijavaIntervencija prijavaIntervencija) throws URISyntaxException {
        log.debug("REST request to save PrijavaIntervencija : {}", prijavaIntervencija);
        if (prijavaIntervencija.getId() != null) {
            throw new BadRequestAlertException("A new prijavaIntervencija cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrijavaIntervencija result = prijavaIntervencijaRepository.save(prijavaIntervencija);
        return ResponseEntity.created(new URI("/api/prijava-intervencijas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /prijava-intervencijas : Updates an existing prijavaIntervencija.
     *
     * @param prijavaIntervencija the prijavaIntervencija to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated prijavaIntervencija,
     * or with status 400 (Bad Request) if the prijavaIntervencija is not valid,
     * or with status 500 (Internal Server Error) if the prijavaIntervencija couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/prijava-intervencijas")
    @Timed
    public ResponseEntity<PrijavaIntervencija> updatePrijavaIntervencija(@RequestBody PrijavaIntervencija prijavaIntervencija) throws URISyntaxException {
        log.debug("REST request to update PrijavaIntervencija : {}", prijavaIntervencija);
        if (prijavaIntervencija.getId() == null) {
            return createPrijavaIntervencija(prijavaIntervencija);
        }
        PrijavaIntervencija result = prijavaIntervencijaRepository.save(prijavaIntervencija);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, prijavaIntervencija.getId().toString()))
            .body(result);
    }

    /**
     * GET  /prijava-intervencijas : get all the prijavaIntervencijas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of prijavaIntervencijas in body
     */
    @GetMapping("/prijava-intervencijas")
    @Timed
    public ResponseEntity<List<PrijavaIntervencija>> getAllPrijavaIntervencijas(Pageable pageable) {
        log.debug("REST request to get a page of PrijavaIntervencijas");
        Page<PrijavaIntervencija> page = prijavaIntervencijaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/prijava-intervencijas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /prijava-intervencijas/:id : get the "id" prijavaIntervencija.
     *
     * @param id the id of the prijavaIntervencija to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the prijavaIntervencija, or with status 404 (Not Found)
     */
    @GetMapping("/prijava-intervencijas/{id}")
    @Timed
    public ResponseEntity<PrijavaIntervencija> getPrijavaIntervencija(@PathVariable Long id) {
        log.debug("REST request to get PrijavaIntervencija : {}", id);
        PrijavaIntervencija prijavaIntervencija = prijavaIntervencijaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(prijavaIntervencija));
    }

    /**
     * DELETE  /prijava-intervencijas/:id : delete the "id" prijavaIntervencija.
     *
     * @param id the id of the prijavaIntervencija to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/prijava-intervencijas/{id}")
    @Timed
    public ResponseEntity<Void> deletePrijavaIntervencija(@PathVariable Long id) {
        log.debug("REST request to delete PrijavaIntervencija : {}", id);
        prijavaIntervencijaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
