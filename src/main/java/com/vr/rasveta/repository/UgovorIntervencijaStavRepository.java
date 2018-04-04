package com.vr.rasveta.repository;

import com.vr.rasveta.domain.UgovorIntervencijaStav;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UgovorIntervencijaStav entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UgovorIntervencijaStavRepository extends JpaRepository<UgovorIntervencijaStav, Long> {

}
