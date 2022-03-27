package service;

import ai.Predictor;
import exceptions.EmailTakenException;
import exceptions.IssueNotFoundException;
import exceptions.ProjectNotFoundException;
import exceptions.UserAlreadyInProjectException;
import exceptions.UserNotFoundException;
import exceptions.UserNotInProjectException;
import exceptions.UsernameTakenException;
import mocks.Constants;
import mocks.DefaultInvolvementRepository;
import mocks.DefaultIssueRepository;
import mocks.DefaultProjectRepository;
import mocks.DefaultUserRepository;
import mocks.EmptyInvolvementRepository;
import mocks.EmptyIssueRepository;
import mocks.EmptyProjectRepository;
import mocks.EmptyUserRepository;
import model.Involvement;
import model.Issue;
import model.IssueType;
import model.Project;
import model.Role;
import model.Severity;
import model.Status;
import model.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import repository.InvolvementRepository;
import repository.IssueRepository;
import repository.ProjectRepository;
import repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MasterServiceTest {

    @InjectMocks
    private MasterService service;

    @Mock
    private Predictor predictor;

    @Mock
    private UserRepository userRepository;

    @Mock
    private InvolvementRepository involvementRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private IssueRepository issueRepository;

    private static final User USER = new User("a", "b", "AB", "BA", "a@g.com");

    @TestFactory
    Stream<DynamicTest> createAccount() {
        record TestCase(String name, Runnable initialiseMocks, Service service, User user,
                        Class<? extends Exception> exception) {
            public void check() {
                TestCase.this.initialiseMocks.run();
                try {
                    TestCase.this.service.createAccount(TestCase.this.user);
                    Assertions.assertNull(TestCase.this.exception);
                } catch (Exception e) {
                    Assertions.assertNotNull(TestCase.this.exception);
                    Assertions.assertEquals(TestCase.this.exception, e.getClass());
                }
            }
        }

        Runnable createAccountSuccessful = () -> {
        };
        Runnable createAccountDuplicateUsername = () -> when(userRepository.findUserByUsername(USER.getUsername()))
                .thenReturn(Optional.of(USER));
        Runnable createAccountDuplicateEmail = () -> {
            when(userRepository.findUserByUsername(any(String.class)))
                    .thenReturn(Optional.empty());
            when(userRepository.findUserByEmail(USER.getEmail()))
                    .thenReturn(Optional.of(USER));
        };

        var testCases = new TestCase[]{
                new TestCase("Create account successful", createAccountSuccessful, service, USER, null),
                new TestCase("Create account duplicate username", createAccountDuplicateUsername, service, USER, UsernameTakenException.class),
                new TestCase("Create account duplicate email", createAccountDuplicateEmail, service, USER, EmailTakenException.class),
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
                new TestCase("Login invalid data", new MasterService(new EmptyUserRepository(), null, null, null, null), null, null, IllegalArgumentException.class),
                new TestCase("Login successful", new MasterService(new DefaultUserRepository(), null, null, null, null), Constants.USERNAME, Constants.USER, null),
                new TestCase("Login unsuccessful", new MasterService(new EmptyUserRepository(), null, null, null, null), Constants.USERNAME, null, UserNotFoundException.class)
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
                new TestCase("Create project successfully", new MasterService(new EmptyUserRepository(), new EmptyProjectRepository(), null, null, null), project, project, null)
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
                new TestCase("Get project non-existent id", new MasterService(null, new EmptyProjectRepository(), null, null, null), 0L, null, null),
                new TestCase("Get project successfully", new MasterService(null, new DefaultProjectRepository(), null, null, null), Constants.PROJECT.getId(), Constants.PROJECT, null)
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
                new TestCase("Get Involvements by User username non-existent", new MasterService(new DefaultUserRepository(), new DefaultProjectRepository(), new EmptyInvolvementRepository(), null, null), "", null, UserNotFoundException.class),
                new TestCase("Get Involvements by User zero size", new MasterService(new DefaultUserRepository(), new DefaultProjectRepository(), new EmptyInvolvementRepository(), null, null), Constants.USER.getUsername(), Collections.emptySet(), null),
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
                        new MasterService(defaultUserRepository, new DefaultProjectRepository(), new EmptyInvolvementRepository(), null, null),
                        new Involvement(Role.UX_DESIGNER, Constants.USER, Constants.PROJECT),
                        userNonExistent,
                        null,
                        UserNotFoundException.class
                ),
                new TestCase("Add Participant requester not a participant",
                        new MasterService(defaultUserRepository, new DefaultProjectRepository(), new EmptyInvolvementRepository(), null, null),
                        new Involvement(Role.BACK_END_DEVELOPER, userNonExistent, Constants.PROJECT),
                        Constants.USER,
                        null,
                        UserNotInProjectException.class
                ),
                new TestCase("Add participant non existent user",
                        new MasterService(defaultUserRepository, new DefaultProjectRepository(), new DefaultInvolvementRepository(), null, null),
                        new Involvement(Role.TESTER, userNonExistent, Constants.PROJECT),
                        Constants.OTHER_USER,
                        null,
                        UserNotFoundException.class
                ),
                new TestCase("Add participant non existent project",
                        new MasterService(defaultUserRepository, new EmptyProjectRepository(), new EmptyInvolvementRepository(), null, null),
                        new Involvement(Role.QA_LEAD, Constants.OTHER_USER, projectNonExistent),
                        Constants.OTHER_USER,
                        null,
                        ProjectNotFoundException.class
                ),
                new TestCase("Add participant already added",
                        new MasterService(defaultUserRepository, new DefaultProjectRepository(), new DefaultInvolvementRepository(), null, null),
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
                new TestCase("Get all usernames empty result", new MasterService(new EmptyUserRepository(), null, null, null, null), Collections.emptyList()),
                new TestCase("Get all username default users", new MasterService(userRepository, null, null, null, null), usernames)
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

        Service service = new MasterService(defaultUserRepo, defaultProjectRepo, defaultInvolvementRepo, emptyIssueRepo, null);

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
                        new MasterService(new EmptyUserRepository(), null, null, new EmptyIssueRepository(), null),
                        Constants.USER.getUsername(),
                        null,
                        UserNotFoundException.class),
                new TestCase("Service Get Assigned Issues not empty",
                        new MasterService(new DefaultUserRepository(), new DefaultProjectRepository(), new DefaultInvolvementRepository(), new DefaultIssueRepository(), null),
                        Constants.USER.getUsername(),
                        assignedIssues,
                        null
                )
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }

    @TestFactory
    Stream<DynamicTest> getIssueById() {
        record TestCase(String name, Service service, long id, Issue expected) {
            public void check() {
                Issue computed = TestCase.this.service.getIssueById(TestCase.this.id);
                Assertions.assertEquals(TestCase.this.expected, computed);
            }
        }

        var testCases = new TestCase[]{
                new TestCase("Get Issue By Id non existent", new MasterService(null, null, null, new EmptyIssueRepository(), null), Long.MAX_VALUE, null),
                new TestCase("Get Issue By Id successfully", new MasterService(null, null, null, new DefaultIssueRepository(), null), Constants.ISSUES[0].getId(), Constants.ISSUES[0])
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }

    @TestFactory
    Stream<DynamicTest> deleteIssue() {
        record TestCase(String name, Service service, long id, String requester, Issue expected,
                        Class<? extends Exception> exception) {
            public void check() {
                try {
                    Issue computed = TestCase.this.service.deleteIssue(TestCase.this.id, TestCase.this.requester);
                    Assertions.assertNull(TestCase.this.exception);
                    Assertions.assertEquals(expected, computed);
                } catch (Exception e) {
                    Assertions.assertNotNull(TestCase.this.exception);
                    Assertions.assertEquals(TestCase.this.exception, e.getClass());
                }
            }
        }

        var testCases = new TestCase[]{
                new TestCase(
                        "Delete issue does not exist",
                        new MasterService(null, null, null, new EmptyIssueRepository(), null),
                        1,
                        Constants.USER.getUsername(),
                        null,
                        IssueNotFoundException.class
                ),
                new TestCase(
                        "Delete issue requester not a participant",
                        new MasterService(null, null, null, new DefaultIssueRepository(), null),
                        Constants.ISSUES[0].getId(),
                        "",
                        null,
                        UserNotInProjectException.class
                ),
                new TestCase(
                        "Delete issue successfully",
                        new MasterService(null, null, null, new DefaultIssueRepository(), null),
                        Constants.ISSUES[0].getId(),
                        Constants.ISSUES[0].getAssignee().getUsername(),
                        Constants.ISSUES[0],
                        null
                )
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }

    @TestFactory
    Stream<DynamicTest> updateIssue() {
        record TestCase(String name, Service service, Issue issue, String requesterUsername, Issue expected,
                        Class<? extends Exception> exception) {
            public void check() {
                try {
                    Issue computed = TestCase.this.service.updateIssue(TestCase.this.issue, TestCase.this.requesterUsername);
                    Assertions.assertNull(TestCase.this.exception);
                    Assertions.assertEquals(expected, computed);
                } catch (Exception e) {
                    Assertions.assertNotNull(TestCase.this.exception);
                    Assertions.assertEquals(TestCase.this.exception, e.getClass());
                }
            }
        }

        Service serviceNoIssues = new MasterService(null, null, null, new EmptyIssueRepository(), null);
        Service serviceDefaultIssues = new MasterService(null, null, null, new DefaultIssueRepository(), null);

        var testCases = new TestCase[]{
                new TestCase("Update Issue null issue and user", serviceNoIssues, null, null, null, IllegalArgumentException.class),
                new TestCase("Update Issue null user", serviceNoIssues, Constants.ISSUES[0], null, null, IllegalArgumentException.class),
                new TestCase("Update Issue issue not found", serviceNoIssues, Constants.ISSUES[0], "", null, IssueNotFoundException.class),
                new TestCase("Update Issue user not in project", serviceDefaultIssues, Constants.ISSUES[0], "", null, UserNotInProjectException.class),
                new TestCase("Update Issue successful", serviceDefaultIssues, Constants.ISSUES[0], Constants.ISSUES[0].getAssignee().getUsername(), Constants.ISSUES[0], null)
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }
}