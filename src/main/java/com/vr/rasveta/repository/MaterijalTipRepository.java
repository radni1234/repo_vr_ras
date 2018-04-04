package com.vr.rasveta.repository;

import com.vr.rasveta.domain.MaterijalTip;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MaterijalTip entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaterijalTipRepository extends JpaRepository<MaterijalTip, Long> {

}
