package repository.hibernate;

import model.Involvement;
import org.hibernate.Session;
import org.hibernate.query.Query;
import repository.InvolvementRepository;
import validator.Validator;

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
}
