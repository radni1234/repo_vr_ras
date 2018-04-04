package com.vr.rasveta.repository;

import com.vr.rasveta.domain.UgovorMaterijal;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UgovorMaterijal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UgovorMaterijalRepository extends JpaRepository<UgovorMaterijal, Long> {

}
