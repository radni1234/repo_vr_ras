package com.vr.rasveta.repository;

import com.vr.rasveta.domain.IntervencijaTip;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the IntervencijaTip entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IntervencijaTipRepository extends JpaRepository<IntervencijaTip, Long> {

}
