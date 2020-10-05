const express = require('express')
const app = express()
const under = require('underscore');
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS"
  );
  next();
}); app.listen(4100);


var base = require('mysql')

var conect = base.createConnection({
  host: 'localhost',
  user: 'root'
  , password: 'root',
  database: 'PracticaCool',
  multipleStatements: true,
  port: 3306



})











app.get('/eliminarModelo', async function (req, res) {
  var consulta = `DROP DATABASE PracticaCool;
  CREATE DATE  BASE PracticaCool `
  
  conect.query(consulta, async function (err, results) {

    if (err) {

      console.log("efee")
      console.log(err)
    } else {

      console.log(JSON.stringify(results))
      res.send(results)
      console.log("siii")
    }


  })


})





app.get('/eliminarModelo', async function (req, res) {
  var consulta = `DROP TABLE Temporals`

  conect.query(consulta, async function (err, results) {

    if (err) {

      console.log("efee")
      console.log(err)
    } else {

      console.log(JSON.stringify(results))
      res.send(results)
      console.log("siii")
    }


  })


})







app.get('/consulta1', async function (req, res) {
  var consulta = `select SUM(pr.Precio_Producto * Orden.PRECIO) AS Total,px.nombre_Proveedor,px.telefono_Proveedor,v.id
from  Orden_Defx as Orden
INNER JOIN Productos AS pr ON (Orden.Id_Producto =pr.id_P)
INNER JOIN Ordenv AS v ON (Orden.Id_Orden =v.id)
INNER JOIN Proveedor AS px ON (v.Id_Proveedor =px.id)
group by Orden.id ORDER BY Total DESC LIMIT 1;`

  conect.query(consulta, async function (err, results) {

    if (err) {

      console.log("efee")
      console.log(err)
    } else {

      console.log(JSON.stringify(results))
      res.send(results)
      console.log("siii")
    }


  })


})


app.get('/consulta2', async function (req, res) {
  var consulta = `  select Id_Cliente, Count( Id_Cliente) AS Total , px.nombre_Cliente
    from  Comprax AS C
   
   INNER JOIN Cliente AS px ON (C.Id_Cliente = px.idCL)
   
   group by Id_Cliente ORDER BY Total DESC LIMIT 1;
   `

  conect.query(consulta, async function (err, results) {

    if (err) {

      console.log("efee")
      console.log(err)
    } else {

      console.log(JSON.stringify(results))
      res.send(results)
      console.log("siii")
    }


  })


})




app.get('/consulta3', async function (req, res) {
  var consulta = `( select Count(idOrden)AS TotalD ,Re.NombreRegion,ci.nombre_Ciudad, di.Direccion,co.CodigoPostal
      from  Ordenv1x
     
     INNER JOIN Proveedor AS px ON (Ordenv1x.Id_Proveedor = px.id)
     INNER JOIN Region AS Re ON (px.Region = Re.NombreRegion)
     INNER JOIN Ciudad AS ci ON (px.Ciudad = ci.nombre_Ciudad)
     INNER JOIN Direccion AS di ON (px.Direccion_P = di.Direccion)
     INNER JOIN CodigoPostal  co ON (px.CodigoPostal= co.CodigoPostal)
     
     group by Re.NombreRegion,ci.nombre_Ciudad, di.Direccion,co.CodigoPostal ORDER BY TotalD Desc lIMIT
     2)
     UNION(
     
       select Count(idOrden)AS TotalD ,Re.NombreRegion,ci.nombre_Ciudad, di.Direccion,co.CodigoPostal
      from  Ordenv1x
     
     INNER JOIN Proveedor AS px ON (Ordenv1x.Id_Proveedor = px.id)
     INNER JOIN Region AS Re ON (px.Region = Re.NombreRegion)
     INNER JOIN Ciudad AS ci ON (px.Ciudad = ci.nombre_Ciudad)
     INNER JOIN Direccion AS di ON (px.Direccion_P = di.Direccion)
     INNER JOIN CodigoPostal  co ON (px.CodigoPostal= co.CodigoPostal)
     
     group by Re.NombreRegion,ci.nombre_Ciudad, di.Direccion,co.CodigoPostal ORDER BY TotalD ASC lIMIT
     2
     );`

  conect.query(consulta, async function (err, results) {

    if (err) {

      console.log("efee")
      console.log(err)
    } else {

      console.log(JSON.stringify(results))
      res.send(results)
      console.log("siii")
    }


  })


})






app.get('/consulta4', async function (req, res) {
  var consulta = ` (select Id_Cliente, Count( Id_Cliente) AS Total , cx.nombre_Cliente
        from  Comprax AS C
       
       INNER JOIN Cliente AS cx ON (C.Id_Cliente = cx.idCL)
       INNER JOIN Compra_Defx AS dx ON (C.id = dx.Id_Compra)
       INNER JOIN Productos AS pr ON (dx.Id_Producto =pr.id_P)
       INNER JOIN CategoriaProducto AS ca ON (pr.tipo_Producto=ca.id)
       WHERE ca.nombre_P='Cheese'
       
       
       
       
       group by id_Cliente ORDER BY Total DESC LIMIT 5)
       
       ;`

  conect.query(consulta, async function (err, results) {

    if (err) {

      console.log("efee")
      console.log(err)
    } else {

      console.log(JSON.stringify(results))
      res.send(results)
      console.log("siii")
    }


  })


})





app.get('/consulta5', async function (req, res) {
  var consulta = `   (select EXTRACT(MONTH FROM px.fecha_Registro)AS MES, sum( C.TotalCompra) AS Total , px.nombre_Cliente
          from  Comprax AS C
         
         INNER JOIN Cliente AS px ON (C.Id_Cliente = px.idCL)
         
         group by Id_Cliente ORDER BY Total DESC LIMIT 5)
         UNION   (select EXTRACT(MONTH FROM px.fecha_Registro)AS MES, sum( C.TotalCompra) AS Total , px.nombre_Cliente
          from  Comprax AS C
         
         INNER JOIN Cliente AS px ON (C.Id_Cliente = px.idCL)
         
         group by Id_Cliente ORDER BY Total ASC LIMIT 5)
         
         ;
         
         `

  conect.query(consulta, async function (err, results) {

    if (err) {

      console.log("efee")
      console.log(err)
    } else {

      console.log(JSON.stringify(results))
      res.send(results)
      console.log("siii")
    }


  })


})





app.get('/consulta6', async function (req, res) {
  var consulta = `
            (select SUM( Orden.PRECIO*Orden.Cantidad) AS Total,ca.nombre_P
            from  Orden_Defx as Orden
           INNER JOIN Productos AS pr ON (Orden.Id_Producto =pr.id_P)
           INNER JOIN CategoriaProducto AS ca ON (pr.tipo_Producto =ca.id)
           
           group by Orden.id ORDER BY Total desc LIMIT 5);`

  conect.query(consulta, async function (err, results) {

    if (err) {

      console.log("efee")
      console.log(err)
    } else {

      console.log(JSON.stringify(results))
      res.send(results)
      console.log("siii")
    }


  })


})



app.get('/consulta7', async function (req, res) {
  var consulta = `  (select C.Id_Proveedor, Count( C.TotalOrden) AS Total , cx.nombre_Proveedor
              from  Ordenv AS C
             
             INNER JOIN Orden_Defx AS co ON ( C.id=co.Id_Orden)
             
             INNER JOIN Proveedor AS cx ON (C.Id_Proveedor = cx.id)
             INNER JOIN Productos AS pr ON (co.Id_Producto =pr.id_P)
             INNER JOIN CategoriaProducto AS ca ON (pr.tipo_Producto=ca.id)
             WHERE ca.nombre_P='Fresh Vegetables'
             
             
             
             
             group by C.Id_Proveedor ORDER BY Total DESC LIMIT 5);`

  conect.query(consulta, async function (err, results) {

    if (err) {

      console.log("efee")
      console.log(err)
    } else {

      console.log(JSON.stringify(results))
      res.send(results)
      console.log("siii")
    }


  })


})




app.get('/consulta8', async function (req, res) {
  var consulta = `(select Id_Cliente, SUM(C.TotalCompra*C.Cantidad) AS Total , px.nombre_Cliente,px.Direccion_P,px.Region,px.Ciudad,px.CodigoPostal
                from  Comprax AS C
               
               INNER JOIN Cliente AS px ON (C.Id_Cliente = px.idCL)
               
               group by Id_Cliente ORDER BY Total DESC LIMIT 5)
               UNION ( select Id_Cliente, SUM(C.TotalCompra*C.Cantidad) AS Total , px.nombre_Cliente,px.Direccion_P,px.Region,px.Ciudad,px.CodigoPostal
                from  Comprax AS C
               
               INNER JOIN Cliente AS px ON (C.Id_Cliente = px.idCL)
               
               group by Id_Cliente ORDER BY Total ASC LIMIT 5)
               ;`

  conect.query(consulta, async function (err, results) {

    if (err) {

      console.log("efee")
      console.log(err)
    } else {

      console.log(JSON.stringify(results))
      res.send(results)
      console.log("siii")
    }


  })


})




app.get('/consulta9', async function (req, res) {
  var consulta = `select SUM( Ordenv.Cantidad) AS Total,Proveedor.nombre_Proveedor,Proveedor.telefono_Proveedor
                  from  Ordenv 
                 
                 
                 LEFT JOIN Proveedor  ON (Ordenv.Id_Proveedor =Proveedor.id)
                 LEFT JOIN Orden_Defx  ON (Ordenv.id =Orden_Defx.Id_Orden)
                 LEFT JOIN Producto  ON (Orden_Defx.Id_Producto =Producto.id_P)
                 
                 group by Ordenv.id ORDER BY Total ASC LIMIT 12;`

  conect.query(consulta, async function (err, results) {

    if (err) {

      console.log("efee")
      console.log(err)
    } else {

      console.log(JSON.stringify(results))
      res.send(results)
      console.log("siii")
    }


  })


})




app.get('/consulta10', async function (req, res) {
  var consulta = `select Cliente.nombre_Cliente,SUM(Comprax.Cantidad) AS Total
                    from  Comprax 
                   LEFT JOIN Compra_Defx   ON (Compra_Defx.Id_Compra =Comprax.id)
                   LEFT JOIN Cliente  ON (Comprax.Id_Cliente = Cliente.idCL)
                   LEFT JOIN Productos  ON (Compra_Defx.Id_Producto =Productos.id_P )
                   LEFT JOIN CategoriaProducto  ON (Productos.tipo_Producto = CategoriaProducto.id)
                   WHERE CategoriaProducto.nombre_P="Seafood"
                   group by Cliente.nombre_Cliente ORDER BY Total DESC LIMIT 10;;`

  conect.query(consulta, async function (err, results) {

    if (err) {

      console.log("efee")
      console.log(err)
    } else {

      console.log(JSON.stringify(results))
      res.send(results)
      console.log("siii")
    }


  })


})




app.get('/cargarModelo', async function (req, res) {
  var consulta = `


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
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                     `

  conect.query(consulta, async function (err, results) {

    if (err) {

      console.log("efee")
      console.log(err)
    } else {

      console.log(JSON.stringify(results))
      res.send(results)
      console.log("siii")
    }


  })


})









app.get('/cargarTemporal', async function (req, res) {
  var consulta = `load data infile '/var/lib/mysql-files/DataCenterData.csv' into table Temporals
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
`

  conect.query(consulta, async function (err, results) {

    if (err) {

      console.log("efee")
      console.log(err)
    } else {

      console.log(JSON.stringify(results))
      res.send(results)
      console.log("siii")
    }


  })


})



