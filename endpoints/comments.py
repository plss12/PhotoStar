from silence.decorators import endpoint

@endpoint(
    route="/comments",
    method="GET",
    sql="SELECT * FROM Comments"
)
def get_all():
    pass
############################

@endpoint(
    route="/comments/$photoId",
    method="GET",
    sql="SELECT * FROM Comments WHERE photoId=$photoId"
)
def get_by_photoid():
    pass

############################
  
@endpoint(
    route="/comments",
    method="POST",
    sql="INSERT INTO Comments (text, photoId, userId) VALUES ($text, $photoId, $userId)",
    description="Creates a new comments",
)
def create(text, photoId, userId):
    pass

###############################################################################

@endpoint(
    route="/comments/$commentId",
    method="PUT",
    sql="UPDATE Comments SET text = $text, photoId = $photoId, userId = $userId WHERE commentId = $commentId",
    description="Updates an existing comment",
)
def update(text, photoId, userId):
    pass

###############################################################################

@endpoint(
    route="/comments/$commentId",
    method="DELETE",
    sql="DELETE FROM Comments WHERE commentId = $commentId",
    description="Removes a comment",
)
def delete():
    pass
    