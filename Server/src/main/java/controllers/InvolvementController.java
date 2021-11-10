package controllers;

import dtos.InvolvementDTO;
import exceptions.UserNotFoundException;
import model.Involvement;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.Service;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping(value = "/involvements")
public class InvolvementController {
    private final Service service;

    {
        var context = new ClassPathXmlApplicationContext("classpath:spring.xml");
        service = context.getBean(Service.class);
    }

    @GetMapping
    public ResponseEntity<?> getInvolvementsByUsername(@RequestParam(value = "username") String username) {
        try {
            Set<Involvement> involvements = service.getInvolvementsByUsername(username);
            Set<InvolvementDTO> result = involvements
                    .stream()
                    .map(InvolvementDTO::new)
                    .collect(Collectors.toSet());
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
}
