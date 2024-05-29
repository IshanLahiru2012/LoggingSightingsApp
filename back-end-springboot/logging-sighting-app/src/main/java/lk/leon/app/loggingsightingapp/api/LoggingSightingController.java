package lk.leon.app.loggingsightingapp.api;

import lk.leon.app.loggingsightingapp.entity.LoggingSighting;
import lk.leon.app.loggingsightingapp.service.LoggingSightingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/loggingsightings")
@Validated
@RequiredArgsConstructor
public class LoggingSightingController {

    private final LoggingSightingService loggingSightingService;

    @GetMapping
    public List<LoggingSighting> getAllSightings() {
        return loggingSightingService.findAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<LoggingSighting> getSightingById(@PathVariable Long id) {
        Optional<LoggingSighting> sighting = loggingSightingService.findById(id);
        return sighting.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public LoggingSighting createSighting(@Valid @RequestBody LoggingSighting sighting) {
        return loggingSightingService.save(sighting);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoggingSighting> updateSighting(@PathVariable Long id, @Valid @RequestBody LoggingSighting sighting) {
        if (!loggingSightingService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        sighting.setId(id);
        return ResponseEntity.ok(loggingSightingService.save(sighting));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSighting(@PathVariable Long id) {
        if (!loggingSightingService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        loggingSightingService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
