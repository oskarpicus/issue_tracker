package dtos;

import model.Involvement;
import model.Project;

import java.time.LocalDateTime;
import java.util.Set;

public class ProjectDto {
    private final Long id;
    private final String title;
    private final String description;
    private final LocalDateTime createdAt;
    private final Set<Involvement> involvements;

    public ProjectDto(Long id, String title, String description, LocalDateTime createdAt, Set<Involvement> involvements) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.involvements = involvements;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Set<Involvement> getInvolvements() {
        return involvements;
    }

    public static ProjectDto from(Project project) {
        // eliminate bidirectional relationship
        project.getInvolvements()
                .forEach(involvement -> {
                    involvement.setProject(null);
                    involvement.getUser().setInvolvements(null);
                });
        return new ProjectDto(project.getId(), project.getTitle(), project.getDescription(), project.getCreatedAt(), project.getInvolvements());
    }
}
