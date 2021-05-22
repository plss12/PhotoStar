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
    route="/photos/categories/$category",
    method="GET",
    sql="SELECT * FROM Photos WHERE category=$category"
)
def get_by_category():
    pass

############################

@endpoint(
    route="/photos/users/$userId",
    method="GET",
    sql="SELECT * FROM Photos WHERE userId=$userId"
)
def get_by_user():
    pass

############################
  
@endpoint(
    route="/photos",
    method="POST",
    sql="INSERT INTO Photos (userId, title, description, url, category, visibility) VALUES ($userId, $title, $description, $url, $category, $visibility)",
    description="Creates a new photo",
)
def create(userId, title, description, url, category, visibility):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="PUT",
    sql="UPDATE Photos SET userId=$userId, title = $title, description = $description, url = $url, category = $category, visibility = $visibility WHERE photoId = $photoId",
    description="Updates an existing photo",
)
def update(userId, title, description, url, category, visibility):
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
    