create database if not exists `concessionaria`;

use `concessionaria`;

create table `carros` (
  `id_carro` int not null,
  `nome` varchar(100) not null,
  `marca` varchar(100) not null,
  `cor` varchar(50) not null,
  `preco` double(9,2) not null,
  primary key (`id_carro`)
);

create table `clientes`(
	`id_cliente` int not null,
    `nome` varchar(100) not null,
    `email` varchar(100) not null,
    `endereco` varchar(300) not null,
    primary key (`id_cliente`)
);

create table `distribuidoras` (
  `id_distb` int not null,
  `nome` varchar(100) not null,
  `endereco` varchar(300) not null,
  `cnpj` varchar(14) not null,
  primary key (`id_distb`)
);

create table `funcionarios`(
	`id_func` int not null,
    `nome` varchar(100) not null,
    `cpf` varchar(11) not null,
    primary key(`id_func`)
);



