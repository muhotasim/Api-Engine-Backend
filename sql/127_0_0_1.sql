-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2020 at 07:28 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apiengine`
--
CREATE DATABASE IF NOT EXISTS `apiengine` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `apiengine`;

-- --------------------------------------------------------

--
-- Table structure for table `api_engine_file_upload_test`
--

CREATE TABLE `api_engine_file_upload_test` (
  `id` int(11) NOT NULL,
  `inserted_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `name` varchar(250) DEFAULT NULL,
  `name2` varchar(250) DEFAULT NULL,
  `name3` varchar(250) DEFAULT NULL,
  `name4` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `api_engine_file_upload_test`
--

INSERT INTO `api_engine_file_upload_test` (`id`, `inserted_date`, `updated_date`, `name`, `name2`, `name3`, `name4`) VALUES
(11, '2020-07-05 09:23:07', '2020-07-05 09:23:07', 'api_engine_file_upload_test/b424b6d3a2984511b790b75ce93dc896_180300989.pdf', 'api_engine_file_upload_test/8cdcc40f7f1040aa9cf2dbf67a465de2_ddddd.PNG', 'api_engine_file_upload_test/479841e3603e4b6c80d9b7bd1621bb2a_Untitled-1.psd', NULL),
(12, '2020-07-05 09:38:58', '2020-07-05 09:38:58', 'api_engine_file_upload_test/65b8286b457c462aa7be06701ae2ae0e_180300989.pdf', 'api_engine_file_upload_test/1c27af1c6c8d406694bd4c7d3062db34_ddddd.PNG', 'api_engine_file_upload_test/b595a46a74934743a65a69778c639263_Untitled-1.psd', NULL),
(13, '2020-07-05 09:39:35', '2020-07-05 09:39:35', 'api_engine_file_upload_test/509018f4063045a39de7f593d5e3064a_180300989.pdf', 'api_engine_file_upload_test/023e689941724e92a358b3f3bf5fa2e5_ddddd.PNG', 'api_engine_file_upload_test/b2d2b11cb85c4038901026b7d3204de3_Untitled-1.psd', NULL),
(14, '2020-07-05 09:40:04', '2020-07-05 09:40:04', 'api_engine_file_upload_test/967a6aae88304c219ad90b964d871a4f_180300989.pdf', 'api_engine_file_upload_test/e8a7089d3a8a4a6c8e8565fa1014e691_ddddd.PNG', 'api_engine_file_upload_test/304b560920564f9d934af4c9c5b1204f_Screenshot_20200701-213527911.jpg', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `api_engine_test`
--

CREATE TABLE `api_engine_test` (
  `id` int(11) NOT NULL,
  `inserted_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `test` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `api_engine_test`
--

INSERT INTO `api_engine_test` (`id`, `inserted_date`, `updated_date`, `test`) VALUES
(11, '2020-07-05 04:37:47', '2020-07-05 04:37:47', 'test213123'),
(12, '2020-07-05 05:13:28', '2020-07-05 05:13:28', 'test213123'),
(13, '2020-07-05 05:16:02', '2020-07-05 05:16:02', 'test213123'),
(14, '2020-07-05 05:16:25', '2020-07-05 05:16:25', 'test213123');

-- --------------------------------------------------------

--
-- Table structure for table `auth_token`
--

CREATE TABLE `auth_token` (
  `token` text NOT NULL,
  `expires_in` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_token`
--

INSERT INTO `auth_token` (`token`, `expires_in`) VALUES
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU5NDUzMTI0MH0.GyNo1ydbiivOPIFReEHlqO3BZL8Gyibxu9Oh6LyMvds', 1594531300029),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU5NDUzMTM0N30.kXjAkHxeinOMaB-VgvFjivCkHA4Fm9YO73Nbl6fU7G8', 1594531407546),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU5NDUzMTU5MH0.2B011vHros3-mti0JdfpxictuvcjtEv6N-6OBGJuZT4', 1594531650514);

-- --------------------------------------------------------

--
-- Table structure for table `system`
--

CREATE TABLE `system` (
  `id` int(11) UNSIGNED NOT NULL,
  `structure` text NOT NULL,
  `name` varchar(250) NOT NULL,
  `label` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `system`
--

INSERT INTO `system` (`id`, `structure`, `name`, `label`) VALUES
(13, '[{\"name\":\"test\",\"type\":\"VARCHAR\",\"length\":250}]', 'api_engine_test', 'api_engine_test'),
(14, '[{\"name\":\"name\",\"type\":\"VARCHAR\",\"fieldType\":\"file\",\"length\":250},{\"name\":\"name2\",\"type\":\"VARCHAR\",\"fieldType\":\"file\",\"length\":250},{\"name\":\"name3\",\"type\":\"VARCHAR\",\"fieldType\":\"file\",\"length\":250},{\"name\":\"name4\",\"type\":\"VARCHAR\",\"fieldType\":\"file\",\"length\":250}]', 'api_engine_file_upload_test', 'api_engine_file_upload_test');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `internal` tinyint(1) NOT NULL,
  `address` varchar(250) NOT NULL,
  `email` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `password`, `active`, `internal`, `address`, `email`) VALUES
(1, 'muhotasim fuad', '$2b$10$29pBrH6DmW3r2yMQsw0SGOsd3hM7THyAXvxeKfpPgtWx5ICp9ui3e', 1, 0, '', 'mdfuad979@gmail.com'),
(2, 'muhotasim fuad', '$2b$10$Wm/CnAnKKuk2M59ERLzAZe129o35jhmtOtXtTMasYmg6WhKXr6itm', 1, 0, '', 'mdfuad@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_engine_file_upload_test`
--
ALTER TABLE `api_engine_file_upload_test`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `api_engine_test`
--
ALTER TABLE `api_engine_test`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `system`
--
ALTER TABLE `system`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_engine_file_upload_test`
--
ALTER TABLE `api_engine_file_upload_test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `api_engine_test`
--
ALTER TABLE `api_engine_test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `system`
--
ALTER TABLE `system`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
