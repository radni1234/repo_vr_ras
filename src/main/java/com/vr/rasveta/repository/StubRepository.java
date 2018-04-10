package com.vr.rasveta.repository;

import com.vr.rasveta.domain.Stub;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import org.springframework.data.repository.query.Param;
import java.util.List;


/**
 * Spring Data JPA repository for the Stub entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StubRepository extends JpaRepository<Stub, Long> {
    @Query("SELECT s FROM Stub s where s.lonD >= :lon_od and s.lonD <= :lon_do and s.latD >= :lat_od and s.latD <= :lat_do")
    List<Stub> findStubByLonLat(@Param("lon_od") Double lon_od,@Param("lon_do") Double lon_do,
                                             @Param("lat_od") Double lat_od,@Param("lat_do") Double lat_do);
}
