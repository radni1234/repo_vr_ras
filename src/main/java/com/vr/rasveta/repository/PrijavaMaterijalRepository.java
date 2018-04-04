package com.vr.rasveta.repository;

import com.vr.rasveta.domain.PrijavaMaterijal;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PrijavaMaterijal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrijavaMaterijalRepository extends JpaRepository<PrijavaMaterijal, Long> {

}
