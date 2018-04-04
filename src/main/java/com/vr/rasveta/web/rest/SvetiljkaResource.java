package com.vr.rasveta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vr.rasveta.domain.Svetiljka;

import com.vr.rasveta.repository.SvetiljkaRepository;
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
 * REST controller for managing Svetiljka.
 */
@RestController
@RequestMapping("/api")
public class SvetiljkaResource {

    private final Logger log = LoggerFactory.getLogger(SvetiljkaResource.class);

    private static final String ENTITY_NAME = "svetiljka";

    private final SvetiljkaRepository svetiljkaRepository;

    public SvetiljkaResource(SvetiljkaRepository svetiljkaRepository) {
        this.svetiljkaRepository = svetiljkaRepository;
    }

    /**
     * POST  /svetiljkas : Create a new svetiljka.
     *
     * @param svetiljka the svetiljka to create
     * @return the ResponseEntity with status 201 (Created) and with body the new svetiljka, or with status 400 (Bad Request) if the svetiljka has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/svetiljkas")
    @Timed
    public ResponseEntity<Svetiljka> createSvetiljka(@RequestBody Svetiljka svetiljka) throws URISyntaxException {
        log.debug("REST request to save Svetiljka : {}", svetiljka);
        if (svetiljka.getId() != null) {
            throw new BadRequestAlertException("A new svetiljka cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Svetiljka result = svetiljkaRepository.save(svetiljka);
        return ResponseEntity.created(new URI("/api/svetiljkas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /svetiljkas : Updates an existing svetiljka.
     *
     * @param svetiljka the svetiljka to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated svetiljka,
     * or with status 400 (Bad Request) if the svetiljka is not valid,
     * or with status 500 (Internal Server Error) if the svetiljka couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/svetiljkas")
    @Timed
    public ResponseEntity<Svetiljka> updateSvetiljka(@RequestBody Svetiljka svetiljka) throws URISyntaxException {
        log.debug("REST request to update Svetiljka : {}", svetiljka);
        if (svetiljka.getId() == null) {
            return createSvetiljka(svetiljka);
        }
        Svetiljka result = svetiljkaRepository.save(svetiljka);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, svetiljka.getId().toString()))
            .body(result);
    }

    /**
     * GET  /svetiljkas : get all the svetiljkas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of svetiljkas in body
     */
    @GetMapping("/svetiljkas")
    @Timed
    public ResponseEntity<List<Svetiljka>> getAllSvetiljkas(Pageable pageable) {
        log.debug("REST request to get a page of Svetiljkas");
        Page<Svetiljka> page = svetiljkaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/svetiljkas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /svetiljkas/:id : get the "id" svetiljka.
     *
     * @param id the id of the svetiljka to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the svetiljka, or with status 404 (Not Found)
     */
    @GetMapping("/svetiljkas/{id}")
    @Timed
    public ResponseEntity<Svetiljka> getSvetiljka(@PathVariable Long id) {
        log.debug("REST request to get Svetiljka : {}", id);
        Svetiljka svetiljka = svetiljkaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(svetiljka));
    }

    /**
     * DELETE  /svetiljkas/:id : delete the "id" svetiljka.
     *
     * @param id the id of the svetiljka to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/svetiljkas/{id}")
    @Timed
    public ResponseEntity<Void> deleteSvetiljka(@PathVariable Long id) {
        log.debug("REST request to delete Svetiljka : {}", id);
        svetiljkaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
