package controllers;

import dtos.UserDto;
import exceptions.UserNotFoundException;
import model.User;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.Service;

@RestController
@CrossOrigin
@RequestMapping(value = "users")
public class UserController {
    private final Service service;

    {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath:spring.xml");
        service = context.getBean(Service.class);
    }

    /**
     * Handler responsible for creating new accounts
     *
     * @param user: User, the details of the user
     * @return - a response containing the user with an assigned id, if there are no errors
     * - the error message, otherwise
     */
    @PostMapping
    public ResponseEntity<?> createAccount(@RequestBody User user) {
        try {
            User result = service.createAccount(user);
            return new ResponseEntity<>(UserDto.from(result), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Invalid data", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Handler responsible for retrieving the information of a user, based on their username
     * @param username, the username of the desired user
     * @return  - a response containing the user, if there is a user with the given username
     *          - a 404 Not Found, otherwise
     */
    @GetMapping
    public ResponseEntity<?> getUser(@RequestParam(value = "username") String username) {
        try {
            User user = service.login(username);
            return new ResponseEntity<>(UserDto.from(user), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        }
    }
}
