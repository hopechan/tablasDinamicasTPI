-- MySQL dump 10.16  Distrib 10.1.26-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: mantenimientoTpi
-- ------------------------------------------------------
-- Server version	10.3.5-MariaDB-10.3.5+maria~jessie

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AREA`
--

DROP TABLE IF EXISTS `AREA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AREA` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(45) NOT NULL,
  `OBSERVACIONES` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AREA`
--

LOCK TABLES `AREA` WRITE;
/*!40000 ALTER TABLE `AREA` DISABLE KEYS */;
/*!40000 ALTER TABLE `AREA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CALENDARIO`
--

DROP TABLE IF EXISTS `CALENDARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CALENDARIO` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FECHA` date NOT NULL,
  `ID_EQUIPO` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CALENDARIO`
--

LOCK TABLES `CALENDARIO` WRITE;
/*!40000 ALTER TABLE `CALENDARIO` DISABLE KEYS */;
/*!40000 ALTER TABLE `CALENDARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DETALLE_EQUIPO`
--

DROP TABLE IF EXISTS `DETALLE_EQUIPO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DETALLE_EQUIPO` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_EQUIPO` int(11) NOT NULL,
  `ID_HARDWARE` int(11) NOT NULL,
  `ID_MODELO` int(11) NOT NULL,
  `NO_INVENTARIO` int(11) DEFAULT NULL,
  `NO_SERIE` int(11) DEFAULT NULL,
  `TAMANIO` int(11) DEFAULT NULL,
  `OBSERVACIONES` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_ID_HARDWARE_idx` (`ID_HARDWARE`),
  KEY `FK_ID_MODELO_idx` (`ID_MODELO`),
  KEY `FK_ID_EQUIPO` (`ID_EQUIPO`),
  CONSTRAINT `FK_ID_EQUIPO` FOREIGN KEY (`ID_EQUIPO`) REFERENCES `EQUIPO` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ID_HARDWARE` FOREIGN KEY (`ID_HARDWARE`) REFERENCES `HARDWARE` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ID_MODELO` FOREIGN KEY (`ID_MODELO`) REFERENCES `MODELO` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DETALLE_EQUIPO`
--

LOCK TABLES `DETALLE_EQUIPO` WRITE;
/*!40000 ALTER TABLE `DETALLE_EQUIPO` DISABLE KEYS */;
/*!40000 ALTER TABLE `DETALLE_EQUIPO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DETALLE_PETICION`
--

DROP TABLE IF EXISTS `DETALLE_PETICION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DETALLE_PETICION` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_PETICION` int(11) NOT NULL,
  `ID_EQUIPO` int(11) NOT NULL,
  `OBSERVACIONES` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_ID_EQUIPO_idx` (`ID_EQUIPO`),
  KEY `FK_ID_PETICION_DP` (`ID_PETICION`),
  CONSTRAINT `FK_ID_EQUIPO_DP` FOREIGN KEY (`ID_EQUIPO`) REFERENCES `EQUIPO` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ID_PETICION_DP` FOREIGN KEY (`ID_PETICION`) REFERENCES `PETICION` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DETALLE_PETICION`
--

LOCK TABLES `DETALLE_PETICION` WRITE;
/*!40000 ALTER TABLE `DETALLE_PETICION` DISABLE KEYS */;
/*!40000 ALTER TABLE `DETALLE_PETICION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DIAGNOSTICO_HARDWARE`
--

DROP TABLE IF EXISTS `DIAGNOSTICO_HARDWARE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DIAGNOSTICO_HARDWARE` (
  `ID_ORDEN_TRABAJO` int(11) NOT NULL,
  `ID_HARDWARE` int(11) NOT NULL,
  `DIAGNOSTICO` varchar(300) NOT NULL,
  `ID_PROCEDIMIENTO_APLICADO` int(11) NOT NULL,
  `OBSERVACIONES` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`ID_ORDEN_TRABAJO`),
  KEY `FK_ID_HARDWARE_idx` (`ID_HARDWARE`),
  KEY `FK_ID_APPLIED_PROCEDURE_idx` (`ID_PROCEDIMIENTO_APLICADO`),
  CONSTRAINT `FK_ID_APPLIED_PROCEDURE_HW` FOREIGN KEY (`ID_PROCEDIMIENTO_APLICADO`) REFERENCES `PROCEDIMIENTO` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ID_HARDWARE_DH` FOREIGN KEY (`ID_HARDWARE`) REFERENCES `HARDWARE` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ID_ORDEN_TRABAJO_DH` FOREIGN KEY (`ID_ORDEN_TRABAJO`) REFERENCES `ORDEN_TRABAJO` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DIAGNOSTICO_HARDWARE`
--

LOCK TABLES `DIAGNOSTICO_HARDWARE` WRITE;
/*!40000 ALTER TABLE `DIAGNOSTICO_HARDWARE` DISABLE KEYS */;
/*!40000 ALTER TABLE `DIAGNOSTICO_HARDWARE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DIAGNOSTICO_SOFTWARE`
--

DROP TABLE IF EXISTS `DIAGNOSTICO_SOFTWARE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DIAGNOSTICO_SOFTWARE` (
  `ID_ORDEN_TRABAJO` int(11) NOT NULL,
  `DIAGNOSTICO` varchar(300) NOT NULL,
  `ID_PROCEDIMIENTO_APLICADO` int(11) NOT NULL,
  `OBSERVACIONES` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`ID_ORDEN_TRABAJO`),
  KEY `FK_APPLIED_PROCEDURE_idx` (`ID_PROCEDIMIENTO_APLICADO`),
  CONSTRAINT `FK_APPLIED_PROCEDURE_SW` FOREIGN KEY (`ID_PROCEDIMIENTO_APLICADO`) REFERENCES `PROCEDIMIENTO` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ID_ORDEN_TRABAJO` FOREIGN KEY (`ID_ORDEN_TRABAJO`) REFERENCES `ORDEN_TRABAJO` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DIAGNOSTICO_SOFTWARE`
--

LOCK TABLES `DIAGNOSTICO_SOFTWARE` WRITE;
/*!40000 ALTER TABLE `DIAGNOSTICO_SOFTWARE` DISABLE KEYS */;
/*!40000 ALTER TABLE `DIAGNOSTICO_SOFTWARE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EQUIPO`
--

DROP TABLE IF EXISTS `EQUIPO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EQUIPO` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_MODELO` int(11) NOT NULL,
  `ID_AREA` int(11) NOT NULL,
  `NO_SERIE` int(11) DEFAULT NULL,
  `NO_INVENTARIO` int(11) DEFAULT NULL,
  `OS` varchar(45) NOT NULL,
  `LICENCIA` tinyint(1) NOT NULL,
  `USUARIO` varchar(45) DEFAULT NULL,
  `OBSERVACIONES` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_ID_MODELO_idx1` (`ID_MODELO`),
  KEY `FK_ID_AREA_idx` (`ID_AREA`),
  CONSTRAINT `FK_ID_AREA` FOREIGN KEY (`ID_AREA`) REFERENCES `AREA` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ID_MODELO_EQ` FOREIGN KEY (`ID_MODELO`) REFERENCES `MODELO` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EQUIPO`
--

LOCK TABLES `EQUIPO` WRITE;
/*!40000 ALTER TABLE `EQUIPO` DISABLE KEYS */;
/*!40000 ALTER TABLE `EQUIPO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ESTADO`
--

DROP TABLE IF EXISTS `ESTADO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ESTADO` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(45) NOT NULL,
  `DESCRIPCION` varchar(300) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ESTADO`
--

LOCK TABLES `ESTADO` WRITE;
/*!40000 ALTER TABLE `ESTADO` DISABLE KEYS */;
/*!40000 ALTER TABLE `ESTADO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EXCEPCION_CALENDARIO`
--

DROP TABLE IF EXISTS `EXCEPCION_CALENDARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EXCEPCION_CALENDARIO` (
  `FECHA` date NOT NULL,
  `DESCRIPCION` varchar(300) NOT NULL,
  PRIMARY KEY (`FECHA`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EXCEPCION_CALENDARIO`
--

LOCK TABLES `EXCEPCION_CALENDARIO` WRITE;
/*!40000 ALTER TABLE `EXCEPCION_CALENDARIO` DISABLE KEYS */;
/*!40000 ALTER TABLE `EXCEPCION_CALENDARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HARDWARE`
--

DROP TABLE IF EXISTS `HARDWARE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HARDWARE` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(45) NOT NULL,
  `UNIDAD_MEDIDA` varchar(45) DEFAULT NULL,
  `OBSERVACIONES` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HARDWARE`
--

LOCK TABLES `HARDWARE` WRITE;
/*!40000 ALTER TABLE `HARDWARE` DISABLE KEYS */;
/*!40000 ALTER TABLE `HARDWARE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MARCA`
--

DROP TABLE IF EXISTS `MARCA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MARCA` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(45) NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  `OBSERVACIONES` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `NOMBRE_UNIQUE` (`NOMBRE`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MARCA`
--

LOCK TABLES `MARCA` WRITE;
/*!40000 ALTER TABLE `MARCA` DISABLE KEYS */;
INSERT INTO `MARCA` VALUES (1,'DELL',1,'  '),(2,'ASUS',1,'  '),(3,'HP',1,'  '),(4,'VAIO',0,'  '),(5,'SAMSUNG',1,'  '),(6,'TOSHIBA',1,'  '),(7,'MAC',1,'  '),(8,'ACER',1,'  '),(9,'LENOVO',1,'  '),(10,'ALIENWARE',1,'  ');
/*!40000 ALTER TABLE `MARCA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MODELO`
--

DROP TABLE IF EXISTS `MODELO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MODELO` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_MARCA` int(11) NOT NULL,
  `NOMBRE` varchar(45) NOT NULL,
  `OBSERVACIONES` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_ID_MARCA_idx` (`ID_MARCA`),
  CONSTRAINT `FK_ID_MARCA` FOREIGN KEY (`ID_MARCA`) REFERENCES `MARCA` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MODELO`
--

LOCK TABLES `MODELO` WRITE;
/*!40000 ALTER TABLE `MODELO` DISABLE KEYS */;
/*!40000 ALTER TABLE `MODELO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ORDEN_TRABAJO`
--

DROP TABLE IF EXISTS `ORDEN_TRABAJO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ORDEN_TRABAJO` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_DETALLE_PETICION` int(11) NOT NULL,
  `FECHA_ENTRADA` date NOT NULL,
  `FECHA_SALIDA` date DEFAULT NULL,
  `ID_ENCARGADO_MANTENIMIENTO` int(11) NOT NULL,
  `ID_TIPO_MANTENIMIENTO` int(11) NOT NULL,
  `ID_ESTADO` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_ID_ENCARGADO_MTTO_idx` (`ID_ENCARGADO_MANTENIMIENTO`),
  KEY `FK_ID_TIPO_MTTO_idx` (`ID_TIPO_MANTENIMIENTO`),
  KEY `FK_ID_ESTADO_idx` (`ID_ESTADO`),
  KEY `FK_ID_DETALLE_PETICION_idx` (`ID_DETALLE_PETICION`),
  CONSTRAINT `FK_ID_DETALLE_PETICION` FOREIGN KEY (`ID_DETALLE_PETICION`) REFERENCES `DETALLE_PETICION` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ID_ENCARGADO_MTTO` FOREIGN KEY (`ID_ENCARGADO_MANTENIMIENTO`) REFERENCES `PERSONAL_MANTENIMIENTO` (`DUI`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ID_ESTADO` FOREIGN KEY (`ID_ESTADO`) REFERENCES `ESTADO` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ID_TIPO_MTTO` FOREIGN KEY (`ID_TIPO_MANTENIMIENTO`) REFERENCES `TIPO_MANTENIMIENTO` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ORDEN_TRABAJO`
--

LOCK TABLES `ORDEN_TRABAJO` WRITE;
/*!40000 ALTER TABLE `ORDEN_TRABAJO` DISABLE KEYS */;
/*!40000 ALTER TABLE `ORDEN_TRABAJO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ORIGEN_PETICION`
--

DROP TABLE IF EXISTS `ORIGEN_PETICION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ORIGEN_PETICION` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ORIGEN_PETICION`
--

LOCK TABLES `ORIGEN_PETICION` WRITE;
/*!40000 ALTER TABLE `ORIGEN_PETICION` DISABLE KEYS */;
/*!40000 ALTER TABLE `ORIGEN_PETICION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PASOS`
--

DROP TABLE IF EXISTS `PASOS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PASOS` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(45) NOT NULL,
  `DESCRIPCION` varchar(300) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PASOS`
--

LOCK TABLES `PASOS` WRITE;
/*!40000 ALTER TABLE `PASOS` DISABLE KEYS */;
/*!40000 ALTER TABLE `PASOS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PASOS_PROCEDIMIENTO`
--

DROP TABLE IF EXISTS `PASOS_PROCEDIMIENTO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PASOS_PROCEDIMIENTO` (
  `ID_PROCEDIMIENTO` int(11) NOT NULL,
  `ID_PASO` int(11) NOT NULL,
  `CORRELATIVO` int(11) NOT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`),
  KEY `FK_ID_PASO_idx` (`ID_PASO`),
  KEY `FK_ID_PROCEDIMIENTO` (`ID_PROCEDIMIENTO`),
  CONSTRAINT `FK_ID_PASO` FOREIGN KEY (`ID_PASO`) REFERENCES `PASOS` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ID_PROCEDIMIENTO` FOREIGN KEY (`ID_PROCEDIMIENTO`) REFERENCES `PROCEDIMIENTO` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PASOS_PROCEDIMIENTO`
--

LOCK TABLES `PASOS_PROCEDIMIENTO` WRITE;
/*!40000 ALTER TABLE `PASOS_PROCEDIMIENTO` DISABLE KEYS */;
/*!40000 ALTER TABLE `PASOS_PROCEDIMIENTO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PERSONAL_MANTENIMIENTO`
--

DROP TABLE IF EXISTS `PERSONAL_MANTENIMIENTO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PERSONAL_MANTENIMIENTO` (
  `DUI` int(11) NOT NULL,
  `NOMBRES` varchar(50) NOT NULL,
  `APELLIDOS` varchar(50) NOT NULL,
  `TELEFONO` varchar(8) NOT NULL,
  `EMAIL` varchar(75) NOT NULL,
  PRIMARY KEY (`DUI`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PERSONAL_MANTENIMIENTO`
--

LOCK TABLES `PERSONAL_MANTENIMIENTO` WRITE;
/*!40000 ALTER TABLE `PERSONAL_MANTENIMIENTO` DISABLE KEYS */;
/*!40000 ALTER TABLE `PERSONAL_MANTENIMIENTO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PETICION`
--

DROP TABLE IF EXISTS `PETICION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PETICION` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_ORIGEN` int(11) NOT NULL,
  `FECHA` date NOT NULL,
  `OBSERVACIONES` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_ID_ORIGEN_idx` (`ID_ORIGEN`),
  CONSTRAINT `FK_ID_ORIGEN` FOREIGN KEY (`ID_ORIGEN`) REFERENCES `ORIGEN_PETICION` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PETICION`
--

LOCK TABLES `PETICION` WRITE;
/*!40000 ALTER TABLE `PETICION` DISABLE KEYS */;
/*!40000 ALTER TABLE `PETICION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PROCEDIMIENTO`
--

DROP TABLE IF EXISTS `PROCEDIMIENTO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROCEDIMIENTO` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(45) NOT NULL,
  `DESCRIPCION` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PROCEDIMIENTO`
--

LOCK TABLES `PROCEDIMIENTO` WRITE;
/*!40000 ALTER TABLE `PROCEDIMIENTO` DISABLE KEYS */;
/*!40000 ALTER TABLE `PROCEDIMIENTO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TIPO_MANTENIMIENTO`
--

DROP TABLE IF EXISTS `TIPO_MANTENIMIENTO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TIPO_MANTENIMIENTO` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(45) NOT NULL,
  `DESCRIPCION` varchar(300) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TIPO_MANTENIMIENTO`
--

LOCK TABLES `TIPO_MANTENIMIENTO` WRITE;
/*!40000 ALTER TABLE `TIPO_MANTENIMIENTO` DISABLE KEYS */;
/*!40000 ALTER TABLE `TIPO_MANTENIMIENTO` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-01 12:27:28

