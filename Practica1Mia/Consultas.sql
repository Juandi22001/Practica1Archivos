     
    

   
   #Consulta 1
   select SUM(pr.Precio_Producto * Orden.Cantidad) AS Total,px.nombre_Proveedor,px.telefono_Proveedor,v.id
 from  Orden_Defx as Orden
INNER JOIN Productos AS pr ON (Orden.Id_Producto =pr.id_P)
INNER JOIN Ordenv AS v ON (Orden.Id_Orden =v.id)
INNER JOIN Proveedor AS px ON (v.Id_Proveedor =px.id)
group by Orden.id ORDER BY Total DESC LIMIT 1;


    #Consulta2
  select Id_Cliente, Count( Id_Cliente) AS Total , px.nombre_Cliente
 from  Comprax AS C

INNER JOIN Cliente AS px ON (C.Id_Cliente = px.idCL)

group by Id_Cliente ORDER BY Total DESC LIMIT 1;
#Consulta 3

 ( select Count(idOrden)AS TotalD ,Re.NombreRegion,ci.nombre_Ciudad, di.Direccion,co.CodigoPostal
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
);

#Consulta 4
  (select Id_Cliente, Count( Id_Cliente) AS Total , cx.nombre_Cliente
 from  Comprax AS C

INNER JOIN Cliente AS cx ON (C.Id_Cliente = cx.idCL)
INNER JOIN Compra_Defx AS dx ON (C.id = dx.Id_Compra)
INNER JOIN Productos AS pr ON (dx.Id_Producto =pr.id_P)
INNER JOIN CategoriaProducto AS ca ON (pr.tipo_Producto=ca.id)
WHERE ca.nombre_P='Cheese'




group by id_Cliente ORDER BY Total DESC LIMIT 5)

;

#Consulta 5
   (select EXTRACT(MONTH FROM px.fecha_Registro)AS MES, sum( C.TotalCompra) AS Total , px.nombre_Cliente
 from  Comprax AS C

INNER JOIN Cliente AS px ON (C.Id_Cliente = px.idCL)

group by Id_Cliente ORDER BY Total DESC LIMIT 5)
UNION   (select EXTRACT(MONTH FROM px.fecha_Registro)AS MES, sum( C.TotalCompra) AS Total , px.nombre_Cliente
 from  Comprax AS C

INNER JOIN Cliente AS px ON (C.Id_Cliente = px.idCL)

group by Id_Cliente ORDER BY Total ASC LIMIT 5)

;


#Consulta 6

 (select SUM( Orden.PRECIO*Orden.Cantidad) AS Total,ca.nombre_P
 from  Orden_Defx as Orden
INNER JOIN Productos AS pr ON (Orden.Id_Producto =pr.id_P)
INNER JOIN CategoriaProducto AS ca ON (pr.tipo_Producto =ca.id)

group by Orden.id ORDER BY Total desc LIMIT 5);
#Consulta 7
  (select C.Id_Proveedor, Count( C.TotalOrden) AS Total , cx.nombre_Proveedor
 from  Ordenv AS C

INNER JOIN Orden_Defx AS co ON ( C.id=co.Id_Orden)

INNER JOIN Proveedor AS cx ON (C.Id_Proveedor = cx.id)
INNER JOIN Productos AS pr ON (co.Id_Producto =pr.id_P)
INNER JOIN CategoriaProducto AS ca ON (pr.tipo_Producto=ca.id)
WHERE ca.nombre_P='Fresh Vegetables'




group by C.Id_Proveedor ORDER BY Total DESC LIMIT 5);
#Consulta 8
 (select Id_Cliente, SUM(C.TotalCompra*C.Cantidad) AS Total , px.nombre_Cliente,px.Direccion_P,px.Region,px.Ciudad,px.CodigoPostal
 from  Comprax AS C

INNER JOIN Cliente AS px ON (C.Id_Cliente = px.idCL)

group by Id_Cliente ORDER BY Total DESC LIMIT 5)
UNION ( select Id_Cliente, SUM(C.TotalCompra*C.Cantidad) AS Total , px.nombre_Cliente,px.Direccion_P,px.Region,px.Ciudad,px.CodigoPostal
 from  Comprax AS C

INNER JOIN Cliente AS px ON (C.Id_Cliente = px.idCL)

group by Id_Cliente ORDER BY Total ASC LIMIT 5)
;
#Consulta 9
  select SUM( Ordenv.Cantidad) AS Total,Proveedor.nombre_Proveedor,Proveedor.telefono_Proveedor
 from  Ordenv 


LEFT JOIN Proveedor  ON (Ordenv.Id_Proveedor =Proveedor.id)
LEFT JOIN Orden_Defx  ON (Ordenv.id =Orden_Defx.Id_Orden)
LEFT JOIN Producto  ON (Orden_Defx.Id_Producto =Producto.id_P)

group by Ordenv.id ORDER BY Total ASC LIMIT 12;
#Consulta10
select Cliente.nombre_Cliente,SUM(Comprax.Cantidad) AS Total
 from  Comprax 
LEFT JOIN Compra_Defx   ON (Compra_Defx.Id_Compra =Comprax.id)
LEFT JOIN Cliente  ON (Comprax.Id_Cliente = Cliente.idCL)
LEFT JOIN Productos  ON (Compra_Defx.Id_Producto =Productos.id_P )
LEFT JOIN CategoriaProducto  ON (Productos.tipo_Producto = CategoriaProducto.id)
WHERE CategoriaProducto.nombre_P="Seafood"
group by Cliente.nombre_Cliente ORDER BY Total DESC LIMIT 10;