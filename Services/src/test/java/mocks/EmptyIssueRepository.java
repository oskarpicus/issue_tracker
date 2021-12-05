package mocks;

import model.Issue;
import repository.IssueRepository;

import java.util.Collections;
import java.util.Optional;

public class EmptyIssueRepository implements IssueRepository {
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
        return Optional.empty();
    }

    @Override
    public Iterable<Issue> findAll() {
        return Collections.emptyList();
    }
}
