package service;

import exceptions.*;
import model.Involvement;
import model.Issue;
import model.Project;
import model.User;
import repository.InvolvementRepository;
import repository.IssueRepository;
import repository.ProjectRepository;
import repository.UserRepository;
import utils.Constants;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class MasterService implements Service {
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final InvolvementRepository involvementRepository;
    private final IssueRepository issueRepository;

    public MasterService(UserRepository userRepository, ProjectRepository projectRepository, InvolvementRepository involvementRepository, IssueRepository issueRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.involvementRepository = involvementRepository;
        this.issueRepository = issueRepository;
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

    @Override
    public Involvement addParticipant(Involvement involvement, User requester) throws UserNotInProjectException, UserNotFoundException, ProjectNotFoundException, UserAlreadyInProjectException {
        // verify if the users are valid
        Optional<User> userRequester = userRepository.find(requester.getId());
        if (userRequester.isEmpty()) {
            throw new UserNotFoundException("Requester does not exist");
        }

        boolean isParticipant = userRequester.get()
                .getInvolvements()
                .stream()
                .anyMatch(involvement1 -> involvement1.getUser().equals(userRequester.get()));
        if (!isParticipant) {
            throw new UserNotInProjectException("Requester is not in the project");
        }

        Optional<User> userParticipant = userRepository.findUserByUsername(involvement.getUser().getUsername());
        if (userParticipant.isEmpty()) {
            throw new UserNotFoundException(Constants.USER_DOES_NOT_EXIST_ERROR_MESSAGE);
        }

        Optional<Project> projectOptional = projectRepository.find(involvement.getProject().getId());
        if (projectOptional.isEmpty()) {
            throw new ProjectNotFoundException("Project does not exist");
        }

        // verify if the user is already a participant
        isParticipant = userParticipant.get()
                .getInvolvements()
                .stream()
                .anyMatch(involvement1 -> involvement1.getProject().equals(projectOptional.get()));
        if (isParticipant) {
            throw new UserAlreadyInProjectException("The user is already a participant");
        }

        involvement.setUser(userParticipant.get());
        involvement.setProject(projectOptional.get());

        Optional<Involvement> result = involvementRepository.save(involvement);
        return result.isEmpty() ? involvement : null;
    }

    @Override
    public List<String> getAllUsernames() {
        return StreamSupport.stream(userRepository.getAllUsernames().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Issue addIssue(Issue issue) throws UserNotInProjectException, UserNotFoundException {
        Optional<User> reporter = userRepository.find(issue.getReporter().getId());
        if (reporter.isEmpty()) {
            throw new UserNotFoundException(Constants.USER_DOES_NOT_EXIST_ERROR_MESSAGE);
        }

        // verify if the project is a participant in the project
        boolean isParticipant = reporter.get()
                .getInvolvements()
                .stream()
                .anyMatch(involvement -> involvement.getProject().getId().equals(issue.getProject().getId()));
        if (!isParticipant) {
            throw new UserNotInProjectException("The reporter is not a participant");
        }

        Optional<Issue> result = issueRepository.save(issue);
        return result.isEmpty() ? issue : null;
    }
}
