package com.vr.rasveta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vr.rasveta.domain.PrijavaMaterijal;

import com.vr.rasveta.repository.PrijavaMaterijalRepository;
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
 * REST controller for managing PrijavaMaterijal.
 */
@RestController
@RequestMapping("/api")
public class PrijavaMaterijalResource {

    private final Logger log = LoggerFactory.getLogger(PrijavaMaterijalResource.class);

    private static final String ENTITY_NAME = "prijavaMaterijal";

    private final PrijavaMaterijalRepository prijavaMaterijalRepository;

    public PrijavaMaterijalResource(PrijavaMaterijalRepository prijavaMaterijalRepository) {
        this.prijavaMaterijalRepository = prijavaMaterijalRepository;
    }

    /**
     * POST  /prijava-materijals : Create a new prijavaMaterijal.
     *
     * @param prijavaMaterijal the prijavaMaterijal to create
     * @return the ResponseEntity with status 201 (Created) and with body the new prijavaMaterijal, or with status 400 (Bad Request) if the prijavaMaterijal has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/prijava-materijals")
    @Timed
    public ResponseEntity<PrijavaMaterijal> createPrijavaMaterijal(@RequestBody PrijavaMaterijal prijavaMaterijal) throws URISyntaxException {
        log.debug("REST request to save PrijavaMaterijal : {}", prijavaMaterijal);
        if (prijavaMaterijal.getId() != null) {
            throw new BadRequestAlertException("A new prijavaMaterijal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrijavaMaterijal result = prijavaMaterijalRepository.save(prijavaMaterijal);
        return ResponseEntity.created(new URI("/api/prijava-materijals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /prijava-materijals : Updates an existing prijavaMaterijal.
     *
     * @param prijavaMaterijal the prijavaMaterijal to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated prijavaMaterijal,
     * or with status 400 (Bad Request) if the prijavaMaterijal is not valid,
     * or with status 500 (Internal Server Error) if the prijavaMaterijal couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/prijava-materijals")
    @Timed
    public ResponseEntity<PrijavaMaterijal> updatePrijavaMaterijal(@RequestBody PrijavaMaterijal prijavaMaterijal) throws URISyntaxException {
        log.debug("REST request to update PrijavaMaterijal : {}", prijavaMaterijal);
        if (prijavaMaterijal.getId() == null) {
            return createPrijavaMaterijal(prijavaMaterijal);
        }
        PrijavaMaterijal result = prijavaMaterijalRepository.save(prijavaMaterijal);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, prijavaMaterijal.getId().toString()))
            .body(result);
    }

    /**
     * GET  /prijava-materijals : get all the prijavaMaterijals.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of prijavaMaterijals in body
     */
    @GetMapping("/prijava-materijals")
    @Timed
    public ResponseEntity<List<PrijavaMaterijal>> getAllPrijavaMaterijals(Pageable pageable) {
        log.debug("REST request to get a page of PrijavaMaterijals");
        Page<PrijavaMaterijal> page = prijavaMaterijalRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/prijava-materijals");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /prijava-materijals/:id : get the "id" prijavaMaterijal.
     *
     * @param id the id of the prijavaMaterijal to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the prijavaMaterijal, or with status 404 (Not Found)
     */
    @GetMapping("/prijava-materijals/{id}")
    @Timed
    public ResponseEntity<PrijavaMaterijal> getPrijavaMaterijal(@PathVariable Long id) {
        log.debug("REST request to get PrijavaMaterijal : {}", id);
        PrijavaMaterijal prijavaMaterijal = prijavaMaterijalRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(prijavaMaterijal));
    }

    /**
     * DELETE  /prijava-materijals/:id : delete the "id" prijavaMaterijal.
     *
     * @param id the id of the prijavaMaterijal to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/prijava-materijals/{id}")
    @Timed
    public ResponseEntity<Void> deletePrijavaMaterijal(@PathVariable Long id) {
        log.debug("REST request to delete PrijavaMaterijal : {}", id);
        prijavaMaterijalRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
