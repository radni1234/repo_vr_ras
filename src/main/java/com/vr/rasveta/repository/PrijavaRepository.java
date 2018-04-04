package com.vr.rasveta.repository;

import com.vr.rasveta.domain.Prijava;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Prijava entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrijavaRepository extends JpaRepository<Prijava, Long> {

}
