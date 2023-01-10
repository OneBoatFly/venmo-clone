from flask import Blueprint, request
from app.models import db
from flask_login import current_user, login_required
from app.myAWS import upload_file_to_s3, allowed_file, get_unique_filename, delete_file_from_s3

image_routes = Blueprint("images", __name__)


@image_routes.route("", methods=["DELETE"])
@login_required
def delete_image():
    # print('---------', 'upload image route')

    delete_file_from_s3(current_user.id)
    return 'success'


@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
    print('---------', 'upload image route')
    if "image" not in request.files:
        print('------ no image')
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        print('----- file not permitted')
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image, current_user.id)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        # print('upload to aws error', upload)
        return upload, 400

    # print('upload to aws success', upload)
    print('---- url ----', upload['url'])
    url = upload["url"]
    # flask_login allows us to get the current user from the request
    current_user.image_url = url
    db.session.commit()
    return {"url": url, "user": current_user.to_dict_luxury()}