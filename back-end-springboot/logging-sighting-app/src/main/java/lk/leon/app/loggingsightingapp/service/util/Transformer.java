package lk.leon.app.loggingsightingapp.service.util;

import lk.leon.app.loggingsightingapp.entity.LoggingSighting;
import lk.leon.app.loggingsightingapp.service.Dto.LoggingSightingReqTo;
import lk.leon.app.loggingsightingapp.service.Dto.LoggingSightingTo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class Transformer {

    private final ModelMapper modelMapper;

    public Transformer(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;

        modelMapper.typeMap(String.class, MultipartFile.class).setConverter(ctc -> null);
    }

    public LoggingSighting fromLoggingSightingReqTo(LoggingSightingReqTo loggingSightingReqTo){
        LoggingSighting loggingSighting = modelMapper.map(loggingSightingReqTo, LoggingSighting.class);
        loggingSighting.setImagePath(null);
        return loggingSighting;
    }

    public LoggingSightingTo tologgingSightingTo(LoggingSighting LoggingSighting){
        LoggingSightingTo loggingSightingTo = modelMapper.map(LoggingSighting, LoggingSightingTo.class);
        return loggingSightingTo;
    }
}
