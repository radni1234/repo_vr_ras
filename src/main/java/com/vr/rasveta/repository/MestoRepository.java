package com.vr.rasveta.repository;

import com.vr.rasveta.domain.Mesto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Mesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MestoRepository extends JpaRepository<Mesto, Long> {

}
