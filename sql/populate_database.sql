INSERT INTO Categories
VALUES
	(1, 'Coches','Coches a tutiplen','/images/Mustang.jpg'),
	(2, 'Animales','Animales de todo tipo','/images/Jaguar.jpg');

INSERT INTO Photos
VALUES
	(1, 1, 'Desierto del Sahara', 'Esta es una foto del viaje a Africa de este verano', '/images/Desierto.jpg','2012-04-23 18:25:43','Coches','Public'),
	(2, 1, 'New York', 'Foto de nuestro viaje a EEUU', '/images/newyork.jpg','2012-04-23 18:25:43','Coches','Public');

INSERT INTO Users
VALUES
	(1, "Pedro Luis", "Soto Santos", "pepoluis712@gmail.com", "626773623", "Pepo12", "12345","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStWNYPcC45wZL_Gr6MKWJNK4fPOWqIFyGmUD6a9qgV98qSxHrW7mwHCQGNhASBeHZP5gs&usqp=CAU",null,null,null);

INSERT INTO Comments
VALUES
	(1, "Que bonita foto", 1, 1);