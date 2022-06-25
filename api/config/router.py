from routes import user, account, category, expense


def set_routes() -> None:
    user.UsersController()
    account.AccountsController()
    category.CategoriesController()
    expense.ExpensesController()
    print("🚀   Routes initialized")
