from config import api, router, db

app = api.init_app()
router.set_routes()
db.init_db()
