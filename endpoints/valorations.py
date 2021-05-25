from silence.decorators import endpoint

@endpoint(
    route="/valorations",
    method="GET",
    sql="SELECT * FROM Valorations"
)
def get_all():
    pass
############################

@endpoint(
    route="/valorations/$photoId",
    method="GET",
    sql="SELECT * FROM Valorations WHERE photoId=$photoId"
)
def get_by_photoid():
    pass

############################
  
@endpoint(
    route="/valorations",
    method="POST",
    sql="INSERT INTO Valorations (value, photoId, userId) VALUES ($value, $photoId, $userId)",
    description="Creates a new valoration",
)
def create(value, photoId, userId):
    pass

###############################################################################

@endpoint(
    route="/valorations/$valorationId",
    method="PUT",
    sql="UPDATE Valorations SET value = $value, photoId = $photoId, userId = $userId WHERE valorationId = $valorationId",
    description="Updates an existing valoration",
)
def update(value, photoId, userId):
    pass

###############################################################################

@endpoint(
    route="/valorations/$valorationId",
    method="DELETE",
    sql="DELETE FROM Valorations WHERE valorationId = $valorationId",
    description="Removes a valoration",
)
def delete():
    pass
    