from fastapi import FastAPI
from fastapi_utils.inferring_router import InferringRouter

_app = FastAPI()
router = InferringRouter()

def init_app() -> FastAPI:
    _app.include_router(router)
    print("🚀   API initialized")
    return _app