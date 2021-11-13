package mocks;

import model.User;
import repository.UserRepository;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class DefaultUserRepository implements UserRepository {
    private final User[] defaultUsers = new User[]{
            Constants.USER,
            Constants.OTHER_USER,
            new User(3L, "john", "johnOl", "John", "Smith", "john_smith@yahoo.com"),
    };

    @Override
    public Optional<User> save(User entity) {
        if (entity == null) {
            throw new IllegalArgumentException();
        }
        return Optional.empty();
    }

    @Override
    public Optional<User> delete(Long aLong) {
        if (aLong == null) {
            throw new IllegalArgumentException();
        }
        return Optional.empty();
    }

    @Override
    public Optional<User> update(User entity) {
        if (entity == null) {
            throw new IllegalArgumentException();
        }
        return Optional.empty();
    }

    @Override
    public Optional<User> find(Long aLong) {
        if (aLong == null) {
            throw new IllegalArgumentException();
        }
        return Stream.of(defaultUsers)
                .filter(user -> user.getId().equals(aLong))
                .findFirst();
    }

    @Override
    public Iterable<User> findAll() {
        return Stream.of(defaultUsers).collect(Collectors.toList());
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        if (username == null) {
            throw new IllegalArgumentException();
        }
        return Stream.of(defaultUsers)
                .filter(user -> user.getUsername().equals(username))
                .findFirst();
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        if (email == null) {
            throw new IllegalArgumentException();
        }
        return Stream.of(defaultUsers)
                .filter(user -> user.getEmail().equals(email))
                .findFirst();
    }
}
