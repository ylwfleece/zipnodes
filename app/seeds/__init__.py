from flask.cli import AppGroup
from .users import seed_users, undo_users
from .orders import seed_orders, undo_orders
from .applications import seed_applications, undo_applications
from .reviews import seed_reviews, undo_reviews
from .projects import seed_projects, undo_projects
from .purchases import seed_purchases, undo_purchases
from .politics import seed_politics, undo_politics

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_orders()
    seed_applications()
    seed_reviews()
    seed_projects()
    seed_purchases()
    seed_politics()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_orders()
    undo_applications()
    undo_reviews()
    undo_projects()
    undo_purchases()
    undo_politics()
