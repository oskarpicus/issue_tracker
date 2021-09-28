package service;

import exceptions.EmailTakenException;
import exceptions.UsernameTakenException;
import model.User;
import repository.UserRepository;
import utils.Constants;

import java.util.Optional;

public class MasterService implements Service {
    private final UserRepository userRepository;

    public MasterService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createAccount(User user) throws UsernameTakenException, EmailTakenException {
        if (userRepository.findUserByUsername(user.getUsername()).isPresent()) {
            throw new UsernameTakenException(Constants.USERNAME_TAKEN_ERROR_MESSAGE);
        }

        if (userRepository.findUserByEmail(user.getEmail()).isPresent()) {
            throw new EmailTakenException(Constants.EMAIL_TAKEN_ERROR_MESSAGE);
        }

        Optional<User> result = userRepository.save(user);
        return result.isEmpty() ? user : null;
    }

    @Override
    public User login(String username, String password) {
        return userRepository.findUserByUsernamePassword(username, password).orElse(null);
    }
}
