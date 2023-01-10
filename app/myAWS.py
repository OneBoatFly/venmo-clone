import boto3
import botocore
import os
import uuid
import traceback


s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", 'webp'}

def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def delete_file_from_s3(userId):
    folder = s3.list_objects(Bucket=BUCKET_NAME, Prefix=f"{userId}/")
    print('folder ------------- ', folder)
    print("folder['Contents']", folder['Contents'])

    if folder and 'Contents' in folder:
        for obj in folder['Contents']:
            s3.delete_object(Bucket=BUCKET_NAME, Key=obj['Key'])


def upload_file_to_s3(file, userId, acl="public-read"):
    print('------ upload_file_to_s3 -------')
    print(file)
    print(userId)
    folder_file_path = f'{userId}/{file.filename}'
    print('folder_file_path ------', folder_file_path)
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            folder_file_path,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        traceback.print_exc()
        print('upload_fileobj error --------', e)
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{folder_file_path}"}
