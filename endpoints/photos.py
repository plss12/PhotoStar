from silence.decorators import endpoint

@endpoint(
    route="/photos",
    method="GET",
    sql="SELECT * FROM Photos"
)
def get_all():
    pass
############################

@endpoint(
    route="/photos/$photoId",
    method="GET",
    sql="SELECT * FROM Photos WHERE photoId=$photoId"
)
def get_by_id():
    pass

############################
  
@endpoint(
    route="/photos",
    method="POST",
    sql="INSERT INTO Photos (title, description, url, category) VALUES ($title, $description, $url, $category)",
    description="Creates a new photo",
)
def create(title, description, url, category):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="PUT",
    sql="UPDATE Photos SET title = $title, description = $description, url = $url, category = $category WHERE photoId = $photoId",
    description="Updates an existing photo",
)
def update(title, description, url, category):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="DELETE",
    sql="DELETE FROM Photos WHERE photoId = $photoId",
    description="Removes a photo",
)
def delete():
    pass
    