from fastapi import FastAPI
from fastapi_utils.inferring_router import InferringRouter


API_METHODS = {
    "GET": "Get Methods",
    "GET_BY_ID": "Get By ID Methods",
    "CREATE": "Create Methods",
    "UPDATE": "Update Methods",
    "DELETE": "Delete Methods"
}


TAGS_METADATA = [
    {
        "name": API_METHODS["GET"],
        "description": "Get all records from any given entity"},
    {
        "name": API_METHODS["GET_BY_ID"],
        "description": "Get a specific record from any given entity"
    },
    {
        "name": API_METHODS["CREATE"],
        "description": "Create records from any given entity"
    },
    {
        "name": API_METHODS["UPDATE"],
        "description": "Update records from any given entity"
    },
    {
        "name": API_METHODS["DELETE"],
        "description": "Delete records from any given entity"
    },
]

_app = FastAPI(openapi_tags=TAGS_METADATA)
router = InferringRouter()


def init_app() -> FastAPI:
    """## Initializes the API

    Returns:
        FastAPI: The Fast API instance
    """
    _app.include_router(router)
    print("🚀   API initialized")
    return _app
