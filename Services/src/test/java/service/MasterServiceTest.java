package service;

import exceptions.*;
import mocks.*;
import model.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import repository.InvolvementRepository;
import repository.IssueRepository;
import repository.ProjectRepository;
import repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

class MasterServiceTest {

    @TestFactory
    Stream<DynamicTest> createAccount() {
        record TestCase(String name, Service service, User user, Class<? extends Exception> exception) {
            public void check() {
                try {
                    TestCase.this.service.createAccount(TestCase.this.user);
                    Assertions.assertNull(TestCase.this.exception);
                } catch (Exception e) {
                    Assertions.assertNotNull(TestCase.this.exception);
                    Assertions.assertEquals(TestCase.this.exception, e.getClass());
                }
            }
        }

        var testCases = new TestCase[]{
                new TestCase("Create account successful", new MasterService(new EmptyUserRepository(), null, null, null), new User("a", "b", "AB", "BA", "a@g.com"), null),
                new TestCase("Create account duplicate username", new MasterService(new DefaultUserRepository(), null, null, null), new User(Constants.USERNAME, "b", "AB", "BA", "a@g.c"), UsernameTakenException.class),
                new TestCase("Create account duplicate email", new MasterService(new DefaultUserRepository(), null, null, null), new User("a", "b", "AB", "BA", Constants.EMAIL), EmailTakenException.class),
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }

    @TestFactory
    Stream<DynamicTest> login() {
        record TestCase(String name, Service service, String username, User expected,
                        Class<? extends Exception> exception) {
            public void check() {
                try {
                    User computed = TestCase.this.service.login(TestCase.this.username);
                    Assertions.assertNull(TestCase.this.exception);
                    Assertions.assertEquals(TestCase.this.expected, computed);
                } catch (Exception e) {
                    Assertions.assertNotNull(TestCase.this.exception);
                    Assertions.assertEquals(TestCase.this.exception, e.getClass());
                }
            }
        }

        var testCases = new TestCase[]{
                new TestCase("Login invalid data", new MasterService(new EmptyUserRepository(), null, null, null), null, null, IllegalArgumentException.class),
                new TestCase("Login successful", new MasterService(new DefaultUserRepository(), null, null, null), Constants.USERNAME, Constants.USER, null),
                new TestCase("Login unsuccessful", new MasterService(new EmptyUserRepository(), null, null, null), Constants.USERNAME, null, UserNotFoundException.class)
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }

    @TestFactory
    Stream<DynamicTest> createProject() {
        record TestCase(String name, Service service, Project project, Project expected,
                        Class<? extends Exception> exception) {
            public void check() {
                try {
                    Project computed = TestCase.this.service.createProject(TestCase.this.project);
                    Assertions.assertNull(TestCase.this.exception);
                    Assertions.assertEquals(TestCase.this.expected, computed);
                } catch (Exception e) {
                    Assertions.assertNotNull(TestCase.this.exception);
                    Assertions.assertEquals(TestCase.this.exception, e.getClass());
                }
            }
        }

        Project project = new Project("title", "Description", LocalDateTime.now());
        var testCases = new TestCase[]{
                new TestCase("Create project successfully", new MasterService(new EmptyUserRepository(), new EmptyProjectRepository(), null, null), project, project, null)
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }

    @TestFactory
    Stream<DynamicTest> getProjectById() {
        record TestCase(String name, Service service, long id, Project expected, Class<? extends Exception> exception) {
            public void check() {
                try {
                    Project computed = TestCase.this.service.getProjectById(TestCase.this.id);
                    Assertions.assertNull(TestCase.this.exception);
                    Assertions.assertEquals(TestCase.this.expected, computed);
                } catch (Exception e) {
                    Assertions.assertNotNull(TestCase.this.exception);
                    Assertions.assertEquals(TestCase.this.exception, e.getClass());
                }
            }
        }

        var testCases = new TestCase[]{
                new TestCase("Get project non-existent id", new MasterService(null, new EmptyProjectRepository(), null, null), 0L, null, null),
                new TestCase("Get project successfully", new MasterService(null, new DefaultProjectRepository(), null, null), Constants.PROJECT.getId(), Constants.PROJECT, null)
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }

    @TestFactory
    Stream<DynamicTest> getInvolvementsByUserId() {
        record TestCase(String name, Service service, String username, Set<Involvement> expected,
                        Class<? extends Exception> exception) {
            public void check() {
                try {
                    Set<Involvement> computed = TestCase.this.service.getInvolvementsByUsername(username);
                    Assertions.assertNull(TestCase.this.exception);
                    Assertions.assertEquals(TestCase.this.expected, computed);
                } catch (Exception e) {
                    Assertions.assertNotNull(TestCase.this.exception);
                    Assertions.assertEquals(e.getClass(), TestCase.this.exception);
                }
            }
        }

        var testCases = new TestCase[]{
                new TestCase("Get Involvements by User username non-existent", new MasterService(new DefaultUserRepository(), new DefaultProjectRepository(), new EmptyInvolvementRepository(), null), "", null, UserNotFoundException.class),
                new TestCase("Get Involvements by User zero size", new MasterService(new DefaultUserRepository(), new DefaultProjectRepository(), new EmptyInvolvementRepository(), null), Constants.USER.getUsername(), Collections.emptySet(), null),
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }

    @TestFactory
    Stream<DynamicTest> addParticipant() {
        record TestCase(String name, Service service, Involvement involvement, User requester, Involvement expected,
                        Class<? extends Exception> exception) {
            public void check() {
                try {
                    Involvement result = TestCase.this.service.addParticipant(TestCase.this.involvement, TestCase.this.requester);
                    Assertions.assertNull(TestCase.this.exception);
                    Assertions.assertEquals(TestCase.this.expected, result);
                } catch (Exception e) {
                    Assertions.assertNotNull(TestCase.this.exception);
                    Assertions.assertEquals(TestCase.this.exception, e.getClass());
                }
            }
        }

        User userNonExistent = new User(Long.MAX_VALUE);
        userNonExistent.setUsername("a");
        Project projectNonExistent = new Project(Long.MAX_VALUE);

        UserRepository defaultUserRepository = new DefaultUserRepository();

        var testCases = new TestCase[]{
                new TestCase("Add Participant non existent requester",
                        new MasterService(defaultUserRepository, new DefaultProjectRepository(), new EmptyInvolvementRepository(), null),
                        new Involvement(Role.UX_DESIGNER, Constants.USER, Constants.PROJECT),
                        userNonExistent,
                        null,
                        UserNotFoundException.class
                ),
                new TestCase("Add Participant requester not a participant",
                        new MasterService(defaultUserRepository, new DefaultProjectRepository(), new EmptyInvolvementRepository(), null),
                        new Involvement(Role.BACK_END_DEVELOPER, userNonExistent, Constants.PROJECT),
                        Constants.USER,
                        null,
                        UserNotInProjectException.class
                ),
                new TestCase("Add participant non existent user",
                        new MasterService(defaultUserRepository, new DefaultProjectRepository(), new DefaultInvolvementRepository(), null),
                        new Involvement(Role.TESTER, userNonExistent, Constants.PROJECT),
                        Constants.OTHER_USER,
                        null,
                        UserNotFoundException.class
                ),
                new TestCase("Add participant non existent project",
                        new MasterService(defaultUserRepository, new EmptyProjectRepository(), new EmptyInvolvementRepository(), null),
                        new Involvement(Role.QA_LEAD, Constants.OTHER_USER, projectNonExistent),
                        Constants.OTHER_USER,
                        null,
                        ProjectNotFoundException.class
                ),
                new TestCase("Add participant already added",
                        new MasterService(defaultUserRepository, new DefaultProjectRepository(), new DefaultInvolvementRepository(), null),
                        new Involvement(Role.FULL_STACK_DEVELOPER, Constants.OTHER_USER, Constants.PROJECT),
                        Constants.OTHER_USER,
                        null,
                        UserAlreadyInProjectException.class
                ),
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }

    @TestFactory
    Stream<DynamicTest> getAllUsernames() {
        record TestCase(String name, Service service, List<String> expected) {
            public void check() {
                List<String> computed = TestCase.this.service.getAllUsernames();
                Assertions.assertEquals(TestCase.this.expected.size(), computed.size());
                Assertions.assertTrue(TestCase.this.expected.containsAll(computed));
                Assertions.assertTrue(computed.containsAll(TestCase.this.expected));
            }
        }

        UserRepository userRepository = new DefaultUserRepository();
        List<String> usernames = StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .map(User::getUsername)
                .collect(Collectors.toList());

        var testCases = new TestCase[]{
                new TestCase("Get all usernames empty result", new MasterService(new EmptyUserRepository(), null, null, null), Collections.emptyList()),
                new TestCase("Get all username default users", new MasterService(userRepository, null, null, null), usernames)
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }

    @TestFactory
    Stream<DynamicTest> addIssue() {
        record TestCase(String name, Service service, Issue issue, Issue expected,
                        Class<? extends Exception> exception) {
            public void check() {
                try {
                    Issue computed = TestCase.this.service.addIssue(TestCase.this.issue);
                    Assertions.assertNull(TestCase.this.exception);
                    Assertions.assertEquals(TestCase.this.expected, computed);
                } catch (Exception e) {
                    Assertions.assertNotNull(TestCase.this.exception);
                    Assertions.assertEquals(e.getClass(), TestCase.this.exception);
                }
            }
        }

        IssueRepository emptyIssueRepo = new EmptyIssueRepository();
        UserRepository defaultUserRepo = new DefaultUserRepository();
        ProjectRepository defaultProjectRepo = new DefaultProjectRepository();
        InvolvementRepository defaultInvolvementRepo = new DefaultInvolvementRepository();

        Service service = new MasterService(defaultUserRepo, defaultProjectRepo, defaultInvolvementRepo, emptyIssueRepo);

        Issue issueNonExistentReporter = new Issue("Title", "Desc", Severity.BLOCKER, Status.TO_DO, IssueType.WONT_FIX, new Project(), new User(Long.MAX_VALUE));
        Issue issue = new Issue("Title", "Desc", Severity.BLOCKER, Status.TO_DO, IssueType.DUPLICATE, Constants.OTHER_INVOLVEMENT.getProject(), Constants.OTHER_INVOLVEMENT.getUser());

        Issue issueNonExistentAssignee = new Issue("Title", "Desc", Severity.BLOCKER, Status.TO_DO, IssueType.DUPLICATE, Constants.OTHER_INVOLVEMENT.getProject(), Constants.OTHER_INVOLVEMENT.getUser());
        issueNonExistentAssignee.setAssignee(new User(Long.MAX_VALUE));

        Issue issueWrongAssignee = new Issue("Title", "Desc", Severity.BLOCKER, Status.TO_DO, IssueType.DUPLICATE, Constants.OTHER_INVOLVEMENT.getProject(), Constants.OTHER_INVOLVEMENT.getUser());
        issueWrongAssignee.setAssignee(Constants.USER);

        var testCases = new TestCase[]{
                new TestCase("Save issue non existent reporter", service, issueNonExistentReporter, null, UserNotFoundException.class),
                new TestCase("Save issue successfully", service, issue, issue, null),
                new TestCase("Save issue non-existent assignee", service, issueNonExistentAssignee, null, UserNotFoundException.class),
                new TestCase("Save issue assignee not in project", service, issueWrongAssignee, null, UserNotInProjectException.class)
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }

    @TestFactory
    Stream<DynamicTest> getAssignedIssues() {
        record TestCase(String name, Service service, String username, List<Issue> expected,
                        Class<? extends Exception> exception) {
            public void check() {
                try {
                    List<Issue> computed = TestCase.this.service.getAssignedIssues(TestCase.this.username);
                    Assertions.assertNull(TestCase.this.exception);

                    Assertions.assertEquals(TestCase.this.expected, computed);
                } catch (Exception e) {
                    Assertions.assertNotNull(TestCase.this.exception);
                    Assertions.assertEquals(TestCase.this.exception, e.getClass());
                }
            }
        }

        List<Issue> assignedIssues = Arrays.stream(Constants.ISSUES)
                .filter(issue -> issue.getAssignee() != null && issue.getAssignee().equals(Constants.USER))
                .collect(Collectors.toList());

        var testCases = new TestCase[]{
                new TestCase(
                        "Service Get Assigned Issues non existent user",
                        new MasterService(new EmptyUserRepository(), null, null, new EmptyIssueRepository()),
                        Constants.USER.getUsername(),
                        null,
                        UserNotFoundException.class),
                new TestCase("Service Get Assigned Issues not empty",
                        new MasterService(new DefaultUserRepository(), new DefaultProjectRepository(), new DefaultInvolvementRepository(), new DefaultIssueRepository()),
                        Constants.USER.getUsername(),
                        assignedIssues,
                        null
                )
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }
}