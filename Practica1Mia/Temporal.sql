load data infile '/var/lib/mysql-files/DataCenterData.csv' into table Temporals
    columns terminated by ';'
    optionally enclosed by '"'
    lines terminated by '\n'
    ignore 1 lines
    (nombre_Compania, contacto_Compania, correo_Compania,telefono_Compania,tipo,nombre,CorreoC,
    Telefono, @date_time_variable, Direccion,ciudad, codigoPostal, Region, Producto,CategoriaProducto, cantidad, precio)
    SET Fecha = STR_TO_DATE(@date_time_variable, '%d/%m/%Y');

CREATE TABLE  Temporals(
	nombre_Compania VARCHAR(200),
	contacto_Compania VARCHAR(200),
	correo_Compania VARCHAR(200),
	telefono_Compania VARCHAR(200),
tipo char(200),
nombre VARCHAR(200),
CorreoC VARCHAR(200),
Telefono VARCHAR(200),
Fecha DATE ,
Direccion VARCHAR(200),
ciudad VARCHAR(200),
codigoPostal INT NOT NULL,
Region VARCHAR(200),
Producto VARCHAR(200),
CategoriaProducto VARCHAR(200),
cantidad INT NOT NULL,
precio DECIMAL(10,2)


);
