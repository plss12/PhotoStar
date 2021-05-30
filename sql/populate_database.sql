INSERT INTO Categories
VALUES
	(1, 'Coches','Coches a tutiplen','/images/Mustang.jpg'),
	(2, 'Animales','Animales de todo tipo','/images/Jaguar.jpg'),
	(3, 'Paisajes','Los paisajes mas bonitos','/images/jordania.jpg'),
	(4, 'Deporte','Deportistas de todo tipo','/images/Skate.jpg'),
	(5, 'Comida','Deliciosa comida','/images/Burguer.jpg'),
	(6, 'Naturaleza','Naturaleza en estado puro','/images/Lago.jpg'),
	(7, 'Arte','Bonitas piezas artísticas','/images/Cuadro.jpg');

INSERT INTO Photos
VALUES
	(1, 1, 'Desierto del Sahara', 'Esta es una foto del viaje a Africa de este verano', '/images/Desierto.jpg','2012-01-23 18:25:43','Naturaleza','Public'),
	(2, 1, 'New York', 'Foto de nuestro viaje a EEUU', '/images/newyork.jpg','2020-04-23 18:25:43','Paisajes','Public'),
	(3, 2, 'Vaquitas', 'Bonitas vacas pastando', '/images/vaca.jpg','2020-06-23 18:25:43','Animales','Public');




INSERT INTO Users
VALUES
	(1, "Pedro Luis", "Soto Santos", "pepoluis712@gmail.com", "626773623", "Pepo12", "12345","/images/Vonderhaar.png"),
	(2, "Andrea", "Herrerias León", "jandrea7@gmail.com", "6669122578", "Jandrea7", "12345","/images/westbrook.jpg");


INSERT INTO Comments
VALUES
	(1, "Que bonita foto", 1, 1),
	(2, "Me encanta la vaquita", 3, 1);

INSERT INTO Valorations
VALUES
	(1, 1, 1, 5),
	(2, 1, 2, 5),
	(3, 2, 1, 3),
	(4, 2, 2, 4);