from routes import user, account, category, expense


def set_routes() -> None:
    """Initializes the routes"""
    user.UsersController()
    account.AccountsController()
    category.CategoriesController()
    expense.ExpensesController()
    print("🚀   Routes initialized")
