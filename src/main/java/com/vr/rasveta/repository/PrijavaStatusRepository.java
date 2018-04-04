package com.vr.rasveta.repository;

import com.vr.rasveta.domain.PrijavaStatus;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PrijavaStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrijavaStatusRepository extends JpaRepository<PrijavaStatus, Long> {

}
