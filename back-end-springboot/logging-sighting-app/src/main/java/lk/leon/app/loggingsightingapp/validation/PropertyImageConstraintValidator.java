package lk.leon.app.loggingsightingapp.validation;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.List;

public class PropertyImageConstraintValidator implements ConstraintValidator<PropertyImage, MultipartFile> {

    private long maximumFileSize;
    @Override
    public void initialize(PropertyImage constraintAnnotation) {
        maximumFileSize = constraintAnnotation.maximumFileSize();
    }

    @Override
    public boolean isValid(MultipartFile multipartFile, ConstraintValidatorContext constraintValidatorContext) {
        if(multipartFile == null) {
            return true;
        }
        if (multipartFile.isEmpty()) {
            return true;
        }
        if(multipartFile.isEmpty()) return true;
        if(multipartFile.getContentType() == null || !multipartFile.getContentType().startsWith("image/")) return false;
        return multipartFile.getSize() <= maximumFileSize;
    }


}
