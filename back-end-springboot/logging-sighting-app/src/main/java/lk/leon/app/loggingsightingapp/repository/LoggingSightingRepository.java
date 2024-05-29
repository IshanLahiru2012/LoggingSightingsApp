package lk.leon.app.loggingsightingapp.repository;

import lk.leon.app.loggingsightingapp.entity.LoggingSighting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoggingSightingRepository extends JpaRepository<LoggingSighting, Long> {

}
