


 USE PracticaCool;

    
    CREATE TABLE CategoriaProducto(
	id INT NOT NULL AUTO_INCREMENT,
    
    nombre_P VARCHAR(200),
    PRIMARY KEY(id)
	);
    
  
        
INSERT INTO CategoriaProducto (nombre_P) SELECT distinct Temporals.CategoriaProducto from Temporals;


    INSERT INTO Ciudad (nombre_Ciudad) SELECT distinct ciudad from Temporals;

    

  CREATE TABLE Ciudad(
	id INT NOT NULL AUTO_INCREMENT,
    
    nombre_Ciudad VARCHAR(200),
    PRIMARY KEY(id)
	);
    
    
  CREATE TABLE Direccion(
	id INT NOT NULL AUTO_INCREMENT,
    
   Direccion  varchar(200),
    PRIMARY KEY(id)
	);
    INSERT INTO Direccion (Direccion) SELECT distinct Direccion from Temporals;
      
    

  CREATE TABLE CodigoPostal(
	id INT NOT NULL AUTO_INCREMENT,
    
    CodigoPostal INT NOT NULL,
    PRIMARY KEY(id)
	);
    
    
    
    INSERT INTO CodigoPostal (CodigoPostal) SELECT distinct codigoPostal from Temporals;

    
  CREATE TABLE Region(
	 
   Region VARCHAR(100),
   );
    
    
    
    INSERT INTO Region (Region) SELECT distinct Region from Temporals;

    
    
    CREATE TABLE Productos(
	id_P INT NOT NULL AUTO_INCREMENT,
    
    nombre_Producto VARCHAR(200),
    
    tipo_Producto INT NOT NULL,
    Precio_Producto  DECIMAL(10,2),
    
    PRIMARY KEY(id_P),
    FOREIGN KEY(tipo_Producto) references TipoProducto(id)
	);
    
    INSERT INTO Productos (nombre_Producto,tipo_Producto,Precio_Producto)
    SELECT distinct Temporals.Producto,CategoriaProducto.id,precio
    from Temporals,CategoriaProducto
    WHERE CategoriaProducto.nombre_P=Temporals.CategoriaProducto;


 
  CREATE TABLE Proveedor(
	id INT NOT NULL AUTO_INCREMENT,
    
    nombre_Proveedor VARCHAR(200),
     correo_Proveedor VARCHAR(200), telefono_Proveedor VARCHAR(200), fecha_Registro date,Direccion_P VARCHAR(200),
      Ciudad VARCHAR(200) ,CodigoPostal INT NOT NULL, Region VARCHAR(200),
    PRIMARY KEY(id)
	);
     INSERT INTO Proveedor (nombre_Proveedor,correo_Proveedor,telefono_Proveedor,fecha_Registro,Direccion_P,Ciudad,
     CodigoPostal,Region) SELECT distinct nombre ,CorreoC,Telefono,Fecha,Direccion,ciudad,codigoPostal,Region
     from Temporals
     where Temporals.tipo="P";
     
     
      CREATE TABLE Cliente(
	idCL INT NOT NULL AUTO_INCREMENT,
    
    nombre_Cliente VARCHAR(200),
     correo_Cliente VARCHAR(200), telefono_Cliente VARCHAR(200), fecha_Registro date,Direccion_P VARCHAR(200),
      Ciudad VARCHAR(200) ,CodigoPostal INT NOT NULL, Region VARCHAR(200),
    PRIMARY KEY(id)
	);
    
 INSERT INTO Cliente (nombre_Cliente,correo_Cliente,telefono_Cliente,fecha_Registro,Direccion_P,Ciudad,
     CodigoPostal,Region) SELECT distinct nombre ,CorreoC,Telefono,Fecha,Direccion,ciudad,codigoPostal,Region
     from Temporals
     where Temporals.tipo="C";
     
     
      CREATE TABLE Compania(
	idC INT NOT NULL AUTO_INCREMENT,
    
    nombre_Compania VARCHAR(200),contactoCompania VARCHAR(200),
     correo_Compania VARCHAR(200), telefono_Compania VARCHAR(200), 

    PRIMARY KEY(id)
	);
    
    

 INSERT INTO Compania (nombre_Compania,contactoCompania,correo_Compania,telefono_Compania) SELECT distinct nombre_Compania,contacto_Compania,
correo_Compania,telefono_Compania 
     from Temporals;
    
     
  
USE PracticaCool;
  CREATE TABLE Ordenv(
	id INT NOT NULL AUTO_INCREMENT,
	TotalOrden DECIMAL(10,2),
       Cantidad INT NOT NULL,
    Id_Compania INT NOT NULL,
    Id_Proveedor INT NOT NULL,
       FOREIGN KEY(Id_Compania) references Compania(idC),
  FOREIGN KEY(Id_Proveedor) references Proveedor(id),

    PRIMARY KEY(id)
	);

INSERT INTO Ordenv(TotalOrden,Cantidad,Id_Compania,Id_Proveedor) SELECT distinct Temporals.precio,Temporals.cantidad,Compania.idC,Proveedor.id
     from Temporals,Compania,Proveedor
    WHERE  Temporals.nombre= Proveedor.nombre_Proveedor AND Temporals.nombre_Compania=Compania.nombre_Compania;
    
    
CREATE TABLE Ordenv1x(
	idOrden INT NOT NULL AUTO_INCREMENT,
	TotalOrden DECIMAL(10,2),
       Cantidad INT NOT NULL,
    Id_Compania INT NOT NULL,
    Id_Proveedor INT NOT NULL,
       FOREIGN KEY(Id_Compania) references Compania(idC),
  FOREIGN KEY(Id_Proveedor) references Proveedor(id),

    PRIMARY KEY(idOrden)
	);

INSERT INTO Ordenv1x(TotalOrden,Cantidad,Id_Compania,Id_Proveedor) SELECT distinct Temporals.precio,Temporals.cantidad,Compania.idC,Proveedor.id
     from Temporals,Compania,Proveedor
    WHERE  Temporals.nombre= Proveedor.nombre_Proveedor AND Temporals.nombre_Compania=Compania.nombre_Compania;
    
    
 USE PracticaCool;
CREATE TABLE Orden_Defx(
	id INT NOT NULL AUTO_INCREMENT,
      Cantidad INT NOT NULL,
    
	PRECIO DECIMAL(10,2),
  
    Id_Orden INT NOT NULL,
    Id_Producto INT NOT NULL,
       FOREIGN KEY(Id_Orden) references Ordenv(id),
  FOREIGN KEY(Id_Producto) references Producto(id_P),

    PRIMARY KEY(id)
	);

;
INSERT INTO Orden_Defx(Cantidad,PRECIO,Id_Orden,Id_Producto) SELECT distinct Cantidad,Productos.Precio_Producto,Ordenv.id,Productos.id_P
     from Ordenv,Productos
    WHERE  Productos.Precio_Producto=Ordenv.TotalOrden
   
    
    

USE PracticaCool;
   

CREATE TABLE Comprax(
	id INT NOT NULL AUTO_INCREMENT,
	TotalCompra DECIMAL(10,2),
    Cantidad INT NOT NULL,
    
    Id_Compania INT NOT NULL,
    Id_Cliente INT NOT NULL,
       FOREIGN KEY(Id_Compania) references Compania(idC),
  FOREIGN KEY(Id_Cliente) references Cliente(idCL),

    PRIMARY KEY(id)
	);
    
    

  INSERT INTO Comprax(TotalCompra,Cantidad,Id_Compania,Id_Cliente) SELECT distinct Temporals.precio,Temporals.cantidad,Compania.idC,Cliente.idCL
     from Temporals,Compania,Cliente
    WHERE  Temporals.nombre= Cliente.nombre_Cliente AND Temporals.nombre_Compania=Compania.nombre_Compania;
       USE PracticaCool;
CREATE TABLE Compra_Defx(
	id INT NOT NULL AUTO_INCREMENT,
      Cantidad INT NOT NULL,
    
	PRECIO DECIMAL(10,2),
  
    Id_Compra INT NOT NULL,
    Id_Producto INT NOT NULL,
       FOREIGN KEY(Id_Compra) references Comprax(id),
  FOREIGN KEY(Id_Producto) references Producto(id_P),

    PRIMARY KEY(id)
	);


INSERT INTO Compra_Defx(Cantidad,PRECIO,Id_Compra,Id_Producto) SELECT distinct Cantidad,Productos.Precio_Producto,Comprax.id,Productos.id_P
     from Comprax,Productos
    WHERE  Productos.Precio_Producto= Comprax.TotalCompra;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
