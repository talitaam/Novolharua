-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 22-Mar-2019 às 13:28
-- Versão do servidor: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tis_exemplo`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `doacao`
--

CREATE TABLE `doacao` (
  `ID` int(11) NOT NULL,
  `IDROTA` int(11) DEFAULT NULL,
  `NOME` varchar(50) NOT NULL,
  `DTDOACAO` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `doacao`
--

INSERT INTO `doacao` (`ID`, `IDROTA`, `NOME`, `DTDOACAO`) VALUES
(4, 2, 'asd', '2019-03-22'),
(6, 3, 'asd 2', '2019-03-22'),
(7, 1, 'wer', '2019-03-22'),
(8, 1, 'asdf', '2019-03-23'),
(9, 3, '23456', '2019-03-30'),
(10, 2, '34567890', '2019-03-23'),
(11, 3, 'sdfghjk', '2019-03-23');

-- --------------------------------------------------------

--
-- Estrutura da tabela `rota`
--

CREATE TABLE `rota` (
  `IDROTA` int(11) NOT NULL,
  `NMROTA` varchar(100) NOT NULL,
  `SGROTA` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `rota`
--

INSERT INTO `rota` (`IDROTA`, `NMROTA`, `SGROTA`) VALUES
(1, 'Área Hospitalar', 'area_hospitalar'),
(2, 'Praça Savassi', 'praca_savassi'),
(3, 'Praça da Liberdade', 'praca_liberdade');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doacao`
--
ALTER TABLE `doacao`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_ROTA` (`IDROTA`);

--
-- Indexes for table `rota`
--
ALTER TABLE `rota`
  ADD PRIMARY KEY (`IDROTA`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doacao`
--
ALTER TABLE `doacao`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `doacao`
--
ALTER TABLE `doacao`
  ADD CONSTRAINT `FK_ROTA` FOREIGN KEY (`IDROTA`) REFERENCES `rota` (`IDROTA`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;