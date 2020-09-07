package io.sunny.rdf.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.github.reinert.jjschema.JsonSchemaGenerator;
import com.github.reinert.jjschema.SchemaGeneratorBuilder;
import com.github.reinert.jjschema.exception.TypeException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.sunny.rdf.pojo.Employee;

@RestController
@RequestMapping("/api")
public class PojoController {

	private static ObjectMapper mapper = new ObjectMapper();
    public static final String JSON_$SCHEMA_DRAFT4_VALUE = "http://json-schema.org/draft-04/schema#";
    public static final String JSON_$SCHEMA_ELEMENT = "$schema";
    
    static {
        // required for pretty printing
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
	}

    @GetMapping(value="/employees", produces = "application/json")
    public String getEmployeePojo() throws JsonProcessingException, TypeException
    {
        // JsonSchemaFactory schemaFactory = new JsonSchemaV4Factory();
        // schemaFactory.setAutoPutDollarSchema(true);
        
        // JsonNode schemaNode = schemaFactory.createSchema(Employee.class);

        // get the draft 4 schema builder
        JsonSchemaGenerator v4generator = SchemaGeneratorBuilder.draftV4Schema().sortProperties(false).build();
        
        // use the schema builder to generate JSON schema from Java class
        JsonNode schemaNode = v4generator.generateSchema(Employee.class);
        
        // add the $schema node to the schema. By default, JJSchema v0.6 does not add it 
        ((ObjectNode) schemaNode).put(JSON_$SCHEMA_ELEMENT, JSON_$SCHEMA_DRAFT4_VALUE);
        
        // print the generated schema 
        return prettyPrintSchema(schemaNode);
    }

    @PostMapping(value="/employees", consumes = "application/json", produces = "application/json")
    public Employee postEmployeePojo(@RequestBody Employee employee)
    {
        return employee;
    }
    
    private String prettyPrintSchema(JsonNode schema) throws JsonProcessingException{
        return mapper.writeValueAsString(schema);
    }
}
