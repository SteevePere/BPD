-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 30, 2018 at 08:26 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `users`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` enum('chief','detective','agent') DEFAULT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `hire_date` date DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `login` varchar(20) NOT NULL,
  `password` varchar(128) NOT NULL,
  `status` enum('ON','OFF') NOT NULL,
  `token` varchar(128) DEFAULT NULL,
  `created_by` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`),
  UNIQUE KEY `token` (`token`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `first_name`, `last_name`, `gender`, `birth_date`, `hire_date`, `email`, `login`, `password`, `status`, `token`, `created_by`) VALUES
(4, 'chief', 'Harold', 'Affleck', 'M', '1964-08-12', '1988-07-24', 'steevepere@gmail.com', 'haffleck', '8d8f64908e3db58056d1eb28ce8575705c1ea6d8', 'ON', 'token_chief', ''),
(5, 'detective', 'Katherine', 'Johnson', 'F', '1984-03-01', '2009-04-17', 'steevepere@gmail.com', 'kjohnson', '749f71b69b451783d8fbeb4a8244c0699153b66d', 'ON', 'token_detective', ''),
(6, 'agent', 'Hank', 'Bauer', 'M', '1962-12-04', '1980-06-18', 'steevepere@gmail.com', 'hbauer', '88a6280f076c6e69e05abc72eeeca77143f5d018', 'OFF', 'token_agent', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
