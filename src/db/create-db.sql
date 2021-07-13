CREATE DATABASE  IF NOT EXISTS `expressapi_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `expressapi_db`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: expressapi_db
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customerId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`customerId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'John'),(2,'Sam'),(3,'Sizwe'),(4,'Jack');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `sim_card_simid` int NOT NULL,
  `customer_customerId` int NOT NULL,
  `deliveryAddress` json DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `geoAddress` json DEFAULT NULL,
  PRIMARY KEY (`orderId`,`sim_card_simid`,`customer_customerId`),
  UNIQUE KEY `sim_card_simid_UNIQUE` (`sim_card_simid`),
  KEY `fk_orders_sim_card_idx` (`sim_card_simid`),
  KEY `fk_orders_customer1_idx` (`customer_customerId`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (33,3,1,'{\"city\": \"Cape Town\", \"address\": \"23 North\", \"country\": \"South Africa\", \"zipCode\": 2342}','Complete','2021-07-09 18:43:45','2021-07-10 13:59:52','{\"ip\": \"::1\"}'),(34,1,1,'{\"city\": \"Cape Town\", \"address\": \"23 North\", \"country\": \"South Africa\", \"zipCode\": 2342}','Complete','2021-07-10 15:13:08','2021-07-10 15:25:53','{\"ip\": \"::1\"}'),(35,2,1,'{\"city\": \"Cape Town\", \"address\": \"23 North\", \"country\": \"South Africa\", \"zipCode\": 2342}','Pending','2021-07-10 15:13:32','2021-07-10 15:13:32','{\"ip\": \"::1\"}'),(36,16,2,'{\"city\": \"Cape Town\", \"address\": \"23 South\", \"country\": \"South Africa\", \"zipCode\": 2342}','Processing','2021-07-13 16:37:20','2021-07-13 16:38:33','{\"ip\": \"::1\"}');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sim_card`
--

DROP TABLE IF EXISTS `sim_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sim_card` (
  `simid` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`simid`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sim_card`
--

LOCK TABLES `sim_card` WRITE;
/*!40000 ALTER TABLE `sim_card` DISABLE KEYS */;
INSERT INTO `sim_card` VALUES (1,'Unique name'),(2,'Unique name 2'),(3,'Unique name 3'),(16,'Unique name 4');
/*!40000 ALTER TABLE `sim_card` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-13 18:58:12
