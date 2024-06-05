package lk.leon.app.loggingsightingapp.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import lk.leon.app.loggingsightingapp.entity.LoggingSighting;
import lk.leon.app.loggingsightingapp.repository.LoggingSightingRepository;
import lk.leon.app.loggingsightingapp.service.Dto.LoggingSightingReqTo;
import lk.leon.app.loggingsightingapp.service.Dto.LoggingSightingTo;
import lk.leon.app.loggingsightingapp.service.util.Transformer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class LoggingSightingService {

    private final LoggingSightingRepository loggingSightingRepository;
    private final Transformer transformer;
    private final Bucket bucket;

    public List<LoggingSightingTo> findAll(){
        List<LoggingSighting> allSighting = loggingSightingRepository.findAll();
        return sightingsToListWithImageUrl(allSighting);
    }

    public List<LoggingSightingTo> getSearchSightings(String searchquery) {
        List<LoggingSighting> sightingList = loggingSightingRepository.findByAnyCriteria(searchquery, searchquery, searchquery);
        return sightingsToListWithImageUrl(sightingList);
    }

    public Optional<LoggingSightingTo> findById(Long id){
        Optional<LoggingSighting> loggingSightingOptional = loggingSightingRepository.findById(id);
        if(loggingSightingOptional.isPresent()){
            LoggingSighting loggingSighting = loggingSightingOptional.get();
            LoggingSightingTo loggingSightingTo = transformer.tologgingSightingTo(loggingSighting);
            Blob blob = bucket.get(loggingSighting.getImagePath());
            loggingSightingTo.setImageUrl(blob.signUrl(1,TimeUnit.DAYS, Storage.SignUrlOption.withV4Signature()).toString());

            return Optional.of(loggingSightingTo);
        }
        return Optional.empty();
    }

    public LoggingSightingTo createSighting(LoggingSightingReqTo sightingReq) {

        LoggingSighting loggingSighting = transformer.fromLoggingSightingReqTo(sightingReq);

        LoggingSighting savedSighting = loggingSightingRepository.save(loggingSighting);
        LoggingSightingTo loggingSightingTo = transformer.tologgingSightingTo(savedSighting);

        System.out.println(sightingReq.getImageFile());
        if(sightingReq.getImageFile() != null){
            savedSighting.setImagePath();
            String imageUrl = saveImage(loggingSighting.getId(),sightingReq.getImageFile());
            loggingSightingTo.setImageUrl(imageUrl);
        }
        return loggingSightingTo;

    }

    public LoggingSightingTo updateSighting(LoggingSightingReqTo sightingReq) {

        if(loggingSightingRepository.findById(sightingReq.getId()).get().getImagePath() != null){
            bucket.get("image/"+sightingReq.getId()).delete();
        }

        LoggingSighting loggingSighting = transformer.fromLoggingSightingReqTo(sightingReq);

        LoggingSighting savedSighting = loggingSightingRepository.save(loggingSighting);
        LoggingSightingTo loggingSightingTo = transformer.tologgingSightingTo(savedSighting);

        if(sightingReq.getImageFile() != null){
            savedSighting.setImagePath();
            String imageUrl = saveImage(loggingSighting.getId(),sightingReq.getImageFile());
//            savedSighting.setImagePath("image/"+savedSighting.getId());
            loggingSightingTo.setImageUrl(imageUrl);
        }
        return loggingSightingTo;

    }
    public void deleteSightingById(Long id) {
        Optional<LoggingSighting> loggingSighting = loggingSightingRepository.findById(id);
        bucket.get(loggingSighting.get().getImagePath()).delete();
        loggingSightingRepository.deleteById(id);
    }

    private String saveImage(long sightingId, MultipartFile imageFile){
        try {
            Blob blob = bucket.create("image/"+sightingId, imageFile.getInputStream(),imageFile.getContentType());
            return blob.signUrl(1, TimeUnit.DAYS, Storage.SignUrlOption.withV4Signature()).toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private List<LoggingSightingTo> sightingsToListWithImageUrl(List<LoggingSighting> loggingSightingList){
        List<LoggingSightingTo> SightingToList= loggingSightingList.stream().map(sighting ->{
            LoggingSightingTo loggingSightingTo = transformer.tologgingSightingTo(sighting);
            if(sighting.getImagePath() != null){
                Blob blob = bucket.get(sighting.getImagePath());
                loggingSightingTo.setImageUrl(blob.signUrl(1, TimeUnit.DAYS, Storage.SignUrlOption.withV4Signature()).toString());
            }
            return loggingSightingTo;
        }).collect(Collectors.toList());
        return SightingToList;
    }

}
