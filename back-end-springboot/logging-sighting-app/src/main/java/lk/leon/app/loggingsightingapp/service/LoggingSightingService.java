package lk.leon.app.loggingsightingapp.service;

import lk.leon.app.loggingsightingapp.entity.LoggingSighting;
import lk.leon.app.loggingsightingapp.repository.LoggingSightingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoggingSightingService {

    private final LoggingSightingRepository loggingSightingRepository;

    public List<LoggingSighting> findAll(){
        return loggingSightingRepository.findAll();
    }

    public Optional<LoggingSighting> findById(Long id){
        return loggingSightingRepository.findById(id);
    }
    public LoggingSighting save(LoggingSighting loggingSighting) {
        return loggingSightingRepository.save(loggingSighting);
    }
    public void deleteById(Long id) {
        loggingSightingRepository.deleteById(id);
    }

}
