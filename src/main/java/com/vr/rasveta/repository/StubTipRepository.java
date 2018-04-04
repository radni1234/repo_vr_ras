package com.vr.rasveta.repository;

import com.vr.rasveta.domain.StubTip;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the StubTip entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StubTipRepository extends JpaRepository<StubTip, Long> {

}
