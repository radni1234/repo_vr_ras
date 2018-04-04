package com.vr.rasveta.repository;

import com.vr.rasveta.domain.UgovorIntervencija;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UgovorIntervencija entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UgovorIntervencijaRepository extends JpaRepository<UgovorIntervencija, Long> {

}
