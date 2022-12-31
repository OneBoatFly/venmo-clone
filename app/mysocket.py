from flask_socketio import SocketIO, emit, join_room
import os

# cors setup to allow my website only under production, but everything under development
if os.environ.get("FLASK_ENV") == "production":
    origins = ["https://venmo-clone.onrender.com/"]
else:
    origins = ["*"]

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins="*")


# setting up event handler
    # join inbox
@socketio.on('inbox')
def handle_inbox(data):
    inbox = data['inbox']

    print(f'---------- setting up inbox: {inbox} ---------')
    join_room(inbox)


@socketio.on('notification')
def handle_notification(data):
    toUserId = data['to_user_id']
    notificationType = data['notification_type']

    print(f'------- sending notification to inbox-{toUserId} --------')
    emit('notification', notificationType, to=f'inbox-{toUserId}')