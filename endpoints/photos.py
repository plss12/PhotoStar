from silence.decorators import endpoint

@endpoint(
    route="/photos",
    method="GET",
    sql="SELECT * FROM Photos ORDER BY date DESC"
)
def get_all():
    pass
############################

@endpoint(
    route="/photos/visibility/$visibility",
    method="GET",
    sql="SELECT * FROM Photos WHERE visibility=$visibility ORDER BY date DESC"
)
def get_all_visibility():
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
    sql="SELECT * FROM Photos WHERE category=$category ORDER BY date DESC"
)
def get_by_category():
    pass

############################

@endpoint(
    route="/photos/users/$userId",
    method="GET",
    sql="SELECT * FROM Photos WHERE userId=$userId ORDER BY date DESC"
)
def get_by_user():
    pass

############################

@endpoint(
    route="/photos/week",
    method="GET",
    sql="SELECT * FROM Photos WHERE (date BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW()) AND visibility='Public' ORDER BY date DESC"
)
def get_this_week():
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
    