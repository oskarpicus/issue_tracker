package service;

import exceptions.*;
import model.Involvement;
import model.Issue;
import model.Project;
import model.User;

import java.util.List;
import java.util.Set;

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

    /**
     * Method for retrieving all the involvements of a certain user, based on their username
     * @param username, the username of the user to retrieve the involvements
     * @return a {@code Set} containing the involvements of the user with the specified username.
     * Returns an empty set if there are no involvements to retrieve.
     * @throws UserNotFoundException if there is no user with the specified username
     */
    Set<Involvement> getInvolvementsByUsername(String username) throws UserNotFoundException;

    /**
     * Method for adding a participant to the project
     * @param involvement, encapsulation of the project and the user, along with their role in the project.
     *                     It is expected that the {@code User} of involvement has a valid username set and the {@code Project}, a valid id.
     * @param requester, the user that initiated the process. It is expected that the requester has a valid identifier set.
     * @return - the involvement with an identifier assigned, if the operation is successful
     *         - null, otherwise
     * @throws UserNotInProjectException if the requester is not a participant to the project
     * @throws UserNotFoundException if either the desired participant or the requester do not exist
     * @throws ProjectNotFoundException if the project of the involvement does not exist
     * @throws UserAlreadyInProjectException if the user is already a participant in the project
     */
    Involvement addParticipant(Involvement involvement, User requester) throws UserNotInProjectException, UserNotFoundException, ProjectNotFoundException, UserAlreadyInProjectException;

    /**
     * Method for obtaining all the usernames of the saved users
     * @return a list containing all the usernames
     */
    List<String> getAllUsernames();

    /**
     * Method for adding an issue
     * @param issue, the issue to be added. It is expected that its reporter and project have at least a valid identifier among their fields
     * @return - the issue with an identifier assigned, if the operation is successful
     *         - null, otherwise
     * @throws UserNotInProjectException if the reporter of the issue is not a participant to the issue's project
     * @throws UserNotFoundException if the reporter of the issue does not exist
     */
    Issue addIssue(Issue issue) throws UserNotInProjectException, UserNotFoundException;
}
