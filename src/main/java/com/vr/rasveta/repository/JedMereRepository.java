package com.vr.rasveta.repository;

import com.vr.rasveta.domain.JedMere;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the JedMere entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JedMereRepository extends JpaRepository<JedMere, Long> {

}
