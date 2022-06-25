from routes import user, account, card, category, expense


def set_routes() -> None:
    """Initializes the routes"""
    user.UsersController()
    account.AccountsController()
    card.CardsController()
    category.CategoriesController()
    expense.ExpensesController()
    print("🚀   Routes initialized")
