package mocks;

import model.*;

import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Stream;

public class Constants {
    public static final String USERNAME = "anne";
    public static final String EMAIL = "anne@gmail.com";
    public static final String PASSWORD = "anne_p";
    public static final User USER = new User(1L, USERNAME, PASSWORD, "Anne", "Victoria", EMAIL);
    public static final User OTHER_USER = new User(2L, "john", "pit", "John", "Pit", EMAIL);

    public static final Project PROJECT = new Project(1L, "title", "description", LocalDateTime.now());

    public static final Involvement INVOLVEMENT = new Involvement(Role.UX_DESIGNER, USER, PROJECT);
    public static final Involvement OTHER_INVOLVEMENT = new Involvement(Role.UX_DESIGNER, OTHER_USER, PROJECT);

    public static final Issue[] ISSUES = new Issue[]{
      new Issue("title1", "description1", Severity.BLOCKER, Status.TO_DO, IssueType.WONT_FIX, PROJECT, USER, OTHER_USER),
      new Issue("title2", "description2", Severity.TRIVIAL, Status.IN_PROGRESS, IssueType.DUPLICATE, PROJECT, USER, OTHER_USER),
    };

    static {
        OTHER_USER.getInvolvements().add(OTHER_INVOLVEMENT);
        PROJECT.getInvolvements().add(OTHER_INVOLVEMENT);

        AtomicLong atomicLong = new AtomicLong(1L);
        Stream.of(ISSUES).forEach(issue -> {
            issue.setId(atomicLong.getAndIncrement());

            if (issue.getAssignee() != null) {
                issue.getAssignee().getAssignedIssues().add(issue);
            }

            issue.getProject().getIssues().add(issue);
        });
    }
}
