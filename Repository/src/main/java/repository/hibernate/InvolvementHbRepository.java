package repository.hibernate;

import model.Involvement;
import model.User;
import org.hibernate.Session;
import org.hibernate.query.Query;
import repository.InvolvementRepository;
import validator.Validator;

import java.util.Collections;

public class InvolvementHbRepository extends AbstractHbRepository<Long, Involvement> implements InvolvementRepository {
    protected InvolvementHbRepository(Validator<Long, Involvement> validator) {
        super(validator);
    }

    @Override
    protected Query<Involvement> getFindQuery(Session session, Long aLong) {
        return session.createQuery("from Involvement where id=:id", Involvement.class)
                .setParameter("id", aLong);
    }

    @Override
    protected Query<Involvement> getFindAllQuery(Session session) {
        return session.createQuery("from Involvement", Involvement.class);
    }

    @Override
    public Iterable<Involvement> findInvolvementsByUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException();
        }

        try (Session session = sessionFactory.openSession()) {
            Query<Involvement> query = session
                    .createQuery("from Involvement where user=:user", Involvement.class)
                    .setParameter("user", user);
            return super.filter(session, query);
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}
