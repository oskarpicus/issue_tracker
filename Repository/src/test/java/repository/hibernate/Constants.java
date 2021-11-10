package repository.hibernate;

import model.Involvement;
import model.Project;
import model.Role;
import model.User;

import java.time.LocalDateTime;

public class Constants {
    public static final User[] defaultUsers = new User[]{
            new User(1L, "anne", "anne_p", "Anne", "Victoria", "anne@gmail.com"),
            new User(2L, "john", "johnOl", "John", "Smith", "john_smith@yahoo.com"),
            new User(3L, "ion", "pop", "Ion", "Pop", "ion_pop@yahoo.com"),
    };

    public static final Project[] defaultProjects = new Project[]{
            new Project(1L, "architecture_map", "Architecture", LocalDateTime.now()),
            new Project(2L, "google", "Browser", LocalDateTime.now()),
            new Project(3L, "Bugzilla", "Issue tracker", LocalDateTime.now()),
    };

    public static final Involvement[] defaultInvolvements = new Involvement[]{
            new Involvement(1L, Role.TESTER, defaultUsers[0], defaultProjects[0]),
            new Involvement(2L, Role.PRODUCT_OWNER, defaultUsers[1], defaultProjects[2]),
            new Involvement(3L, Role.QA_LEAD, defaultUsers[0], defaultProjects[2])
    };
}
