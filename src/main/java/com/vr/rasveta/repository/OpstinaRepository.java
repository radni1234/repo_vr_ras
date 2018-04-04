package com.vr.rasveta.repository;

import com.vr.rasveta.domain.Opstina;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Opstina entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OpstinaRepository extends JpaRepository<Opstina, Long> {

}
