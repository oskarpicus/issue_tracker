from flask import Flask, request

from artificial_intelligence.ai_models.SeverityClassifier import SeverityClassifier
from artificial_intelligence.service.Service import Service

app = Flask("Bugsby Artificial Intelligence API")
service = Service(SeverityClassifier("resources/aiModels/severityModel.joblib"))


@app.route("/suggested-severity")
def get_suggested_severity():
    title = request.args.get("title")
    result = service.compute_suggested_severity(title)
    return result.name


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
