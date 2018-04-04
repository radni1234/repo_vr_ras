package com.vr.rasveta.repository;

import com.vr.rasveta.domain.Stub;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Stub entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StubRepository extends JpaRepository<Stub, Long> {

}
