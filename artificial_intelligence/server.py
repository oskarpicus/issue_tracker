import os

from flask import Flask, request

from artificial_intelligence.ai_models.LabelClassifier import LabelClassifier
from artificial_intelligence.ai_models.SeverityClassifier import SeverityClassifier
from artificial_intelligence.service.Service import Service

app = Flask("Bugsby Artificial Intelligence API")
severity_classifier = SeverityClassifier("resources/aiModels/severityModel.joblib")
label_classifier = LabelClassifier("resources/aiModels/labelModel.joblib")
service = Service(severity_classifier, label_classifier)


@app.route("/suggested-severity")
def get_suggested_severity():
    title = request.args.get("title")
    result = service.compute_suggested_severity(title)
    return result.name


@app.route("/suggested-type")
def get_suggested_type():
    title = request.args.get("title")
    return service.computed_suggested_type(title)


if __name__ == "__main__":
    port = os.environ.get("PORT", 5000)
    app.run(debug=True, host="0.0.0.0", port=port)
