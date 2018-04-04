package com.vr.rasveta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vr.rasveta.domain.UgovorMaterijalStav;

import com.vr.rasveta.repository.UgovorMaterijalStavRepository;
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
 * REST controller for managing UgovorMaterijalStav.
 */
@RestController
@RequestMapping("/api")
public class UgovorMaterijalStavResource {

    private final Logger log = LoggerFactory.getLogger(UgovorMaterijalStavResource.class);

    private static final String ENTITY_NAME = "ugovorMaterijalStav";

    private final UgovorMaterijalStavRepository ugovorMaterijalStavRepository;

    public UgovorMaterijalStavResource(UgovorMaterijalStavRepository ugovorMaterijalStavRepository) {
        this.ugovorMaterijalStavRepository = ugovorMaterijalStavRepository;
    }

    /**
     * POST  /ugovor-materijal-stavs : Create a new ugovorMaterijalStav.
     *
     * @param ugovorMaterijalStav the ugovorMaterijalStav to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ugovorMaterijalStav, or with status 400 (Bad Request) if the ugovorMaterijalStav has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ugovor-materijal-stavs")
    @Timed
    public ResponseEntity<UgovorMaterijalStav> createUgovorMaterijalStav(@RequestBody UgovorMaterijalStav ugovorMaterijalStav) throws URISyntaxException {
        log.debug("REST request to save UgovorMaterijalStav : {}", ugovorMaterijalStav);
        if (ugovorMaterijalStav.getId() != null) {
            throw new BadRequestAlertException("A new ugovorMaterijalStav cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UgovorMaterijalStav result = ugovorMaterijalStavRepository.save(ugovorMaterijalStav);
        return ResponseEntity.created(new URI("/api/ugovor-materijal-stavs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ugovor-materijal-stavs : Updates an existing ugovorMaterijalStav.
     *
     * @param ugovorMaterijalStav the ugovorMaterijalStav to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ugovorMaterijalStav,
     * or with status 400 (Bad Request) if the ugovorMaterijalStav is not valid,
     * or with status 500 (Internal Server Error) if the ugovorMaterijalStav couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ugovor-materijal-stavs")
    @Timed
    public ResponseEntity<UgovorMaterijalStav> updateUgovorMaterijalStav(@RequestBody UgovorMaterijalStav ugovorMaterijalStav) throws URISyntaxException {
        log.debug("REST request to update UgovorMaterijalStav : {}", ugovorMaterijalStav);
        if (ugovorMaterijalStav.getId() == null) {
            return createUgovorMaterijalStav(ugovorMaterijalStav);
        }
        UgovorMaterijalStav result = ugovorMaterijalStavRepository.save(ugovorMaterijalStav);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ugovorMaterijalStav.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ugovor-materijal-stavs : get all the ugovorMaterijalStavs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ugovorMaterijalStavs in body
     */
    @GetMapping("/ugovor-materijal-stavs")
    @Timed
    public ResponseEntity<List<UgovorMaterijalStav>> getAllUgovorMaterijalStavs(Pageable pageable) {
        log.debug("REST request to get a page of UgovorMaterijalStavs");
        Page<UgovorMaterijalStav> page = ugovorMaterijalStavRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ugovor-materijal-stavs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /ugovor-materijal-stavs/:id : get the "id" ugovorMaterijalStav.
     *
     * @param id the id of the ugovorMaterijalStav to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ugovorMaterijalStav, or with status 404 (Not Found)
     */
    @GetMapping("/ugovor-materijal-stavs/{id}")
    @Timed
    public ResponseEntity<UgovorMaterijalStav> getUgovorMaterijalStav(@PathVariable Long id) {
        log.debug("REST request to get UgovorMaterijalStav : {}", id);
        UgovorMaterijalStav ugovorMaterijalStav = ugovorMaterijalStavRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ugovorMaterijalStav));
    }

    /**
     * DELETE  /ugovor-materijal-stavs/:id : delete the "id" ugovorMaterijalStav.
     *
     * @param id the id of the ugovorMaterijalStav to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ugovor-materijal-stavs/{id}")
    @Timed
    public ResponseEntity<Void> deleteUgovorMaterijalStav(@PathVariable Long id) {
        log.debug("REST request to delete UgovorMaterijalStav : {}", id);
        ugovorMaterijalStavRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
