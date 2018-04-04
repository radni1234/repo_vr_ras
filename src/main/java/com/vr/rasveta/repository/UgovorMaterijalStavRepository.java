package com.vr.rasveta.repository;

import com.vr.rasveta.domain.UgovorMaterijalStav;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UgovorMaterijalStav entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UgovorMaterijalStavRepository extends JpaRepository<UgovorMaterijalStav, Long> {

}
