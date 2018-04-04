package com.vr.rasveta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vr.rasveta.domain.UgovorIntervencijaStav;

import com.vr.rasveta.repository.UgovorIntervencijaStavRepository;
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
 * REST controller for managing UgovorIntervencijaStav.
 */
@RestController
@RequestMapping("/api")
public class UgovorIntervencijaStavResource {

    private final Logger log = LoggerFactory.getLogger(UgovorIntervencijaStavResource.class);

    private static final String ENTITY_NAME = "ugovorIntervencijaStav";

    private final UgovorIntervencijaStavRepository ugovorIntervencijaStavRepository;

    public UgovorIntervencijaStavResource(UgovorIntervencijaStavRepository ugovorIntervencijaStavRepository) {
        this.ugovorIntervencijaStavRepository = ugovorIntervencijaStavRepository;
    }

    /**
     * POST  /ugovor-intervencija-stavs : Create a new ugovorIntervencijaStav.
     *
     * @param ugovorIntervencijaStav the ugovorIntervencijaStav to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ugovorIntervencijaStav, or with status 400 (Bad Request) if the ugovorIntervencijaStav has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ugovor-intervencija-stavs")
    @Timed
    public ResponseEntity<UgovorIntervencijaStav> createUgovorIntervencijaStav(@RequestBody UgovorIntervencijaStav ugovorIntervencijaStav) throws URISyntaxException {
        log.debug("REST request to save UgovorIntervencijaStav : {}", ugovorIntervencijaStav);
        if (ugovorIntervencijaStav.getId() != null) {
            throw new BadRequestAlertException("A new ugovorIntervencijaStav cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UgovorIntervencijaStav result = ugovorIntervencijaStavRepository.save(ugovorIntervencijaStav);
        return ResponseEntity.created(new URI("/api/ugovor-intervencija-stavs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ugovor-intervencija-stavs : Updates an existing ugovorIntervencijaStav.
     *
     * @param ugovorIntervencijaStav the ugovorIntervencijaStav to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ugovorIntervencijaStav,
     * or with status 400 (Bad Request) if the ugovorIntervencijaStav is not valid,
     * or with status 500 (Internal Server Error) if the ugovorIntervencijaStav couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ugovor-intervencija-stavs")
    @Timed
    public ResponseEntity<UgovorIntervencijaStav> updateUgovorIntervencijaStav(@RequestBody UgovorIntervencijaStav ugovorIntervencijaStav) throws URISyntaxException {
        log.debug("REST request to update UgovorIntervencijaStav : {}", ugovorIntervencijaStav);
        if (ugovorIntervencijaStav.getId() == null) {
            return createUgovorIntervencijaStav(ugovorIntervencijaStav);
        }
        UgovorIntervencijaStav result = ugovorIntervencijaStavRepository.save(ugovorIntervencijaStav);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ugovorIntervencijaStav.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ugovor-intervencija-stavs : get all the ugovorIntervencijaStavs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ugovorIntervencijaStavs in body
     */
    @GetMapping("/ugovor-intervencija-stavs")
    @Timed
    public ResponseEntity<List<UgovorIntervencijaStav>> getAllUgovorIntervencijaStavs(Pageable pageable) {
        log.debug("REST request to get a page of UgovorIntervencijaStavs");
        Page<UgovorIntervencijaStav> page = ugovorIntervencijaStavRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ugovor-intervencija-stavs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /ugovor-intervencija-stavs/:id : get the "id" ugovorIntervencijaStav.
     *
     * @param id the id of the ugovorIntervencijaStav to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ugovorIntervencijaStav, or with status 404 (Not Found)
     */
    @GetMapping("/ugovor-intervencija-stavs/{id}")
    @Timed
    public ResponseEntity<UgovorIntervencijaStav> getUgovorIntervencijaStav(@PathVariable Long id) {
        log.debug("REST request to get UgovorIntervencijaStav : {}", id);
        UgovorIntervencijaStav ugovorIntervencijaStav = ugovorIntervencijaStavRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ugovorIntervencijaStav));
    }

    /**
     * DELETE  /ugovor-intervencija-stavs/:id : delete the "id" ugovorIntervencijaStav.
     *
     * @param id the id of the ugovorIntervencijaStav to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ugovor-intervencija-stavs/{id}")
    @Timed
    public ResponseEntity<Void> deleteUgovorIntervencijaStav(@PathVariable Long id) {
        log.debug("REST request to delete UgovorIntervencijaStav : {}", id);
        ugovorIntervencijaStavRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
