package com.vr.rasveta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vr.rasveta.domain.JedMere;

import com.vr.rasveta.repository.JedMereRepository;
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
 * REST controller for managing JedMere.
 */
@RestController
@RequestMapping("/api")
public class JedMereResource {

    private final Logger log = LoggerFactory.getLogger(JedMereResource.class);

    private static final String ENTITY_NAME = "jedMere";

    private final JedMereRepository jedMereRepository;

    public JedMereResource(JedMereRepository jedMereRepository) {
        this.jedMereRepository = jedMereRepository;
    }

    /**
     * POST  /jed-meres : Create a new jedMere.
     *
     * @param jedMere the jedMere to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jedMere, or with status 400 (Bad Request) if the jedMere has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/jed-meres")
    @Timed
    public ResponseEntity<JedMere> createJedMere(@RequestBody JedMere jedMere) throws URISyntaxException {
        log.debug("REST request to save JedMere : {}", jedMere);
        if (jedMere.getId() != null) {
            throw new BadRequestAlertException("A new jedMere cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JedMere result = jedMereRepository.save(jedMere);
        return ResponseEntity.created(new URI("/api/jed-meres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jed-meres : Updates an existing jedMere.
     *
     * @param jedMere the jedMere to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jedMere,
     * or with status 400 (Bad Request) if the jedMere is not valid,
     * or with status 500 (Internal Server Error) if the jedMere couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/jed-meres")
    @Timed
    public ResponseEntity<JedMere> updateJedMere(@RequestBody JedMere jedMere) throws URISyntaxException {
        log.debug("REST request to update JedMere : {}", jedMere);
        if (jedMere.getId() == null) {
            return createJedMere(jedMere);
        }
        JedMere result = jedMereRepository.save(jedMere);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jedMere.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jed-meres : get all the jedMeres.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of jedMeres in body
     */
    @GetMapping("/jed-meres")
    @Timed
    public ResponseEntity<List<JedMere>> getAllJedMeres(Pageable pageable) {
        log.debug("REST request to get a page of JedMeres");
        Page<JedMere> page = jedMereRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/jed-meres");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /jed-meres/:id : get the "id" jedMere.
     *
     * @param id the id of the jedMere to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jedMere, or with status 404 (Not Found)
     */
    @GetMapping("/jed-meres/{id}")
    @Timed
    public ResponseEntity<JedMere> getJedMere(@PathVariable Long id) {
        log.debug("REST request to get JedMere : {}", id);
        JedMere jedMere = jedMereRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(jedMere));
    }

    /**
     * DELETE  /jed-meres/:id : delete the "id" jedMere.
     *
     * @param id the id of the jedMere to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/jed-meres/{id}")
    @Timed
    public ResponseEntity<Void> deleteJedMere(@PathVariable Long id) {
        log.debug("REST request to delete JedMere : {}", id);
        jedMereRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
