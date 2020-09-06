package io.sunny.rdf.pojo;
import java.util.List;
 
import com.github.reinert.jjschema.Attributes;

import lombok.Data;
 
@Data
@Attributes(title = "Employee", description = "Schema for an employee")
public class Employee {
    @Attributes(required = true, description = "ID of the employee")
    private int id;
 
    @Attributes(required = true, minLength = 1, maxLength = 15, description = "First name of the employee")
    private String firstName;
 
    @Attributes(required = true, minLength = 1, maxLength = 15, description = "Last name of the employee")
    private String lastName;
 
    @Attributes(required = true, description = "Age in years of the employee")
    private int age;
 
    @Attributes(required = true, description = "Gender of the employee")
    private Gender gender;
 
    @Attributes(required = true, minItems = 1, maxItems = 3, minLength = 1, maxLength = 30, description = "Address lines of the employee")
    private List<String> address;
    // @Attributes(required = true, minLength = 1, maxLength = 30, description = "Address lines of the employee")
    // private String address;
}

enum Gender
{
    MALE,FEMALE
}