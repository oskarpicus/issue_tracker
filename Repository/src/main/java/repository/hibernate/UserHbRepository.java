package repository.hibernate;

import model.User;
import org.hibernate.Session;
import org.hibernate.query.Query;
import repository.UserRepository;
import validator.Validator;

public class UserHbRepository extends AbstractHbRepository<Long, User> implements UserRepository {
    protected UserHbRepository(Validator<Long, User> validator) {
        super(validator);
    }

    @Override
    protected Query<User> getFindQuery(Session session, Long aLong) {
        return session.createQuery("from User where id=:id", User.class)
                .setParameter("id", aLong);
    }

    @Override
    protected Query<User> getFindAllQuery(Session session) {
        return session.createQuery("from User", User.class);
    }
}
