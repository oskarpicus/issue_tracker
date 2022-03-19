package ai;

import exceptions.AiServiceException;
import model.IssueType;
import model.ProfanityLevel;
import model.SeverityLevel;

public interface Predictor {
    /**
     * Method for predicting the severity level of an issue, based on its title
     * @param title, the title of the issue to predict the severity level to
     * @return the predicted severity level
     * @throws AiServiceException if any errors occur during the prediction process
     */
    SeverityLevel predictSeverityLevel(String title) throws AiServiceException;

    /**
     * Method for predicting the label (type) of an issue, based on its title
     * @param title, the title of the issue to predict the type to
     * @return the predicted issue type
     * @throws AiServiceException if any errors occur during the prediction process
     */
    IssueType predictIssueType(String title) throws AiServiceException;

    /**
     * Method for identifying the profanity level of a piece of text
     * @param text, the text to analyse
     * @return the predicted profanity level
     * @throws AiServiceException if any errors occurs during the prediction process
     */
    ProfanityLevel predictProfanityLevel(String text) throws AiServiceException;
}
