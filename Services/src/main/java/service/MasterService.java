package service;

import exceptions.EmailTakenException;
import exceptions.UserNotFoundException;
import exceptions.UsernameTakenException;
import model.Involvement;
import model.Project;
import model.User;
import repository.InvolvementRepository;
import repository.ProjectRepository;
import repository.UserRepository;
import utils.Constants;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class MasterService implements Service {
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final InvolvementRepository involvementRepository;

    public MasterService(UserRepository userRepository, ProjectRepository projectRepository, InvolvementRepository involvementRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.involvementRepository = involvementRepository;
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

    @Override
    public Project getProjectById(long id) {
        return projectRepository.find(id).orElse(null);
    }

    @Override
    public Set<Involvement> getInvolvementsByUsername(String username) throws UserNotFoundException {
        Optional<User> user = userRepository.findUserByUsername(username);
        if (user.isEmpty()) {  // the user does not exist
            throw new UserNotFoundException(Constants.USER_DOES_NOT_EXIST_ERROR_MESSAGE);
        }

        return user.get().getInvolvements();
    }
}
