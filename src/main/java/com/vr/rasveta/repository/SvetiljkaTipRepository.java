package com.vr.rasveta.repository;

import com.vr.rasveta.domain.SvetiljkaTip;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SvetiljkaTip entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SvetiljkaTipRepository extends JpaRepository<SvetiljkaTip, Long> {

}
