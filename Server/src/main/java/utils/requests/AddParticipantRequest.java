package utils.requests;

import model.Role;

public class AddParticipantRequest {
    private Long projectId;
    private Long requesterId;
    private String username;
    private Role role;

    public AddParticipantRequest() {
    }

    public Long getProjectId() {
        return projectId;
    }

    public Long getRequesterId() {
        return requesterId;
    }

    public String getUsername() {
        return username;
    }

    public Role getRole() {
        return role;
    }
}
