package mocks;

import model.User;
import repository.UserRepository;

import java.util.ArrayList;
import java.util.Optional;

public class EmptyUserRepository implements UserRepository {
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
        return Optional.empty();
    }

    @Override
    public Iterable<User> findAll() {
        return new ArrayList<>();
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        if (username == null) {
            throw new IllegalArgumentException();
        }
        return Optional.empty();
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        if (email == null) {
            throw new IllegalArgumentException();
        }
        return Optional.empty();
    }

    @Override
    public Optional<User> findUserByUsernamePassword(String username, String password) {
        if (username == null || password == null) {
            throw new IllegalArgumentException();
        }
        return Optional.empty();
    }
}
