package ai;

import exceptions.AiServiceException;
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
    private static final String SUGGESTED_SEVERITY = "suggested_severity";

    public HttpPredictor(Properties properties) {
        this.properties = properties;
    }

    @Override
    public SeverityLevel predictSeverityLevel(String title) throws AiServiceException {
        String titleEncoded = URLEncoder.encode(title, StandardCharsets.UTF_8);
        String urlString = properties.getProperty(SUGGESTED_SEVERITY).replaceAll(":title", titleEncoded);
        try {
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String response = in.readLine();
            in.close();

            connection.disconnect();

            return SeverityLevel.valueOf(response.toUpperCase());
        } catch (IOException e) {
            throw new AiServiceException(e.getMessage());
        }
    }
}
