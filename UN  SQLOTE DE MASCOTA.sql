Create database Junior
go

Create table Mascotas
(
 IdMascota int primary key identity(1,1),
 Nombre_Masota varchar(50),
 raza varchar(50),
 Sexo varchar(50),
 color varchar(50)
)
go

Create proc SPListarmascotas
as
begin
   begin try
     SELECT Ms.IdMascota , Ms.Nombre_Masota , Ms.raza , Ms.Sexo , Ms.color  FROM Mascotas as Ms
   end try
   begin catch
   Print 'Se listaron las mascotas'
   end catch
end
go

create  or alter proc NuevaMascota
(
@Nombre varchar(50),
@raza varchar(50),
@sexo varchar(50),
@color varchar(50)
)
as
 begin 
   begin try
     begin tran
      insert into Mascotas (Nombre_Masota , raza, sexo , color )
      values(@Nombre ,@raza , @sexo , @color);
     commit tran
     Print 'Se creo la nueva mascota exitosamente'
     end try
     begin catch
       IF @@TRANCOUNT > 0
            ROLLBACK TRAN
        PRINT 'No se pudo crear la nueva mascota'
        PRINT ERROR_MESSAGE()
     end catch
    end
 go


create or alter proc EditarMascotas
(
@IdMascota int, 
@Nombre varchar(50),
@raza varchar(50),
@sexo varchar(50),
@color varchar(50)
)
as 
 begin 
  begin try 
     begin tran 
       update Mascotas 
       set Nombre_Masota = @Nombre,
                           raza=@raza,  
                           sexo=@sexo,
                           color=@color
                        where IdMascota=@IdMascota;
      commit tran 
      print 'Se edito la mascota satisfactoriamente'
   end try
   begin catch 
       if @@TRANCOUNT > 0
       rollback tran 
       print 'No se pudo editar la mascota' + @@error
    end catch
end
go

create or alter proc Eliminar
@IdMascota int
as 
 begin 
   begin try
    Delete  fROM Mascotas where IdMascota=@IdMascota;
    print 'Mascota Eliminada Correctamente'
   end try
  begin catch 
  Print 'No se pudo eliminar la mascota'+@@error
  end catch
 end
go

create or alter proc buscarmascotapornombre
@nombre varchar(50)
as
 begin
  begin try 
   Select * From Mascotas Where Nombre_Masota=@nombre; 
   Print 'Resultados de la busqueda'
  end try
  begin catch
  Print 'No se encontro nigun resultado'+@@error
  end catch
  end
go

create or alter proc  BuscarPorID
@idmascota int
as 
 begin 
  begin try
  Select * fROM Mascotas where IdMascota=@idmascota;
  Print 'Yes'
  end try 
  begin catch
  Print 'Nou'
  end catch
 end
go

exec BuscarPorID 4
exec buscarmascotapornombre 'Lucia'
exec Eliminar 3
  exec EditarMascotas 4, 'Lucia','Pitbull','Hembra', 'Tigriado'
  exec NuevaMascota 'Moncha','Pitbull','Hembra', 'Tigriado'
exec SPListarmascotas

SELECT
    SCHEMA_NAME(schema_id) AS Esquema,
    name AS Procedimiento,
    create_date AS FechaCreacion,
    modify_date AS UltimaModificacion
FROM sys.procedures
ORDER BY name;