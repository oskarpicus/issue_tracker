package mocks;

import model.User;

public class Constants {
    public static final String USERNAME = "anne";
    public static final String EMAIL = "anne@gmail.com";
    public static final String PASSWORD = "anne_p";
    public static final User USER = new User(1L, USERNAME, PASSWORD, "Anne", "Victoria", EMAIL);
}
