package lk.leon.app.loggingsightingapp.service.Dto;

import lk.leon.app.loggingsightingapp.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoggingSightingTo implements Serializable {

    private Long id;
    @Size(max = 150)
    private  String name;
    @Size(max = 5)
    private  String shortName;
    @Pattern(regexp = "^[A-Z]{3}-\\d{4}$")
    private String airlineCode;
    @Size(max = 200)
    private String location;
    @PastOrPresent
    private Date createdDate;
    private boolean active = true;
    private boolean deleted = false;
    private String imageUrl;
    @ManyToOne
    @JoinColumn(name = "created_user_id", referencedColumnName = "id")
    private User createdUser;
    @ManyToOne
    @JoinColumn(name = "modified_user_id",referencedColumnName = "id")
    private User modifiedUser;
}
