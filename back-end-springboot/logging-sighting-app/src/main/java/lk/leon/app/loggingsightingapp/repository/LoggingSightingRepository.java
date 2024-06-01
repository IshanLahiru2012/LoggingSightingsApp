package lk.leon.app.loggingsightingapp.repository;

import lk.leon.app.loggingsightingapp.entity.LoggingSighting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoggingSightingRepository extends JpaRepository<LoggingSighting, Long> {

    @Query("SELECT ls FROM LoggingSighting ls WHERE " +
            "LOWER(ls.name) LIKE LOWER(CONCAT('%', :name, '%')) OR " +
            "LOWER(ls.shortName) LIKE LOWER(CONCAT('%', :shortName, '%')) OR " +
            "LOWER(ls.airlineCode) LIKE LOWER(CONCAT('%', :airlineCode, '%'))")
    List<LoggingSighting> findByAnyCriteria(String name,String shortName,String airlineCode);


}
