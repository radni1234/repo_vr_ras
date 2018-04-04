package com.vr.rasveta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vr.rasveta.domain.Opstina;

import com.vr.rasveta.repository.OpstinaRepository;
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
 * REST controller for managing Opstina.
 */
@RestController
@RequestMapping("/api")
public class OpstinaResource {

    private final Logger log = LoggerFactory.getLogger(OpstinaResource.class);

    private static final String ENTITY_NAME = "opstina";

    private final OpstinaRepository opstinaRepository;

    public OpstinaResource(OpstinaRepository opstinaRepository) {
        this.opstinaRepository = opstinaRepository;
    }

    /**
     * POST  /opstinas : Create a new opstina.
     *
     * @param opstina the opstina to create
     * @return the ResponseEntity with status 201 (Created) and with body the new opstina, or with status 400 (Bad Request) if the opstina has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/opstinas")
    @Timed
    public ResponseEntity<Opstina> createOpstina(@RequestBody Opstina opstina) throws URISyntaxException {
        log.debug("REST request to save Opstina : {}", opstina);
        if (opstina.getId() != null) {
            throw new BadRequestAlertException("A new opstina cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Opstina result = opstinaRepository.save(opstina);
        return ResponseEntity.created(new URI("/api/opstinas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /opstinas : Updates an existing opstina.
     *
     * @param opstina the opstina to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated opstina,
     * or with status 400 (Bad Request) if the opstina is not valid,
     * or with status 500 (Internal Server Error) if the opstina couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/opstinas")
    @Timed
    public ResponseEntity<Opstina> updateOpstina(@RequestBody Opstina opstina) throws URISyntaxException {
        log.debug("REST request to update Opstina : {}", opstina);
        if (opstina.getId() == null) {
            return createOpstina(opstina);
        }
        Opstina result = opstinaRepository.save(opstina);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, opstina.getId().toString()))
            .body(result);
    }

    /**
     * GET  /opstinas : get all the opstinas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of opstinas in body
     */
    @GetMapping("/opstinas")
    @Timed
    public ResponseEntity<List<Opstina>> getAllOpstinas(Pageable pageable) {
        log.debug("REST request to get a page of Opstinas");
        Page<Opstina> page = opstinaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/opstinas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /opstinas/:id : get the "id" opstina.
     *
     * @param id the id of the opstina to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the opstina, or with status 404 (Not Found)
     */
    @GetMapping("/opstinas/{id}")
    @Timed
    public ResponseEntity<Opstina> getOpstina(@PathVariable Long id) {
        log.debug("REST request to get Opstina : {}", id);
        Opstina opstina = opstinaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(opstina));
    }

    /**
     * DELETE  /opstinas/:id : delete the "id" opstina.
     *
     * @param id the id of the opstina to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/opstinas/{id}")
    @Timed
    public ResponseEntity<Void> deleteOpstina(@PathVariable Long id) {
        log.debug("REST request to delete Opstina : {}", id);
        opstinaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
