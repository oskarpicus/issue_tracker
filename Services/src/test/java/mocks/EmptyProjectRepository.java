package mocks;

import model.Project;
import repository.ProjectRepository;

import java.util.ArrayList;
import java.util.Optional;

public class EmptyProjectRepository implements ProjectRepository {
    @Override
    public Optional<Project> save(Project entity) {
        return Optional.empty();
    }

    @Override
    public Optional<Project> delete(Long aLong) {
        return Optional.empty();
    }

    @Override
    public Optional<Project> update(Project entity) {
        return Optional.empty();
    }

    @Override
    public Optional<Project> find(Long aLong) {
        return Optional.empty();
    }

    @Override
    public Iterable<Project> findAll() {
        return new ArrayList<>();
    }
}
