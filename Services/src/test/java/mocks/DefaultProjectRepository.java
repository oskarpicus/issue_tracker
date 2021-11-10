package mocks;

import model.Project;
import repository.ProjectRepository;

import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Stream;

public class DefaultProjectRepository implements ProjectRepository {
    private final Project[] defaultProjects = new Project[]{
            Constants.PROJECT
    };

    @Override
    public Optional<Project> save(Project entity) {
        if (entity == null) {
            throw new IllegalArgumentException();
        }
        return Optional.empty();
    }

    @Override
    public Optional<Project> delete(Long aLong) {
        if (aLong == null) {
            throw new IllegalArgumentException();
        }
        return Optional.empty();
    }

    @Override
    public Optional<Project> update(Project entity) {
        if (entity == null) {
            throw new IllegalArgumentException();
        }
        return Optional.empty();
    }

    @Override
    public Optional<Project> find(Long aLong) {
        if (aLong == null) {
            throw new IllegalArgumentException();
        }
        return Stream.of(defaultProjects)
                .filter(project -> project.getId().equals(aLong))
                .findFirst();
    }

    @Override
    public Iterable<Project> findAll() {
        return Arrays.asList(defaultProjects);
    }
}
