package mocks;

import model.Issue;
import model.User;
import repository.IssueRepository;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class DefaultIssueRepository implements IssueRepository {
    // make a copy of the default issues
    private final Issue[] defaultIssues = Stream.of(Constants.ISSUES).toArray(Issue[]::new);

    @Override
    public Iterable<Issue> getAssignedIssues(User user) {
        if (user == null) {
            throw new IllegalArgumentException();
        }

        return Stream.of(defaultIssues)
                .filter(issue -> issue.getAssignee() != null && issue.getAssignee().equals(user))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Issue> save(Issue entity) {
        if (entity == null) {
            throw new IllegalArgumentException();
        }
        return Optional.empty();
    }

    @Override
    public Optional<Issue> delete(Long aLong) {
        if (aLong == null) {
            throw new IllegalArgumentException();
        }
        return Optional.empty();
    }

    @Override
    public Optional<Issue> update(Issue entity) {
        if (entity == null) {
            throw new IllegalArgumentException();
        }
        return Optional.empty();
    }

    @Override
    public Optional<Issue> find(Long aLong) {
        if (aLong == null) {
            throw new IllegalArgumentException();
        }
        return Stream.of(defaultIssues)
                .filter(issue -> issue.getId().equals(aLong))
                .findFirst();
    }

    @Override
    public Iterable<Issue> findAll() {
        return Stream.of(defaultIssues).collect(Collectors.toList());
    }
}
