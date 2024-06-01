package lk.leon.app.loggingsightingapp.api;

import lk.leon.app.loggingsightingapp.entity.LoggingSighting;
import lk.leon.app.loggingsightingapp.service.LoggingSightingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("api/v1/sightings")
@Validated
@RequiredArgsConstructor
public class LoggingSightingController {

    private final LoggingSightingService loggingSightingService;

    @GetMapping
    public List<LoggingSighting> getAllSightings() {
        return loggingSightingService.findAll();
    }
    @GetMapping("/search")
    public List<LoggingSighting> getSearchSightings(@RequestParam(required = false) String searchquery) {
        return loggingSightingService.getSearchSightings(searchquery);
    }
    @GetMapping("/{id}")
    public ResponseEntity<LoggingSighting> getSightingById(@PathVariable Long id) {
        Optional<LoggingSighting> sighting = loggingSightingService.findById(id);
        return sighting.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create-sightings")
    public LoggingSighting createSighting(@Valid @RequestBody LoggingSighting sighting) {
//        sighting.setCreatedDate(sighting.getCreatedDate());
        return loggingSightingService.save(sighting);
    }

    @PutMapping()
    public ResponseEntity<LoggingSighting> updateSighting(@Valid @RequestBody LoggingSighting sighting) {
        System.out.println(sighting.getCreatedDate());
        if (!loggingSightingService.findById(sighting.getId()).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        sighting.setId(sighting.getId());
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
