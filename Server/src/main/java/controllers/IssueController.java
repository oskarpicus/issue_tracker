package controllers;

import dtos.IssueDto;
import exceptions.UserNotFoundException;
import exceptions.UserNotInProjectException;
import model.Issue;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.Service;
import utils.requests.AddIssueRequest;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping(value = "/issues")
public class IssueController {
    private final Service service;

    {
        var context = new ClassPathXmlApplicationContext("classpath:spring.xml");
        service = context.getBean(Service.class);
    }

    @PostMapping
    public ResponseEntity<?> addIssue(@RequestBody AddIssueRequest request) {
        try {
            Issue result = service.addIssue(request.toIssue());
            if (result == null) {
                return new ResponseEntity<>("Failed to save issue", HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(IssueDto.from(result), HttpStatus.CREATED);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (UserNotInProjectException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAssignedIssues(@RequestParam(value = "assignee") String assigneeUsername) {
        try {
            List<Issue> issues = service.getAssignedIssues(assigneeUsername);
            List<IssueDto> result = issues.stream().map(IssueDto::from).collect(Collectors.toList());
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
