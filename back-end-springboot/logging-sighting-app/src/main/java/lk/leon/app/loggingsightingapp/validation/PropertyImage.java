package lk.leon.app.loggingsightingapp.validation;


import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PropertyImageConstraintValidator.class)
public @interface PropertyImage {
    long maximumFileSize() default 1024*1024*5 ;
    String message() default "Invalid image file or exceeds the maximum file size {maximumFileSize} kb";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
