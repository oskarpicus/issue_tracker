package controllers;

import model.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(value = "roles")
public class RoleController {

    @GetMapping
    public ResponseEntity<Role[]> getAllRoles() {
        return new ResponseEntity<>(Role.values(), HttpStatus.OK);
    }
}
