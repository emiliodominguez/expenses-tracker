from config import init_app, init_db, set_routes

app = init_app()
init_db()
set_routes()
