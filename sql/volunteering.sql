-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2019 at 12:05 PM
-- Server version: 10.1.40-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `volunteering`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `date` datetime NOT NULL,
  `needed` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`, `date`, `needed`) VALUES
(1, 'La Traviata', '2019-06-28 06:00:00', 8),
(2, 'Don Giovanni', '2019-07-05 00:00:00', 9),
(5, 'My fair lady', '2019-06-30 06:00:00', 5),
(8, 'Aida', '2019-07-10 18:00:00', 4);

-- --------------------------------------------------------

--
-- Table structure for table `volunteers`
--

CREATE TABLE `volunteers` (
  `id` int(11) NOT NULL,
  `name` mediumtext NOT NULL,
  `emailAddress` mediumtext NOT NULL,
  `phoneNumber` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `volunteers`
--

INSERT INTO `volunteers` (`id`, `name`, `emailAddress`, `phoneNumber`) VALUES
(1, 'Lidia Maxim', 'l.maxim@mail.com', '0749456697'),
(2, 'Tina Vasilovschi', 'v.tina@mail.com', '0746889534'),
(3, 'Dani Turu', 'd.turu@mail.com', '0746889599'),
(5, 'Tinus', 'tinus@email.test', '0745885084'),
(6, 'Adi Cozmuta', 'adi@mail.test', '0745449985'),
(7, 'Dani', 'dani.turus@gmail.com', '0748455612');

-- --------------------------------------------------------

--
-- Table structure for table `volunteers_events`
--

CREATE TABLE `volunteers_events` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `volunteer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `volunteers_events`
--

INSERT INTO `volunteers_events` (`id`, `event_id`, `volunteer_id`) VALUES
(7, 1, 1),
(1, 1, 2),
(6, 1, 5),
(8, 1, 7),
(4, 5, 3),
(3, 5, 5),
(2, 5, 6),
(9, 5, 7),
(5, 8, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `volunteers`
--
ALTER TABLE `volunteers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `volunteers_events`
--
ALTER TABLE `volunteers_events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `event_id_2` (`event_id`,`volunteer_id`),
  ADD KEY `event_id` (`event_id`),
  ADD KEY `volunteer_id` (`volunteer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `volunteers`
--
ALTER TABLE `volunteers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `volunteers_events`
--
ALTER TABLE `volunteers_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `volunteers_events`
--
ALTER TABLE `volunteers_events`
  ADD CONSTRAINT `volunteers_events_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `volunteers_events_ibfk_2` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
