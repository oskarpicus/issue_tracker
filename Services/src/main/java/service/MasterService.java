package service;

import exceptions.EmailTakenException;
import exceptions.UserNotFoundException;
import exceptions.UsernameTakenException;
import model.Project;
import model.User;
import repository.ProjectRepository;
import repository.UserRepository;
import utils.Constants;

import java.time.LocalDateTime;
import java.util.Optional;

public class MasterService implements Service {
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public MasterService(UserRepository userRepository, ProjectRepository projectRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
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
    public User login(String username) throws UserNotFoundException {
        Optional<User> result = userRepository.findUserByUsername(username);
        if (result.isEmpty()) {
            throw new UserNotFoundException(Constants.USER_NOT_FOUND_ERROR_MESSAGE);
        }
        return result.get();
    }

    @Override
    public Project createProject(Project project) {
        project.setCreatedAt(LocalDateTime.now());
        Optional<Project> result = projectRepository.save(project);
        if (result.isEmpty()) {  // successfully saved
            return project;
        }
        return null;
    }
}
