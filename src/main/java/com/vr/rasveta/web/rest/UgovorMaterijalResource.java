package com.vr.rasveta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vr.rasveta.domain.UgovorMaterijal;

import com.vr.rasveta.repository.UgovorMaterijalRepository;
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
 * REST controller for managing UgovorMaterijal.
 */
@RestController
@RequestMapping("/api")
public class UgovorMaterijalResource {

    private final Logger log = LoggerFactory.getLogger(UgovorMaterijalResource.class);

    private static final String ENTITY_NAME = "ugovorMaterijal";

    private final UgovorMaterijalRepository ugovorMaterijalRepository;

    public UgovorMaterijalResource(UgovorMaterijalRepository ugovorMaterijalRepository) {
        this.ugovorMaterijalRepository = ugovorMaterijalRepository;
    }

    /**
     * POST  /ugovor-materijals : Create a new ugovorMaterijal.
     *
     * @param ugovorMaterijal the ugovorMaterijal to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ugovorMaterijal, or with status 400 (Bad Request) if the ugovorMaterijal has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ugovor-materijals")
    @Timed
    public ResponseEntity<UgovorMaterijal> createUgovorMaterijal(@RequestBody UgovorMaterijal ugovorMaterijal) throws URISyntaxException {
        log.debug("REST request to save UgovorMaterijal : {}", ugovorMaterijal);
        if (ugovorMaterijal.getId() != null) {
            throw new BadRequestAlertException("A new ugovorMaterijal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UgovorMaterijal result = ugovorMaterijalRepository.save(ugovorMaterijal);
        return ResponseEntity.created(new URI("/api/ugovor-materijals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ugovor-materijals : Updates an existing ugovorMaterijal.
     *
     * @param ugovorMaterijal the ugovorMaterijal to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ugovorMaterijal,
     * or with status 400 (Bad Request) if the ugovorMaterijal is not valid,
     * or with status 500 (Internal Server Error) if the ugovorMaterijal couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ugovor-materijals")
    @Timed
    public ResponseEntity<UgovorMaterijal> updateUgovorMaterijal(@RequestBody UgovorMaterijal ugovorMaterijal) throws URISyntaxException {
        log.debug("REST request to update UgovorMaterijal : {}", ugovorMaterijal);
        if (ugovorMaterijal.getId() == null) {
            return createUgovorMaterijal(ugovorMaterijal);
        }
        UgovorMaterijal result = ugovorMaterijalRepository.save(ugovorMaterijal);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ugovorMaterijal.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ugovor-materijals : get all the ugovorMaterijals.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ugovorMaterijals in body
     */
    @GetMapping("/ugovor-materijals")
    @Timed
    public ResponseEntity<List<UgovorMaterijal>> getAllUgovorMaterijals(Pageable pageable) {
        log.debug("REST request to get a page of UgovorMaterijals");
        Page<UgovorMaterijal> page = ugovorMaterijalRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ugovor-materijals");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /ugovor-materijals/:id : get the "id" ugovorMaterijal.
     *
     * @param id the id of the ugovorMaterijal to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ugovorMaterijal, or with status 404 (Not Found)
     */
    @GetMapping("/ugovor-materijals/{id}")
    @Timed
    public ResponseEntity<UgovorMaterijal> getUgovorMaterijal(@PathVariable Long id) {
        log.debug("REST request to get UgovorMaterijal : {}", id);
        UgovorMaterijal ugovorMaterijal = ugovorMaterijalRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ugovorMaterijal));
    }

    /**
     * DELETE  /ugovor-materijals/:id : delete the "id" ugovorMaterijal.
     *
     * @param id the id of the ugovorMaterijal to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ugovor-materijals/{id}")
    @Timed
    public ResponseEntity<Void> deleteUgovorMaterijal(@PathVariable Long id) {
        log.debug("REST request to delete UgovorMaterijal : {}", id);
        ugovorMaterijalRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
