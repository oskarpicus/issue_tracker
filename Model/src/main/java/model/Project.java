package model;

import java.time.LocalDateTime;
import java.util.Set;

public class Project implements Entity<Long> {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime createdAt;
    private Set<Involvement> involvements;

    public Project() {
    }

    public Project(String title, String description, LocalDateTime createdAt) {
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Set<Involvement> getInvolvements() {
        return involvements;
    }

    public void setInvolvements(Set<Involvement> involvements) {
        this.involvements = involvements;
    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
