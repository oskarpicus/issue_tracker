package service;

import exceptions.EmailTakenException;
import exceptions.UserNotFoundException;
import exceptions.UsernameTakenException;
import mocks.Constants;
import mocks.DefaultUserRepository;
import mocks.EmptyUserRepository;
import model.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;

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
                new TestCase("Create account successful", new MasterService(new EmptyUserRepository()), new User("a", "b", "AB", "BA", "a@g.com"), null),
                new TestCase("Create account duplicate username", new MasterService(new DefaultUserRepository()), new User(Constants.USERNAME, "b", "AB", "BA", "a@g.c"), UsernameTakenException.class),
                new TestCase("Create account duplicate email", new MasterService(new DefaultUserRepository()), new User("a", "b", "AB", "BA", Constants.EMAIL), EmailTakenException.class),
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }

    @TestFactory
    Stream<DynamicTest> login() {
        record TestCase(String name, Service service, String username, User expected, Class<? extends Exception> exception) {
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

        var testCases = new TestCase[] {
                new TestCase("Login invalid data", new MasterService(new EmptyUserRepository()), null, null, IllegalArgumentException.class),
                new TestCase("Login successful", new MasterService(new DefaultUserRepository()), Constants.USERNAME, Constants.USER, null),
                new TestCase("Login unsuccessful", new MasterService(new EmptyUserRepository()), Constants.USERNAME,null, UserNotFoundException.class)
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }
}