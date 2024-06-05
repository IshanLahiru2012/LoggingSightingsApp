package lk.leon.app.loggingsightingapp.api;

import lk.leon.app.loggingsightingapp.service.Dto.LoggingSightingReqTo;
import lk.leon.app.loggingsightingapp.service.Dto.LoggingSightingTo;
import lk.leon.app.loggingsightingapp.service.LoggingSightingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
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
    public List<LoggingSightingTo> getAllSightings() {
        return loggingSightingService.findAll();
    }
    @GetMapping("/search")
    public List<LoggingSightingTo> getSearchSightings(@RequestParam(required = false) String searchquery) {
        return loggingSightingService.getSearchSightings(searchquery);
    }
    @GetMapping("/{id}")
    public ResponseEntity<LoggingSightingTo> getSightingById(@PathVariable Long id) {
        Optional<LoggingSightingTo> sighting = loggingSightingService.findById(id);
        return sighting.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = "/create-sightings", consumes = "multipart/form-data")
    public LoggingSightingTo createSighting(@ModelAttribute @Valid LoggingSightingReqTo sightingReq) {
        return loggingSightingService.createSighting(sightingReq);
    }

    @PutMapping(consumes = "multipart/form-data")
    public ResponseEntity<LoggingSightingTo> updateSighting(@ModelAttribute @Valid LoggingSightingReqTo sightingReq ,
                                                            @RequestParam(value = "imageFile", required = false)MultipartFile image) {

        if (!loggingSightingService.findById(sightingReq.getId()).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(loggingSightingService.updateSighting(sightingReq, image));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSighting(@PathVariable Long id) {
        if (!loggingSightingService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        loggingSightingService.deleteSightingById(id);
        return ResponseEntity.noContent().build();
    }





}
