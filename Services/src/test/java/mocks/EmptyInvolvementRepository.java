package mocks;

import model.Involvement;
import model.User;
import repository.InvolvementRepository;

import java.util.Collections;
import java.util.Optional;

public class EmptyInvolvementRepository implements InvolvementRepository {
    @Override
    public Iterable<Involvement> findInvolvementsByUser(User user) {
        return Collections.emptyList();
    }

    @Override
    public Optional<Involvement> save(Involvement entity) {
        return Optional.empty();
    }

    @Override
    public Optional<Involvement> delete(Long aLong) {
        return Optional.empty();
    }

    @Override
    public Optional<Involvement> update(Involvement entity) {
        return Optional.empty();
    }

    @Override
    public Optional<Involvement> find(Long aLong) {
        return Optional.empty();
    }

    @Override
    public Iterable<Involvement> findAll() {
        return Collections.emptyList();
    }
}
