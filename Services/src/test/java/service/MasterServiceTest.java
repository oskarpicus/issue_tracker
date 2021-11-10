package service;

import exceptions.EmailTakenException;
import exceptions.UserNotFoundException;
import exceptions.UsernameTakenException;
import mocks.*;
import model.Involvement;
import model.Project;
import model.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Stream;

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
                new TestCase("Create account successful", new MasterService(new EmptyUserRepository(), null, null), new User("a", "b", "AB", "BA", "a@g.com"), null),
                new TestCase("Create account duplicate username", new MasterService(new DefaultUserRepository(), null, null), new User(Constants.USERNAME, "b", "AB", "BA", "a@g.c"), UsernameTakenException.class),
                new TestCase("Create account duplicate email", new MasterService(new DefaultUserRepository(), null, null), new User("a", "b", "AB", "BA", Constants.EMAIL), EmailTakenException.class),
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
                new TestCase("Login invalid data", new MasterService(new EmptyUserRepository(), null, null), null, null, IllegalArgumentException.class),
                new TestCase("Login successful", new MasterService(new DefaultUserRepository(), null, null), Constants.USERNAME, Constants.USER, null),
                new TestCase("Login unsuccessful", new MasterService(new EmptyUserRepository(), null, null), Constants.USERNAME, null, UserNotFoundException.class)
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
                new TestCase("Create project successfully", new MasterService(new EmptyUserRepository(), new EmptyProjectRepository(), null), project, project, null)
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
                new TestCase("Get project non-existent id", new MasterService(null, new EmptyProjectRepository(), null), 0L, null, null),
                new TestCase("Get project successfully", new MasterService(null, new DefaultProjectRepository(), null), Constants.PROJECT.getId(), Constants.PROJECT, null)
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
                new TestCase("Get Involvements by User username non-existent", new MasterService(new DefaultUserRepository(), new DefaultProjectRepository(), new EmptyInvolvementRepository()), "", null, UserNotFoundException.class),
                new TestCase("Get Involvements by User zero size", new MasterService(new DefaultUserRepository(), new DefaultProjectRepository(), new EmptyInvolvementRepository()), Constants.USER.getUsername(), Collections.emptySet(), null),
                new TestCase("Get Involvements by User non-zero size", new MasterService(new DefaultUserRepository(), new DefaultProjectRepository(), new DefaultInvolvementRepository()), Constants.USER.getUsername(), Set.of(Constants.INVOLVEMENT), null),
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }
}