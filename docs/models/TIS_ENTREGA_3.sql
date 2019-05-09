 -- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 01-Maio-2019 às 23:47
-- Versão do servidor: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tis_exemplo_2`
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
-- Estrutura da tabela `pontomaps`
--

CREATE TABLE `pontomaps` (
  `ID` int(11) NOT NULL,
  `IDROTA` int(11) NOT NULL,
  `IDORDEMPONTO` int(11) NOT NULL, 
  `LAT` varchar(30) COLLATE utf8_bin NOT NULL,
  `LNG` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pontousuario`
--

CREATE TABLE `pontousuario` (
  `ID` int(11) NOT NULL,
  `IDROTA` int(11) NOT NULL,
  `IDORDEMPONTO` int(11) NOT NULL,
  `LAT` varchar(30) COLLATE utf8_bin NOT NULL,
  `LNG` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

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

-- --------------------------------------------------------

--
-- Estrutura da tabela `rotamaps`
--

CREATE TABLE `rotamaps` (
  `ID` int(11) NOT NULL,
  `NMROTA` varchar(80) COLLATE utf8_bin NOT NULL,
  `QTDPESSOAS` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `DTINCLUSAO` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

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
-- Indexes for table `pontomaps`
--
ALTER TABLE `pontomaps`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_ponto_rota_idx` (`IDROTA`);

--
-- Indexes for table `pontousuario`
--
ALTER TABLE `pontousuario`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_pontousuario_rota1_idx` (`IDROTA`);

--
-- Indexes for table `rota`
--
ALTER TABLE `rota`
  ADD PRIMARY KEY (`IDROTA`);

--
-- Indexes for table `rotamaps`
--
ALTER TABLE `rotamaps`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID_ROTA` (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doacao`
--
ALTER TABLE `doacao`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `pontomaps`
--
ALTER TABLE `pontomaps`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `pontousuario`
--
ALTER TABLE `pontousuario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `rotamaps`
--
ALTER TABLE `rotamaps`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `doacao`
--
ALTER TABLE `doacao`
  ADD CONSTRAINT `FK_ROTA` FOREIGN KEY (`IDROTA`) REFERENCES `rota` (`IDROTA`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `pontomaps`
--
ALTER TABLE `pontomaps`
  ADD CONSTRAINT `fk_ponto_rota` FOREIGN KEY (`IDROTA`) REFERENCES `rotamaps` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `pontousuario`
--
ALTER TABLE `pontousuario`
  ADD CONSTRAINT `fk_pontousuario_rota1` FOREIGN KEY (`IDROTA`) REFERENCES `rotamaps` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;