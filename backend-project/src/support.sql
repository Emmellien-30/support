-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 28, 2026 at 09:53 AM
-- Server version: 8.0.45-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `support`
--

-- --------------------------------------------------------

--
-- Table structure for table `Car`
--

CREATE TABLE `Car` (
  `PlateNumber` varchar(40) NOT NULL,
  `type` varchar(50) NOT NULL,
  `Model` varchar(40) DEFAULT NULL,
  `ManufacturingYear` varchar(20) DEFAULT NULL,
  `DriverPhone` varchar(20) NOT NULL,
  `MechanicName` varchar(140) DEFAULT NULL,
  `registed_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Car`
--

INSERT INTO `Car` (`PlateNumber`, `type`, `Model`, `ManufacturingYear`, `DriverPhone`, `MechanicName`, `registed_date`) VALUES
('RAG', 'Truck', ' mercedes Benz', '2004', '+250781013100', 'Nsengiyumva gerard1', '2026-04-27 14:59:24');

-- --------------------------------------------------------

--
-- Table structure for table `Payment`
--

CREATE TABLE `Payment` (
  `PaymentNumber` int NOT NULL,
  `AmountPaid` decimal(10,2) NOT NULL,
  `PaymentDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `RecordNumber` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ServiceRecord`
--

CREATE TABLE `ServiceRecord` (
  `RecordNumber` int NOT NULL,
  `ServiceDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `PlateNumber` varchar(20) DEFAULT NULL,
  `ServiceCode` int DEFAULT NULL,
  `Notes` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Services`
--

CREATE TABLE `Services` (
  `ServiceCode` int NOT NULL,
  `ServiceName` varchar(60) NOT NULL,
  `ServicePrice` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Services`
--

INSERT INTO `Services` (`ServiceCode`, `ServiceName`, `ServicePrice`) VALUES
(3, 'change oil', 1000.00),
(5, 'gas remover', 1000.00);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'amani', 'amani@gmail.com', '$2b$12$I5RFj4qwOSUGHXK/Dg.GZOlouVqKThytIDskxKqYxg2G3Xwfn9wri', '2026-04-27 12:48:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Car`
--
ALTER TABLE `Car`
  ADD PRIMARY KEY (`PlateNumber`),
  ADD UNIQUE KEY `DriverPhone` (`DriverPhone`);

--
-- Indexes for table `Payment`
--
ALTER TABLE `Payment`
  ADD PRIMARY KEY (`PaymentNumber`),
  ADD KEY `RecordNumber` (`RecordNumber`);

--
-- Indexes for table `ServiceRecord`
--
ALTER TABLE `ServiceRecord`
  ADD PRIMARY KEY (`RecordNumber`),
  ADD KEY `PlateNumber` (`PlateNumber`),
  ADD KEY `ServiceCode` (`ServiceCode`);

--
-- Indexes for table `Services`
--
ALTER TABLE `Services`
  ADD PRIMARY KEY (`ServiceCode`),
  ADD UNIQUE KEY `ServiceName` (`ServiceName`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Payment`
--
ALTER TABLE `Payment`
  MODIFY `PaymentNumber` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ServiceRecord`
--
ALTER TABLE `ServiceRecord`
  MODIFY `RecordNumber` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Services`
--
ALTER TABLE `Services`
  MODIFY `ServiceCode` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Payment`
--
ALTER TABLE `Payment`
  ADD CONSTRAINT `Payment_ibfk_1` FOREIGN KEY (`RecordNumber`) REFERENCES `ServiceRecord` (`RecordNumber`) ON DELETE CASCADE;

--
-- Constraints for table `ServiceRecord`
--
ALTER TABLE `ServiceRecord`
  ADD CONSTRAINT `ServiceRecord_ibfk_1` FOREIGN KEY (`PlateNumber`) REFERENCES `Car` (`PlateNumber`) ON DELETE CASCADE,
  ADD CONSTRAINT `ServiceRecord_ibfk_2` FOREIGN KEY (`ServiceCode`) REFERENCES `Services` (`ServiceCode`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
