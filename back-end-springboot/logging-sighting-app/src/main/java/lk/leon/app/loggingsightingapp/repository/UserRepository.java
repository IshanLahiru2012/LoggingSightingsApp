package lk.leon.app.loggingsightingapp.repository;

import lk.leon.app.loggingsightingapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
}
