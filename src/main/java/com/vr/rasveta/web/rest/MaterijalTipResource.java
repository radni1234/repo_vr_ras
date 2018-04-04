package com.vr.rasveta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.vr.rasveta.domain.MaterijalTip;

import com.vr.rasveta.repository.MaterijalTipRepository;
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
 * REST controller for managing MaterijalTip.
 */
@RestController
@RequestMapping("/api")
public class MaterijalTipResource {

    private final Logger log = LoggerFactory.getLogger(MaterijalTipResource.class);

    private static final String ENTITY_NAME = "materijalTip";

    private final MaterijalTipRepository materijalTipRepository;

    public MaterijalTipResource(MaterijalTipRepository materijalTipRepository) {
        this.materijalTipRepository = materijalTipRepository;
    }

    /**
     * POST  /materijal-tips : Create a new materijalTip.
     *
     * @param materijalTip the materijalTip to create
     * @return the ResponseEntity with status 201 (Created) and with body the new materijalTip, or with status 400 (Bad Request) if the materijalTip has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/materijal-tips")
    @Timed
    public ResponseEntity<MaterijalTip> createMaterijalTip(@RequestBody MaterijalTip materijalTip) throws URISyntaxException {
        log.debug("REST request to save MaterijalTip : {}", materijalTip);
        if (materijalTip.getId() != null) {
            throw new BadRequestAlertException("A new materijalTip cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MaterijalTip result = materijalTipRepository.save(materijalTip);
        return ResponseEntity.created(new URI("/api/materijal-tips/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /materijal-tips : Updates an existing materijalTip.
     *
     * @param materijalTip the materijalTip to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated materijalTip,
     * or with status 400 (Bad Request) if the materijalTip is not valid,
     * or with status 500 (Internal Server Error) if the materijalTip couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/materijal-tips")
    @Timed
    public ResponseEntity<MaterijalTip> updateMaterijalTip(@RequestBody MaterijalTip materijalTip) throws URISyntaxException {
        log.debug("REST request to update MaterijalTip : {}", materijalTip);
        if (materijalTip.getId() == null) {
            return createMaterijalTip(materijalTip);
        }
        MaterijalTip result = materijalTipRepository.save(materijalTip);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, materijalTip.getId().toString()))
            .body(result);
    }

    /**
     * GET  /materijal-tips : get all the materijalTips.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of materijalTips in body
     */
    @GetMapping("/materijal-tips")
    @Timed
    public ResponseEntity<List<MaterijalTip>> getAllMaterijalTips(Pageable pageable) {
        log.debug("REST request to get a page of MaterijalTips");
        Page<MaterijalTip> page = materijalTipRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/materijal-tips");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /materijal-tips/:id : get the "id" materijalTip.
     *
     * @param id the id of the materijalTip to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the materijalTip, or with status 404 (Not Found)
     */
    @GetMapping("/materijal-tips/{id}")
    @Timed
    public ResponseEntity<MaterijalTip> getMaterijalTip(@PathVariable Long id) {
        log.debug("REST request to get MaterijalTip : {}", id);
        MaterijalTip materijalTip = materijalTipRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(materijalTip));
    }

    /**
     * DELETE  /materijal-tips/:id : delete the "id" materijalTip.
     *
     * @param id the id of the materijalTip to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/materijal-tips/{id}")
    @Timed
    public ResponseEntity<Void> deleteMaterijalTip(@PathVariable Long id) {
        log.debug("REST request to delete MaterijalTip : {}", id);
        materijalTipRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
