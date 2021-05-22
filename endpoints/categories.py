from silence.decorators import endpoint

@endpoint(
    route="/categories",
    method="GET",
    sql="SELECT * FROM Categories"
)
def get_all():
    pass
############################

@endpoint(
    route="/categories/$categoryId",
    method="GET",
    sql="SELECT * FROM Categories WHERE categoryId=$categoryId"
)
def get_by_id():
    pass

############################
  
@endpoint(
    route="/categories",
    method="POST",
    sql="INSERT INTO Categories (name, descripcion, foto) VALUES ($name, $descripcion, $foto)",
    description="Creates a new category",
)
def create(name, descripcion, foto):
    pass

###############################################################################

@endpoint(
    route="/categories/$categoryId",
    method="PUT",
    sql="UPDATE Categories SET name = $name, descripcion = $descripcion, foto = $foto WHERE categoryId = $categoryId",
    description="Updates an existing category",
)
def update(name, descripcion, foto):
    pass

###############################################################################

@endpoint(
    route="/categories/$categoryId",
    method="DELETE",
    sql="DELETE FROM Categories WHERE categoryId = $categoryId",
    description="Removes a category",
)
def delete():
    pass
    