package lk.leon.app.loggingsightingapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "sighting")
public class LoggingSighting implements Super{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @ManyToOne
    @JoinColumn(name = "created_user_id", referencedColumnName = "id")
    private User createdUser;
    @ManyToOne
    @JoinColumn(name = "modified_user_id",referencedColumnName = "id")
    private User modifiedUser;
}
