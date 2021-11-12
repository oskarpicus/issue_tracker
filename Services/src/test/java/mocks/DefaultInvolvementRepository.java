package mocks;

import model.Involvement;
import model.User;
import repository.InvolvementRepository;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class DefaultInvolvementRepository implements InvolvementRepository {
    private final Involvement[] defaultInvolvements = new Involvement[]{
            Constants.INVOLVEMENT
    };

    @Override
    public Iterable<Involvement> findInvolvementsByUser(User user) {
        return Stream.of(defaultInvolvements)
                .filter(involvement -> involvement.getUser().equals(user))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Involvement> save(Involvement entity) {
        if (entity == null) {
            throw new IllegalArgumentException();
        }
        return Optional.empty();
    }

    @Override
    public Optional<Involvement> delete(Long aLong) {
        if (aLong == null) {
            throw new IllegalArgumentException();
        }
        return Optional.empty();
    }

    @Override
    public Optional<Involvement> update(Involvement entity) {
        if (entity == null) {
            throw new IllegalArgumentException();
        }
        return Optional.empty();
    }

    @Override
    public Optional<Involvement> find(Long aLong) {
        if (aLong == null) {
            throw new IllegalArgumentException();
        }
        return Stream.of(defaultInvolvements)
                .filter(involvement -> involvement.getId().equals(aLong))
                .findFirst();
    }

    @Override
    public Iterable<Involvement> findAll() {
        return Stream.of(defaultInvolvements).collect(Collectors.toList());
    }
}
