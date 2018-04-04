package com.vr.rasveta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vr.rasveta.domain.UgovorIntervencija;

import com.vr.rasveta.repository.UgovorIntervencijaRepository;
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
 * REST controller for managing UgovorIntervencija.
 */
@RestController
@RequestMapping("/api")
public class UgovorIntervencijaResource {

    private final Logger log = LoggerFactory.getLogger(UgovorIntervencijaResource.class);

    private static final String ENTITY_NAME = "ugovorIntervencija";

    private final UgovorIntervencijaRepository ugovorIntervencijaRepository;

    public UgovorIntervencijaResource(UgovorIntervencijaRepository ugovorIntervencijaRepository) {
        this.ugovorIntervencijaRepository = ugovorIntervencijaRepository;
    }

    /**
     * POST  /ugovor-intervencijas : Create a new ugovorIntervencija.
     *
     * @param ugovorIntervencija the ugovorIntervencija to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ugovorIntervencija, or with status 400 (Bad Request) if the ugovorIntervencija has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ugovor-intervencijas")
    @Timed
    public ResponseEntity<UgovorIntervencija> createUgovorIntervencija(@RequestBody UgovorIntervencija ugovorIntervencija) throws URISyntaxException {
        log.debug("REST request to save UgovorIntervencija : {}", ugovorIntervencija);
        if (ugovorIntervencija.getId() != null) {
            throw new BadRequestAlertException("A new ugovorIntervencija cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UgovorIntervencija result = ugovorIntervencijaRepository.save(ugovorIntervencija);
        return ResponseEntity.created(new URI("/api/ugovor-intervencijas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ugovor-intervencijas : Updates an existing ugovorIntervencija.
     *
     * @param ugovorIntervencija the ugovorIntervencija to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ugovorIntervencija,
     * or with status 400 (Bad Request) if the ugovorIntervencija is not valid,
     * or with status 500 (Internal Server Error) if the ugovorIntervencija couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ugovor-intervencijas")
    @Timed
    public ResponseEntity<UgovorIntervencija> updateUgovorIntervencija(@RequestBody UgovorIntervencija ugovorIntervencija) throws URISyntaxException {
        log.debug("REST request to update UgovorIntervencija : {}", ugovorIntervencija);
        if (ugovorIntervencija.getId() == null) {
            return createUgovorIntervencija(ugovorIntervencija);
        }
        UgovorIntervencija result = ugovorIntervencijaRepository.save(ugovorIntervencija);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ugovorIntervencija.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ugovor-intervencijas : get all the ugovorIntervencijas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ugovorIntervencijas in body
     */
    @GetMapping("/ugovor-intervencijas")
    @Timed
    public ResponseEntity<List<UgovorIntervencija>> getAllUgovorIntervencijas(Pageable pageable) {
        log.debug("REST request to get a page of UgovorIntervencijas");
        Page<UgovorIntervencija> page = ugovorIntervencijaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ugovor-intervencijas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /ugovor-intervencijas/:id : get the "id" ugovorIntervencija.
     *
     * @param id the id of the ugovorIntervencija to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ugovorIntervencija, or with status 404 (Not Found)
     */
    @GetMapping("/ugovor-intervencijas/{id}")
    @Timed
    public ResponseEntity<UgovorIntervencija> getUgovorIntervencija(@PathVariable Long id) {
        log.debug("REST request to get UgovorIntervencija : {}", id);
        UgovorIntervencija ugovorIntervencija = ugovorIntervencijaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ugovorIntervencija));
    }

    /**
     * DELETE  /ugovor-intervencijas/:id : delete the "id" ugovorIntervencija.
     *
     * @param id the id of the ugovorIntervencija to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ugovor-intervencijas/{id}")
    @Timed
    public ResponseEntity<Void> deleteUgovorIntervencija(@PathVariable Long id) {
        log.debug("REST request to delete UgovorIntervencija : {}", id);
        ugovorIntervencijaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
