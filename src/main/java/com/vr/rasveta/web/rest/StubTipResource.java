package com.vr.rasveta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vr.rasveta.domain.StubTip;

import com.vr.rasveta.repository.StubTipRepository;
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
 * REST controller for managing StubTip.
 */
@RestController
@RequestMapping("/api")
public class StubTipResource {

    private final Logger log = LoggerFactory.getLogger(StubTipResource.class);

    private static final String ENTITY_NAME = "stubTip";

    private final StubTipRepository stubTipRepository;

    public StubTipResource(StubTipRepository stubTipRepository) {
        this.stubTipRepository = stubTipRepository;
    }

    /**
     * POST  /stub-tips : Create a new stubTip.
     *
     * @param stubTip the stubTip to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stubTip, or with status 400 (Bad Request) if the stubTip has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stub-tips")
    @Timed
    public ResponseEntity<StubTip> createStubTip(@RequestBody StubTip stubTip) throws URISyntaxException {
        log.debug("REST request to save StubTip : {}", stubTip);
        if (stubTip.getId() != null) {
            throw new BadRequestAlertException("A new stubTip cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StubTip result = stubTipRepository.save(stubTip);
        return ResponseEntity.created(new URI("/api/stub-tips/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stub-tips : Updates an existing stubTip.
     *
     * @param stubTip the stubTip to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stubTip,
     * or with status 400 (Bad Request) if the stubTip is not valid,
     * or with status 500 (Internal Server Error) if the stubTip couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stub-tips")
    @Timed
    public ResponseEntity<StubTip> updateStubTip(@RequestBody StubTip stubTip) throws URISyntaxException {
        log.debug("REST request to update StubTip : {}", stubTip);
        if (stubTip.getId() == null) {
            return createStubTip(stubTip);
        }
        StubTip result = stubTipRepository.save(stubTip);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stubTip.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stub-tips : get all the stubTips.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stubTips in body
     */
    @GetMapping("/stub-tips")
    @Timed
    public ResponseEntity<List<StubTip>> getAllStubTips(Pageable pageable) {
        log.debug("REST request to get a page of StubTips");
        Page<StubTip> page = stubTipRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stub-tips");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /stub-tips/:id : get the "id" stubTip.
     *
     * @param id the id of the stubTip to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stubTip, or with status 404 (Not Found)
     */
    @GetMapping("/stub-tips/{id}")
    @Timed
    public ResponseEntity<StubTip> getStubTip(@PathVariable Long id) {
        log.debug("REST request to get StubTip : {}", id);
        StubTip stubTip = stubTipRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stubTip));
    }

    /**
     * DELETE  /stub-tips/:id : delete the "id" stubTip.
     *
     * @param id the id of the stubTip to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stub-tips/{id}")
    @Timed
    public ResponseEntity<Void> deleteStubTip(@PathVariable Long id) {
        log.debug("REST request to delete StubTip : {}", id);
        stubTipRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
