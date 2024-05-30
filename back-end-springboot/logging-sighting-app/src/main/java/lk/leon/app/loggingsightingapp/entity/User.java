package lk.leon.app.loggingsightingapp.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(max = 150)
    private String name;
    @Size(max = 100)
    private String email;

    @ToString.Exclude
    @OneToMany(mappedBy = "createdUser")
    private Set<LoggingSighting> createdSightings;
    @ToString.Exclude
    @OneToMany(mappedBy = "modifiedUser")
    private Set<LoggingSighting> modifiedSightings;
}
