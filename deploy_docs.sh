# Deploy docs to Google Cloud Storage
BUCKET_NAME=docs.askansari.ai

# Sync local build to bucket (-d deletes remote files not in source)
echo "Uploading site from $PWD/build/docs to gs://$BUCKET_NAME..."
gsutil -o "GSUtil:parallel_process_count=1" -m rsync -r -d $PWD/build/docs gs://$BUCKET_NAME
echo "Upload complete."

# Make your bucket public
gsutil iam ch allUsers:objectViewer gs://$BUCKET_NAME

# Set up a website configuration
gsutil web set -m index.html -e 404.html gs://$BUCKET_NAME

echo "Your site is available at https://$BUCKET_NAME"