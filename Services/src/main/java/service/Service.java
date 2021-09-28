package service;

import exceptions.EmailTakenException;
import exceptions.UsernameTakenException;
import model.User;

public interface Service {

    /**
     * Method for creating a new account
     * @param user: User, encapsulation of all the details of the user
     * @return the user with the assigned id
     * @throws UsernameTakenException, if the username is already used
     * @throws EmailTakenException, if the email is already used
     */
    User createAccount(User user) throws UsernameTakenException, EmailTakenException;

    /**
     * Method for logging into the application based on the username and password
     * @param username: String, the desired username
     * @param password: String, the desired password
     * @return the user, if there is a user with the specified username and password, null, otherwise
     */
    User login(String username, String password);
}
