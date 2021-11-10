package service;

import exceptions.EmailTakenException;
import exceptions.UsernameTakenException;
import exceptions.UserNotFoundException;
import model.Project;
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
     * Method for finding a user based on the username
     * @param username: String, the desired username
     * @return the user, if there is a user with the specified username and password
     * @throws UserNotFoundException, if there is no user
     */
    User login(String username) throws UserNotFoundException;

    /**
     * Method for creating a new account
     * @param project, the project to add
     * @return - the project with an assigned identifier, if the operation is successful
     *         - null, otherwise
     */
    Project createProject(Project project);

    /**
     * Method for retrieving the information of a project, based on its id
     * @param id, the id of the desired project
     * @return - the project, if there is a project with the given id
     *         - null, otherwise
     */
    Project getProjectById(long id);
}
