from fastapi import FastAPI

from services.predict_dead_product import predict_dead_product
from services.predict_combo import predict_combo

app = FastAPI()


@app.get("/")
def home():
    return {"message": "AI Service Running"}


@app.post("/PredictDeadProduct")
def dead_product():

    predict_dead_product()

    return {
        "message": "Prediction completed"
    }


@app.post("/PredictCombo")
def combo():

    predict_combo()

    return {
        "message": "Combo recommendation completed"
    }