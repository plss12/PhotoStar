from silence.decorators import endpoint

@endpoint(
    route="/users",
    method="GET",
    sql="SELECT * FROM Users"
)
def get_all():
    pass
############################

@endpoint(
    route="/users/$userId",
    method="GET",
    sql="SELECT * FROM Users WHERE userId=$userId"
)
def get_by_id():
    pass
