package ai;

import exceptions.AiServiceException;
import model.SeverityLevel;

public interface Predictor {
    /**
     * Method for predicting the severity level of an issue, based on its title
     * @param title, the title of the issue to predict the severity level to
     * @return the predicted severity level
     * @throws AiServiceException if any errors occur during the prediction process
     */
    SeverityLevel predictSeverityLevel(String title) throws AiServiceException;
}
