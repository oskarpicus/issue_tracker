package repository;

import model.User;

import java.util.Optional;

public interface UserRepository extends Repository<Long, User> {

    /**
     * Method for obtaining the User with a specific username
     * @param username: String, the desired username
     * @return an {@code Optional} with the user with the given username, null if it does not exist
     * @throws IllegalArgumentException if username is null
     */
    Optional<User> findUserByUsername(String username);

    /**
     * Method for obtaining the User with a specific email
     * @param email: String, the desired email
     * @return an {@code Optional} with the user with the given email, null if it does not exist
     * @throws IllegalArgumentException if email is null
     */
    Optional<User> findUserByEmail(String email);

    /**
     * Method for obtaining the User with a specific username and password
     * @param username: String, the desired username
     * @param password: String, the desired password
     * @return an {@code Optional} with the user with the given username and password, null, if it does not exist
     * @throws IllegalArgumentException if username or password are null
     */
    Optional<User> findUserByUsernamePassword(String username, String password);
}
