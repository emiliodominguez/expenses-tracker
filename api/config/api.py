from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_utils.inferring_router import InferringRouter

API_ORIGINS = [
    "*"
    # "http://localhost",
    # "http://localhost:3000",
    # "http://127.0.0.1:3000",
]


API_TAGS = {
    "GET": "Get Methods",
    "GET_BY_ID": "Get By ID Methods",
    "CREATE": "Create Methods",
    "UPDATE": "Update Methods",
    "DELETE": "Delete Methods"
}


TAGS_METADATA = [
    {
        "name": API_TAGS["GET"],
        "description": "Get all records from any given entity"},
    {
        "name": API_TAGS["GET_BY_ID"],
        "description": "Get a specific record from any given entity"
    },
    {
        "name": API_TAGS["CREATE"],
        "description": "Create records from any given entity"
    },
    {
        "name": API_TAGS["UPDATE"],
        "description": "Update records from any given entity"
    },
    {
        "name": API_TAGS["DELETE"],
        "description": "Delete records from any given entity"
    },
]

_app = FastAPI(openapi_tags=TAGS_METADATA)
_app.add_middleware(
    CORSMiddleware,
    allow_origins=API_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = InferringRouter()


def init_app() -> FastAPI:
    """## Initializes the API

    Returns:
        FastAPI: The Fast API instance
    """
    _app.include_router(router)
    print("🚀   API initialized")
    return _app
