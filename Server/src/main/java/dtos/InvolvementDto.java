package dtos;

import model.Involvement;
import model.Project;
import model.Role;
import model.User;

import java.util.Collections;

/**
 * This class is intended to fix the infinite recursion JSON mapping error, cause by bidirectional relationships.
 */
public class InvolvementDto {
    private final Long id;
    private final Role role;
    private final User user;
    private final Project project;

    public InvolvementDto(Long id, Role role, User user, Project project) {
        this.id = id;
        this.role = role;
        this.user = user;
        this.project = project;
    }

    public Long getId() {
        return id;
    }

    public Role getRole() {
        return role;
    }

    public User getUser() {
        return user;
    }

    public Project getProject() {
        return project;
    }

    public static InvolvementDto from(Involvement involvement) {
        User user = involvement.getUser().clone();
        user.setInvolvements(Collections.emptySet());
        Project project = involvement.getProject().clone();
        project.setInvolvements(Collections.emptySet());
        return new InvolvementDto(involvement.getId(), involvement.getRole(), user, project);
    }
}
