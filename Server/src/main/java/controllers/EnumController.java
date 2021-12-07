package controllers;

import model.IssueType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class EnumController {
    @GetMapping(value = "/issue-types")
    public ResponseEntity<IssueType[]> getIssueTypes() {
        return new ResponseEntity<>(IssueType.values(), HttpStatus.OK);
    }
}
