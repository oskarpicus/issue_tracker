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
}
