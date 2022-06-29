from routes import UsersController, AccountsController, CardsController, CategoriesController, MovementsController


def set_routes() -> None:
    """Initializes the routes"""
    UsersController()
    AccountsController()
    CardsController()
    CategoriesController()
    MovementsController()
    print("🚀   Routes initialized")
