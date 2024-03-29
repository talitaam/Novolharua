-- MySQL Script generated by MySQL Workbench
-- Thu May  9 08:26:32 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tis_exemplo_2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tis_exemplo_2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tis_exemplo_2` DEFAULT CHARACTER SET utf8 ;
USE `tis_exemplo_2` ;

-- -----------------------------------------------------
-- Table `tis_exemplo_2`.`acao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tis_exemplo_2`.`acao` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `NOMEACAO` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_ACAO` (`ID` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

-- -----------------------------------------------------
-- Table `tis_exemplo_2`.`doador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tis_exemplo_2`.`doador` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `CPFCNPJ` VARCHAR(14) NOT NULL,
  `NOMDOADOR` VARCHAR(150) NOT NULL,
  `TELEFONE` VARCHAR(10) NULL,
  `CELULAR` VARCHAR(11) NOT NULL,
  `EMAIL` VARCHAR(150) NOT NULL,
  `OBSERVACAO` TEXT NULL DEFAULT NULL,
  `STATUS` INT(1) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

-- -----------------------------------------------------
-- Table `tis_exemplo_2`.`rotamaps`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tis_exemplo_2`.`rotamaps` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `NMROTA` VARCHAR(80) NOT NULL,
  `ORIGEM` VARCHAR(200) NOT NULL,
  `DESTINO` VARCHAR(200) NOT NULL,
  `DISTANCIA` VARCHAR(10) NOT NULL,
  `NUMPESSOASMIN` INT(11) NOT NULL,
  `NUMPESSOASMAX` INT(11) NOT NULL,
  `OBSERVACAO` TEXT NULL DEFAULT NULL,
  `DTINCLUSAO` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_ROTA` (`ID` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `tis_exemplo_2`.`doacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tis_exemplo_2`.`doacao` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `IDROTA` INT(11) NOT NULL,
  `NOME` VARCHAR(50) NOT NULL,
  `DTDOACAO` DATE NOT NULL,
  PRIMARY KEY (`ID`, `IDROTA`),
  INDEX `fk_doacao_rotamaps2_idx` (`IDROTA` ASC) ,
  CONSTRAINT `fk_doacao_rotamaps2`
    FOREIGN KEY (`IDROTA`)
    REFERENCES `tis_exemplo_2`.`rotamaps` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `tis_exemplo_2`.`pontomaps`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tis_exemplo_2`.`pontomaps` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `IDROTA` INT(11) NOT NULL,
  `IDORDEMPONTO` INT(11) NOT NULL,
  `LAT` VARCHAR(30) NOT NULL,
  `LNG` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_ponto_rota_idx` (`IDROTA` ASC) ,
  CONSTRAINT `fk_ponto_rota`
    FOREIGN KEY (`IDROTA`)
    REFERENCES `tis_exemplo_2`.`rotamaps` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `tis_exemplo_2`.`pontousuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tis_exemplo_2`.`pontousuario` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `IDROTA` INT(11) NOT NULL,
  `IDORDEMPONTO` INT(11) NOT NULL,
  `LAT` VARCHAR(30) NOT NULL,
  `LNG` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_pontousuario_rota1_idx` (`IDROTA` ASC) ,
  CONSTRAINT `fk_pontousuario_rota1`
    FOREIGN KEY (`IDROTA`)
    REFERENCES `tis_exemplo_2`.`rotamaps` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

-- -----------------------------------------------------
-- Table `tis_exemplo_2`.`acoesdoador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tis_exemplo_2`.`acoesdoador` (
  `IDACAO` INT(11) NOT NULL,
  `IDDOADOR` INT(11) NOT NULL,
  PRIMARY KEY (`IDACAO`, `IDDOADOR`),
  INDEX `fk_acoesdoador_acao_idx` (`IDACAO` ASC) ,
  CONSTRAINT `fk_acoesdoador_acao`
    FOREIGN KEY (`IDACAO`)
    REFERENCES `tis_exemplo_2`.`acao` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION ,
  INDEX `fk_acoesdoador_doador_idx` (`IDDOADOR` ASC) ,
  CONSTRAINT `fk_acoesdoador_doador`
    FOREIGN KEY (`IDDOADOR`)
    REFERENCES `tis_exemplo_2`.`doador` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `acao`(`ID`, `NOMEACAO`) VALUES (1,"Refeição");
INSERT INTO `acao`(`ID`, `NOMEACAO`) VALUES (2,"Higiene");
INSERT INTO `acao`(`ID`, `NOMEACAO`) VALUES (3,"Roupas / Agasalhos");
INSERT INTO `acao`(`ID`, `NOMEACAO`) VALUES (4,"Cursos de capacitação");