from flask_socketio import SocketIO
import os

# cors setup to allow my website only under production, but everything under development
if os.environ.get("FLASK_ENV") == "production":
    origins = ["https://venmo-clone.onrender.com/"]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)


# setting up event handler
@socketio.on('send-request')
def handler_request(to_user_id):
    # do sth
    pass