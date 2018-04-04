package com.vr.rasveta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vr.rasveta.domain.Stub;

import com.vr.rasveta.repository.StubRepository;
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
 * REST controller for managing Stub.
 */
@RestController
@RequestMapping("/api")
public class StubResource {

    private final Logger log = LoggerFactory.getLogger(StubResource.class);

    private static final String ENTITY_NAME = "stub";

    private final StubRepository stubRepository;

    public StubResource(StubRepository stubRepository) {
        this.stubRepository = stubRepository;
    }

    /**
     * POST  /stubs : Create a new stub.
     *
     * @param stub the stub to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stub, or with status 400 (Bad Request) if the stub has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stubs")
    @Timed
    public ResponseEntity<Stub> createStub(@RequestBody Stub stub) throws URISyntaxException {
        log.debug("REST request to save Stub : {}", stub);
        if (stub.getId() != null) {
            throw new BadRequestAlertException("A new stub cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Stub result = stubRepository.save(stub);
        return ResponseEntity.created(new URI("/api/stubs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stubs : Updates an existing stub.
     *
     * @param stub the stub to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stub,
     * or with status 400 (Bad Request) if the stub is not valid,
     * or with status 500 (Internal Server Error) if the stub couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stubs")
    @Timed
    public ResponseEntity<Stub> updateStub(@RequestBody Stub stub) throws URISyntaxException {
        log.debug("REST request to update Stub : {}", stub);
        if (stub.getId() == null) {
            return createStub(stub);
        }
        Stub result = stubRepository.save(stub);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stub.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stubs : get all the stubs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stubs in body
     */
    @GetMapping("/stubs")
    @Timed
    public ResponseEntity<List<Stub>> getAllStubs(Pageable pageable) {
        log.debug("REST request to get a page of Stubs");
        Page<Stub> page = stubRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stubs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /stubs/:id : get the "id" stub.
     *
     * @param id the id of the stub to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stub, or with status 404 (Not Found)
     */
    @GetMapping("/stubs/{id}")
    @Timed
    public ResponseEntity<Stub> getStub(@PathVariable Long id) {
        log.debug("REST request to get Stub : {}", id);
        Stub stub = stubRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stub));
    }

    /**
     * DELETE  /stubs/:id : delete the "id" stub.
     *
     * @param id the id of the stub to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stubs/{id}")
    @Timed
    public ResponseEntity<Void> deleteStub(@PathVariable Long id) {
        log.debug("REST request to delete Stub : {}", id);
        stubRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
