package validator;

import model.Involvement;
import model.Role;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;

import java.util.stream.Stream;

class InvolvementValidatorTest {

    private static final InvolvementValidator validator = new InvolvementValidator();

    @TestFactory
    Stream<DynamicTest> validate() {
        record TestCase(String name, Involvement involvement, boolean wantErr, String errorMessage) {
            public void check() {
                try {
                    validator.validate(TestCase.this.involvement);
                    if (TestCase.this.wantErr) {  // we expected an error
                        Assertions.fail();
                    }
                } catch (ValidationException e) {
                    if (!TestCase.this.wantErr) { // we did not expect an error
                        Assertions.fail();
                    }
                    Assertions.assertEquals(TestCase.this.errorMessage, e.getMessage());
                }
            }
        }

        var testCases = new TestCase[]{
                new TestCase("Valid involvement", new Involvement(Role.BACK_END_DEVELOPER), false, ""),
        };

        return DynamicTest.stream(Stream.of(testCases), TestCase::name, TestCase::check);
    }
}