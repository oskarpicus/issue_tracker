package ai;

import exceptions.AiServiceException;
import model.IssueType;
import model.ProfanityLevel;
import model.SeverityLevel;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

public class HttpPredictor implements Predictor {
    private final Properties properties;
    private static final String URL = "ai.url";
    private static final String SUGGESTED_SEVERITY = "/suggested-severity?title=:title";
    private static final String SUGGESTED_TYPE = "/suggested-type?title=:title";
    private static final String IS_OFFENSIVE = "/is-offensive?text=:text";
    private static final double OFFENSIVE_THRESHOLD = 0.85;

    public HttpPredictor(Properties properties) {
        this.properties = properties;
    }

    @Override
    public SeverityLevel predictSeverityLevel(String title) throws AiServiceException {
        String titleEncoded = URLEncoder.encode(title, StandardCharsets.UTF_8);
        String urlString = properties.getProperty(URL) + SUGGESTED_SEVERITY;
        urlString = urlString.replaceAll(":title", titleEncoded);
        String response = doHttpCall(urlString);
        return SeverityLevel.valueOf(response.toUpperCase());
    }

    @Override
    public IssueType predictIssueType(String title) throws AiServiceException {
        String titleEncoded = URLEncoder.encode(title, StandardCharsets.UTF_8);
        String urlString = properties.getProperty(URL) + SUGGESTED_TYPE;
        urlString = urlString.replaceAll(":title", titleEncoded);
        String response = doHttpCall(urlString);
        return IssueType.valueOf(response);
    }

    @Override
    public ProfanityLevel predictProfanityLevel(String text) throws AiServiceException {
        String textEncoded = URLEncoder.encode(text, StandardCharsets.UTF_8);
        String urlString = properties.getProperty(URL) + IS_OFFENSIVE;
        urlString = urlString.replaceAll(":text", textEncoded);
        double probability = Double.parseDouble(doHttpCall(urlString));
        if (probability < OFFENSIVE_THRESHOLD) {
            return ProfanityLevel.NOT_OFFENSIVE;
        }
        return ProfanityLevel.OFFENSIVE;
    }

    private String doHttpCall(String urlString) throws AiServiceException {
        try {
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String response = in.readLine();
            in.close();

            connection.disconnect();

            return response;
        } catch (IOException e) {
            throw new AiServiceException(e.getMessage());
        }
    }
}
