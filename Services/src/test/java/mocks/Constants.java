package mocks;

import model.Involvement;
import model.Project;
import model.Role;
import model.User;

import java.time.LocalDateTime;

public class Constants {
    public static final String USERNAME = "anne";
    public static final String EMAIL = "anne@gmail.com";
    public static final String PASSWORD = "anne_p";
    public static final User USER = new User(1L, USERNAME, PASSWORD, "Anne", "Victoria", EMAIL);
    public static final Project PROJECT = new Project(1L, "title", "description", LocalDateTime.now());
    public static final Involvement INVOLVEMENT = new Involvement(Role.UX_DESIGNER, USER, PROJECT);
}
