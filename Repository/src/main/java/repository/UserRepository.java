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
}
