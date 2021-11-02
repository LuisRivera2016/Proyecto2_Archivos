------------------------------------------------------------------------------------------MODELO
--DEPARTAMENTO
CREATE TABLE Departamento(
   id_Departamento INTEGER,
   Nombre VARCHAR2(100),
   Capital NUMBER(10,2),
   DepartamentoP NUMBER(10),
   CONSTRAINT id_departamento_pk PRIMARY KEY(id_Departamento)
);

--TIPO
CREATE TABLE Tipo(
   id_Tipo INTEGER GENERATED BY DEFAULT AS IDENTITY (START WITH 1 INCREMENT BY 1 NOCYCLE),
   Rol VARCHAR2(100),
   CONSTRAINT id_tipo_pk PRIMARY KEY(id_Tipo)
);

--PUESTO
CREATE TABLE Puesto(
   id_Puesto INTEGER,
   Nombre VARCHAR2(100),
   Salario NUMBER(10,2),
   Imagen VARCHAR2(100),
   Disponible NUMBER(1),
   id_Departamento INTEGER,
   CONSTRAINT puesto_pk PRIMARY KEY(id_Puesto),
   CONSTRAINT departamento_fk FOREIGN KEY(id_Departamento) REFERENCES Departamento(id_Departamento)
);

--PUESTO_CALIFICACION
CREATE TABLE Puesto_Calificacion(
   id_Puesto_Calificacion INTEGER GENERATED BY DEFAULT AS IDENTITY (START WITH 1 INCREMENT BY 1 NOCYCLE),
   id_Puesto INTEGER,
   Calificacion INTEGER,
   CONSTRAINT puesto_calificacion_pk PRIMARY KEY(id_Puesto_Calificacion),
   CONSTRAINT puestoC_fk FOREIGN KEY(id_Puesto) REFERENCES Puesto(id_Puesto)
);

--CATEGORIA
CREATE TABLE Categoria(
   id_Categoria INTEGER,
   Nombre VARCHAR2(100),
   CONSTRAINT categoria_pk PRIMARY KEY(id_Categoria)
);

--PUESTO_CATEGORIA
CREATE TABLE Puesto_Categoria(
   id_Puesto_Categoria INTEGER GENERATED BY DEFAULT AS IDENTITY (START WITH 1 INCREMENT BY 1 NOCYCLE),
   id_Puesto INTEGER,
   id_Categoria INTEGER,
   CONSTRAINT puesto_categoria_pk PRIMARY KEY(id_Puesto_Categoria),
   CONSTRAINT puesto_fk FOREIGN KEY(id_Puesto) REFERENCES Puesto(id_Puesto),
   CONSTRAINT categoria_fk FOREIGN KEY(id_Categoria) REFERENCES Categoria(id_Categoria)
);

--REQUISITO
CREATE TABLE Requisito(
   id_Requisito INTEGER,
   Nombre VARCHAR2(100),
   Tamano NUMBER(10),
   Obligatorio NUMBER(1),
   CONSTRAINT requisito_pk PRIMARY KEY(id_Requisito)
);

--PUESTO_REQUISITO
CREATE TABLE Puesto_Requisito(
   id_Puesto_Requisito INTEGER GENERATED BY DEFAULT AS IDENTITY (START WITH 1 INCREMENT BY 1 NOCYCLE),
   id_Puesto INTEGER,
   id_Requisito INTEGER,
   CONSTRAINT puesto_requisito_pk PRIMARY KEY(id_Puesto_Requisito),
   CONSTRAINT puestoR_fk FOREIGN KEY(id_Puesto) REFERENCES Puesto(id_Puesto),
   CONSTRAINT requisitoP_fk FOREIGN KEY(id_Requisito) REFERENCES Requisito(id_Requisito)
);

--FORMATO
CREATE TABLE Formato(
   id_Formato INTEGER,
   Nombre VARCHAR2(100),
   CONSTRAINT formato_pk PRIMARY KEY(id_Formato)
);

--REQUISITO_FORMATO
CREATE TABLE Requisito_Formato(
   id_Requisito_Formato INTEGER GENERATED BY DEFAULT AS IDENTITY (START WITH 1 INCREMENT BY 1 NOCYCLE),
   id_Requisito INTEGER,
   id_Formato INTEGER,
   CONSTRAINT requisito_formato_pk PRIMARY KEY(id_Requisito_Formato),
   CONSTRAINT requisitoF_fk FOREIGN KEY(id_Requisito) REFERENCES Requisito(id_Requisito),
   CONSTRAINT formatoF_fk FOREIGN KEY(id_Formato) REFERENCES Formato(id_Formato)
);

--APLICANTE
CREATE TABLE Aplicante(
   id_Aplicante INTEGER GENERATED BY DEFAULT AS IDENTITY (START WITH 1 INCREMENT BY 1 NOCYCLE),
   Estado NUMBER(1),
   DPI NUMBER(13),
   Nombre VARCHAR2(100),
   Apellido VARCHAR2(100),
   Correo VARCHAR2(100),
   Direccion VARCHAR2(100),
   Telefono NUMBER(10),
   Entrada NUMBER(1),
   CV VARCHAR2(100),
   id_Puesto INTEGER,
   CONSTRAINT aplicante_pk PRIMARY KEY(id_Aplicante),
   CONSTRAINT puestoA_fk FOREIGN KEY(id_Puesto) REFERENCES Puesto(id_Puesto)
);

--APLICANTE_DOCUMENTOS
CREATE TABLE Aplicante_Documentos(
   id_Aplicante_Documentos INTEGER GENERATED BY DEFAULT AS IDENTITY (START WITH 1 INCREMENT BY 1 NOCYCLE),
   Nombre VARCHAR2(100),
   Tamano NUMBER(10,2),
   Formato VARCHAR2(100),
   Archivo VARCHAR2(100),
   id_Aplicante INTEGER NULL,
   CONSTRAINT aplicante_documentos_pk PRIMARY KEY(id_Aplicante_Documentos),
   CONSTRAINT aplicanteD_fk FOREIGN KEY(id_Aplicante) REFERENCES Aplicante(id_Aplicante)
);

--REQUISITOS_APLICANTE
CREATE TABLE Aplicante_Requisito(
   id_Aplicante_Requisito INTEGER GENERATED BY DEFAULT AS IDENTITY (START WITH 1 INCREMENT BY 1 NOCYCLE),
   Nombre VARCHAR2(100),
   Tamano NUMBER(10),
   Formato VARCHAR2(100),
   id_Aplicante INTEGER,
   CONSTRAINT aplicante_requisito_pk PRIMARY KEY(id_Aplicante_Requisito),
   CONSTRAINT apliacanteR_fk FOREIGN KEY(id_Aplicante) REFERENCES Aplicante(id_Aplicante)
);

--USUARIO
CREATE TABLE Usuario(
   id_Usuario INTEGER GENERATED BY DEFAULT AS IDENTITY (START WITH 1 INCREMENT BY 1 NOCYCLE),
   Nombre VARCHAR2(100),
   Password VARCHAR2(100),
   Fecha_Creacion DATE,
   Fecha_Fin DATE,
   Estado NUMBER(1),
   id_Tipo INTEGER,
   id_Puesto INTEGER,
   id_Departamento INTEGER,
   CONSTRAINT usuario_pk PRIMARY KEY(id_Usuario),
   CONSTRAINT tipoU_fk FOREIGN KEY(id_Tipo) REFERENCES Tipo(id_Tipo),
   CONSTRAINT departamentoP_fk FOREIGN KEY(id_Departamento) REFERENCES Departamento(id_Departamento),
   CONSTRAINT puestoU_fk FOREIGN KEY(id_Puesto) REFERENCES Puesto(id_Puesto)
);

--CHAT
CREATE TABLE Chat(
   id_Chat INTEGER GENERATED BY DEFAULT AS IDENTITY (START WITH 1 INCREMENT BY 1 NOCYCLE),
   id_Usuario1 INTEGER,
   id_Usuario2 INTEGER,
   CONSTRAINT chat_pk PRIMARY KEY(id_Chat),
   CONSTRAINT usuarioC_fk FOREIGN KEY(id_Usuario1) REFERENCES Usuario(id_Usuario),
   CONSTRAINT usuarioC2_fk FOREIGN KEY(id_Usuario2) REFERENCES Usuario(id_Usuario)
);

--MENSAJE
CREATE TABLE Mensaje(
   id_Mensaje INTEGER GENERATED BY DEFAULT AS IDENTITY (START WITH 1 INCREMENT BY 1 NOCYCLE),
   Contenido VARCHAR2(255),
   Fecha DATE,
   id_Chat INTEGER,
   CONSTRAINT mensaje_pk PRIMARY KEY(id_Mensaje),
   CONSTRAINT chat_fk FOREIGN KEY(id_Chat) REFERENCES Chat(id_Chat)
);

--REVISION
CREATE TABLE Revision(
   id_Revision INTEGER GENERATED BY DEFAULT AS IDENTITY (START WITH 1 INCREMENT BY 1 NOCYCLE),
   Estado_Revision NUMBER(1),
   id_Usuario INTEGER,
   id_Aplicante INTEGER,
   CONSTRAINT revision_pk PRIMARY KEY(id_Revision),
   CONSTRAINT usuarioR_fk FOREIGN KEY(id_Usuario) REFERENCES Usuario(id_Usuario),
   CONSTRAINT aplicanteR_fk FOREIGN KEY(id_Aplicante) REFERENCES Aplicante(id_Aplicante)
);


--REVISION_REQUISITO
CREATE TABLE Revision_Requisito(
   id_Revision_Requisito INTEGER GENERATED BY DEFAULT AS IDENTITY (START WITH 1 INCREMENT BY 1 NOCYCLE),
   Nombre VARCHAR2(100),
   Estado NUMBER(1),
   Motivo VARCHAR2(100),
   Fecha_Rechazo DATE,
   id_Revision INTEGER,
   id_Puesto_Requisito INTEGER,
   CONSTRAINT revion_requisito_pk PRIMARY KEY(id_Revision_Requisito),
   CONSTRAINT revisionR_fk FOREIGN KEY(id_Revision) REFERENCES Revision(id_Revision),
   CONSTRAINT puestoRR_fk FOREIGN KEY(id_Puesto_Requisito) REFERENCES Puesto_Requisito(id_Puesto_Requisito)
);

---BORRAR TABLAS
DROP TABLE Revision_Requisito;
DROP TABLE Revision;
DROP TABLE Mensaje;
DROP TABLE Chat;
DROP TABLE Usuario;
DROP TABLE Aplicante_Requisito;
DROP TABLE Aplicante_Documentos;
DROP TABLE Aplicante;
DROP TABLE Requisito_Formato;
DROP TABLE Formato;
DROP TABLE Puesto_Requisito;
DROP TABLE Requisito;
DROP TABLE Puesto_Categoria;
DROP TABLE Categoria;
DROP TABLE Puesto_Calificacion;
DROP TABLE Puesto;
DROP TABLE Departamento;--
DROP TABLE Tipo;--

----
SELECT * FROM Departamento;
SELECT * FROM Puesto;
SELECT * FROM Categoria;
SELECT * FROM Puesto_Categoria;--
SELECT * FROM Formato;
SELECT * FROM Requisito;
SELECT * FROM Requisito_Formato;
SELECT * FROM PUESTO_REQUISITO;--
SELECT * FROM PUESTO_CALIFICACION;
SELECT * FROM APLICANTE;

SELECT * FROM USUARIO;
SELECT * FROM TIPO;
SELECT * FROM CALIFICACION;
SELECT * FROM REVISION;
----------------INSERTS
INSERT INTO Tipo(Rol) VALUES('Administrador');
INSERT INTO Tipo(Rol) VALUES('Coordinador');
INSERT INTO Tipo(Rol) VALUES('Reclutador');
INSERT INTO Tipo(Rol) VALUES('Revisor');
INSERT INTO Tipo(Rol) VALUES('Empleado');

INSERT INTO Usuario(Nombre,Password,Fecha_Creacion,Fecha_Fin,Estado,id_Tipo,id_Puesto) 
    VALUES('Admin','12345',TO_DATE('10/29/2021','MM/DD/YYYY'),NULL,1,1,NULL);   
-----------------
CREATE TABLE RevisionT(
   id_RevisionT INTEGER GENERATED BY DEFAULT AS IDENTITY (START WITH 1 INCREMENT BY 1 NOCYCLE),
   Estado_Revision NUMBER(1),
   id_Usuario INTEGER,
   id_Aplicante INTEGER,
   CONSTRAINT revisionT_pk PRIMARY KEY(id_RevisionT)
);

INSERT INTO RevisionT(Estado_Revision,id_Usuario,Id_Aplicante) VALUES (0,6,1);
INSERT INTO RevisionT(Estado_Revision,id_Usuario,Id_Aplicante) VALUES (0,6,2);
INSERT INTO RevisionT(Estado_Revision,id_Usuario,Id_Aplicante) VALUES (0,7,3);
INSERT INTO RevisionT(Estado_Revision,id_Usuario,Id_Aplicante) VALUES (0,8,4);
INSERT INTO RevisionT(Estado_Revision,id_Usuario,Id_Aplicante) VALUES (0,8,5);
INSERT INTO RevisionT(Estado_Revision,id_Usuario,Id_Aplicante) VALUES (0,8,6);
----------------------CONSULTAS
-- CREATE OR REPLACE TRIGGER Asignar_Revisor
-- AFTER INSERT ON Aplicante
-- REFERENCING NEW AS n 
-- FOR EACH ROW
--                 -- new manager information
-- DECLARE
--    rowcnt number;
-- BEGIN
--    SELECT COUNT(*) INTO rowcnt FROM REVISION WHERE empno = :n.empno;
--    IF rowcnt = 0  THEN
--        INSERT INTO Emp_tab (empno,ename) VALUES (:n.empno, :n.ename);
--    ELSE
--       UPDATE Emp_tab SET Emp_tab.ename = :n.ename
--          WHERE Emp_tab.empno = :n.empno;
--    END IF;
-- END



SELECT conteo.Id_Usuario FROM (SELECT Id_Usuario,COUNT(Id_Usuario)as cont FROM Revision
GROUP BY Id_Usuario)conteo
INNER JOIN USUARIO ON USUARIO.Id_Usuario = conteo.Id_Usuario
WHERE conteo.cont = (
SELECT MIN(conteo.cont) FROM (
SELECT Id_Usuario,COUNT(Id_Usuario)as cont FROM Revision
GROUP BY Id_Usuario)conteo)
AND USUARIO.Id_Departamento = 4;
---------------------------------------CONSULTAAS
--ESTRELLAS
SELECT AVG(estrella.CALIFICACION) FROM (SELECT CALIFICACION FROM PUESTO_CALIFICACION
WHERE Id_Puesto = 5)estrella;
--USUARIO MENOS REVISIONES
SELECT Id_Usuario FROM Usuario
WHERE Id_Usuario NOT IN (SELECT ID_USUARIO FROM REVISION GROUP BY ID_USUARIO)
AND Id_Departamento = 4 AND Id_Tipo = 4 AND ROWNUM  = 1;


SELECT * FROM REVISION;
SELECT * FROM PUESTO;


SELECT * FROM APLICANTE 
INNER JOIN REVISION ON REVISION.ID_APLICANTE = APLICANTE.ID_APLICANTE
INNER JOIN Usuario ON USUARIO.ID_USUARIO = REVISION.ID_USUARIO
WHERE  USUARIO.ID_USUARIO = 28;