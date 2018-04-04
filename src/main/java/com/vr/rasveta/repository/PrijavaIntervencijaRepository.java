package com.vr.rasveta.repository;

import com.vr.rasveta.domain.PrijavaIntervencija;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PrijavaIntervencija entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrijavaIntervencijaRepository extends JpaRepository<PrijavaIntervencija, Long> {

}
