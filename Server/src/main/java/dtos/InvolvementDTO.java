package dtos;

import model.Involvement;

import java.util.Collections;

/**
 * This class is intended to fix the infinite recursion JSON mapping error, cause by bidirectional relationships.
 */
public class InvolvementDTO {
    private final Involvement involvement;

    public InvolvementDTO(Involvement involvement) {
        this.involvement = involvement;
        eliminateBidirectionalRelationship();
    }

    public Involvement getInvolvement() {
        return involvement;
    }

    private void eliminateBidirectionalRelationship() {
        this.involvement.getProject().setInvolvements(Collections.emptySet());
        this.involvement.getUser().setInvolvements(Collections.emptySet());
    }
}
