package repository.hibernate;

import model.Issue;
import org.hibernate.Session;
import org.hibernate.query.Query;
import repository.IssueRepository;
import validator.Validator;

public class IssueHbRepository extends AbstractHbRepository<Long, Issue> implements IssueRepository {
    protected IssueHbRepository(Validator<Long, Issue> validator) {
        super(validator);
    }

    @Override
    protected Query<Issue> getFindQuery(Session session, Long aLong) {
        return session.createQuery("from Issue where id=:id", Issue.class)
                .setParameter("id", aLong);
    }

    @Override
    protected Query<Issue> getFindAllQuery(Session session) {
        return session.createQuery("from Issue", Issue.class);
    }
}
