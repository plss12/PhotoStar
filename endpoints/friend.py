from silence.decorators import endpoint

@endpoint(
    route="/friends",
    method="GET",
    sql="SELECT * FROM Friends"
)
def get_all():
    pass
############################

@endpoint(
    route="/friends/follows/$userId1",
    method="GET",
    sql="SELECT userId2 FROM Friends WHERE userId1=$userId1"
)
def get_follows():
    pass

############################

@endpoint(
    route="/friends/followers/$userId1",
    method="GET",
    sql="SELECT userId1 FROM Friends WHERE userId2=$userId1"
)
def get_followers():
    pass

############################
  
@endpoint(
    route="/friends",
    method="POST",
    sql="INSERT INTO Friends (userId1, userId2) VALUES ($userId1, $userId2)",
    description="Creates a new friends",
)
def create(userId1, userId2):
    pass

###############################################################################


@endpoint(
    route="/friends/$userId1/$userId2",
    method="DELETE",
    sql="DELETE FROM Friends WHERE userId1 = $userId1 AND userId2=$userId2",
    description="Removes a comment",
)
def delete():
    pass
    