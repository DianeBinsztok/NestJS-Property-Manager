-- Adminer 4.8.1 MySQL 8.0.41-0ubuntu0.24.04.1 dump

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `property_manager`;
CREATE DATABASE `property_manager` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `property_manager`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_surname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_phone_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_role` enum('owner', 'tenant', 'admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `user_updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `addresses`;
CREATE TABLE `addresses` (
  `address_id` int unsigned NOT NULL AUTO_INCREMENT,
  `address_street_nb` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_street_type_and_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_additional_infos` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_zipcode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'France',
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `owners`;
CREATE TABLE `owners` (
  `owner_id` int unsigned NOT NULL AUTO_INCREMENT,
  `owner_fk_user_id` int unsigned NOT NULL,
  `owner_fk_address_id` int unsigned NOT NULL,
  PRIMARY KEY (`owner_id`),
  KEY `owner_fk_user_id` (`owner_fk_user_id`),
  KEY `owner_fk_address_id` (`owner_fk_address_id`),
  CONSTRAINT `owners_ibfk_1` FOREIGN KEY (`owner_fk_user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `owners_ibfk_2` FOREIGN KEY (`owner_fk_address_id`) REFERENCES `addresses` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
  `location_id` int unsigned NOT NULL AUTO_INCREMENT,
  `location_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location_rooms` int NOT NULL,
  `location_type` enum('house', 'appartment', 'room', 'parking', 'storage') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `location_dpe` enum('A', 'B', 'C', 'D', 'E', 'F', 'G') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location_surface` int unsigned NOT NULL,
  `location_furnished` tinyint(1) DEFAULT '0',
  `location_rent` decimal(10,2) unsigned NOT NULL,
  `location_rented` tinyint unsigned NOT NULL DEFAULT '0',
  `location_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `location_updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `location_fk_address_id` int unsigned NOT NULL,
  PRIMARY KEY (`location_id`),
  KEY `location_fk_address_id` (`location_fk_address_id`),
  CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`location_fk_address_id`) REFERENCES `addresses` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tenants`;
CREATE TABLE `tenants` (
  `tenant_id` int unsigned NOT NULL AUTO_INCREMENT,
  `tenant_fk_location_id` int unsigned NOT NULL,
  `tenant_fk_user_id` int unsigned NOT NULL,
  PRIMARY KEY (`tenant_id`),
  KEY `tenant_fk_location_id` (`tenant_fk_location_id`),
  KEY `tenant_fk_user_id` (`tenant_fk_user_id`),
  CONSTRAINT `tenants_ibfk_1` FOREIGN KEY (`tenant_fk_location_id`) REFERENCES `locations` (`location_id`),
  CONSTRAINT `tenants_ibfk_2` FOREIGN KEY (`tenant_fk_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE owner_has_location (
  `owner_has_location_fk_owner_id` int unsigned NOT NULL,
  `owner_has_location_fk_location_id` int unsigned NOT NULL,
  `owner_has_location_start_date` DATE NOT NULL,
  `owner_has_location_end_date` DATE DEFAULT NULL,
  `owner_has_location_created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `owner_has_location_updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`owner_has_location_fk_owner_id`, `owner_has_location_fk_location_id`),
  KEY `owner_has_location_fk_owner_id_idx` (`owner_has_location_fk_owner_id`),
  KEY `owner_has_location_fk_location_id_idx` (`owner_has_location_fk_location_id`),
  CONSTRAINT `owner_has_location_ibfk_1`  FOREIGN KEY (`owner_has_location_fk_owner_id`) REFERENCES `owners` (`owner_id`),
  CONSTRAINT `owner_has_location_ibfk_2` FOREIGN KEY (`owner_has_location_fk_location_id`) REFERENCES `locations` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `tenant_has_location`;
CREATE TABLE tenant_has_location (
  `tenant_has_location_fk_tenant_id` int unsigned NOT NULL,
  `tenant_has_location_fk_location_id` int unsigned NOT NULL,
  `tenant_has_location_start_date` DATE NOT NULL,
  `tenant_has_location_end_date` DATE DEFAULT NULL,
  `tenant_has_location_created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `tenant_has_location_updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tenant_has_location_fk_tenant_id`, `tenant_has_location_fk_location_id`),
  KEY `tenant_has_location_fk_tenant_id` (`tenant_has_location_fk_tenant_id`),
  KEY `tenant_has_location_fk_location_id` (`tenant_has_location_fk_location_id`),
  CONSTRAINT `tenant_has_location_ibfk_1`  FOREIGN KEY (`tenant_has_location_fk_tenant_id`) REFERENCES `tenants` (`tenant_id`),
  CONSTRAINT `tenant_has_location_ibfk_2` FOREIGN KEY (`tenant_has_location_fk_location_id`) REFERENCES `locations` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `charges`;
CREATE TABLE `charges` (
  `charge_id` int unsigned NOT NULL AUTO_INCREMENT,
  `charge_label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `charge_amount` decimal(10,2) unsigned NOT NULL,
  `charge_fk_location_id` int unsigned NOT NULL,
  PRIMARY KEY (`charge_id`),
  KEY `charge_fk_location_id` (`charge_fk_location_id`),
  CONSTRAINT `charges_ibfk_1` FOREIGN KEY (`charge_fk_location_id`) REFERENCES `locations` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `rents`;
CREATE TABLE `rents` (
  `rent_id` int unsigned NOT NULL AUTO_INCREMENT,
  `rent_start_date` DATE NOT NULL,
  `rent_end_date` DATE NOT NULL,
  `rent_issued_at` DATE NOT NULL,
  `rent_amount` decimal(10,2) unsigned NOT NULL,
  `rent_paid` tinyint(1) NOT NULL DEFAULT '0',
  `rent_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rent_updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `rent_fk_location_id` int unsigned NOT NULL,
  PRIMARY KEY (`rent_id`),
  KEY `rent_fk_location_id` (`rent_fk_location_id`),
  CONSTRAINT `rent_ibfk_1` FOREIGN KEY (`rent_fk_location_id`) REFERENCES `locations` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2025-04-12 11:23:27
