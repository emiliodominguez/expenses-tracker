from routes import user, account, card, category, movement


def set_routes() -> None:
    """Initializes the routes"""
    user.UsersController()
    account.AccountsController()
    card.CardsController()
    category.CategoriesController()
    movement.MovementsController()
    print("🚀   Routes initialized")
