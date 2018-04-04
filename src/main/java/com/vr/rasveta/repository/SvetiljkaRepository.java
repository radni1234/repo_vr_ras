package com.vr.rasveta.repository;

import com.vr.rasveta.domain.Svetiljka;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Svetiljka entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SvetiljkaRepository extends JpaRepository<Svetiljka, Long> {

}
