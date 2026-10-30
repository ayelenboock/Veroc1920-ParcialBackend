-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-10-2026 a las 01:54:19
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `distribuidora`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre`, `descripcion`, `creado_en`, `actualizado_en`) VALUES
(1, 'Lencería Femenina', 'Corpiños, bombachas, conjuntos, bodys', '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(3, 'Prendas superiores', 'Camisas, blusas, camisetas, musculosas', '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(6, 'Ropa de abrigo', 'Sacos, camperas, pulovers', '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(7, 'Prendas inferiores', 'Pantalones, jeans, shorts y polleras', '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(8, 'Ropa deportiva', 'Calzas, joggers, buzos y remeras deportivas', '2026-10-20 23:20:24', '2026-10-20 23:20:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `id_ciudad` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `codigo_postal` varchar(8) NOT NULL,
  `provincia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`id_ciudad`, `nombre`, `codigo_postal`, `provincia`) VALUES
(5, 'Viedma', '8500', 'Río Negro'),
(6, 'Bariloche', '8400', 'Río Negro'),
(7, 'Cipolletti', '8324', 'Río Negro'),
(8, 'Villa Regina', '8336', 'Río Negro'),
(11, 'General Roca', '8332', 'Río Negro'),
(12, 'Neuquén', '8300', 'Neuquén'),
(13, 'San Martín de los Andes', '8370', 'Neuquén'),
(14, 'Mendoza', '5500', 'Mendoza'),
(15, 'San Miguel de Tucumán', '4000', 'Tucumán'),
(16, 'Ciudad Autónoma de Buenos Aires', '1000', 'CABA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `cuit` varchar(11) NOT NULL,
  `razon_social` varchar(150) DEFAULT NULL,
  `direccion` varchar(255) NOT NULL,
  `id_ciudad` int(11) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `dni` varchar(10) DEFAULT NULL,
  `condicion_iva` enum('Consumidor Final','Responsable Inscripto','Monotributo') NOT NULL DEFAULT 'Consumidor Final',
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre`, `apellido`, `cuit`, `razon_social`, `direccion`, `id_ciudad`, `telefono`, `email`, `dni`, `condicion_iva`, `creado_en`, `actualizado_en`) VALUES
(5, NULL, NULL, '30712345678', 'Boutique Bella SRL', 'Moreno 340, Bariloche', 6, '2944456677', 'compras@boutiquebella.com.ar', NULL, 'Responsable Inscripto', '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(6, NULL, NULL, '30709876543', 'Tienda Urbana SA', 'Av. Bustillo 5600, Bariloche', 6, '2944478899', 'proveedores@tiendaurbana.com.ar', NULL, 'Responsable Inscripto', '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(7, 'Marcela', 'Quiroga', '27284561239', NULL, 'Elflein 1020, Bariloche', 6, '2944467788', 'marcela.quiroga@mail.com', '28456123', 'Monotributo', '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(8, 'Ramiro', 'Benítez', '20331239874', NULL, 'Onelli 1450, Bariloche', 6, '2944489900', 'ramiro.benitez@mail.com', '33123987', 'Consumidor Final', '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(9, 'Natalia', 'Paz', '27389874561', NULL, 'Gallardo 780, Bariloche', 6, '2944490011', 'natalia.paz@mail.com', '38987456', 'Monotributo', '2026-10-20 23:20:24', '2026-10-20 23:20:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compania_envio`
--

CREATE TABLE `compania_envio` (
  `id_compania` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `id_ciudad` int(11) DEFAULT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `compania_envio`
--

INSERT INTO `compania_envio` (`id_compania`, `nombre`, `telefono`, `direccion`, `id_ciudad`, `creado_en`, `actualizado_en`) VALUES
(3, 'ANDREANI', '2984535254', 'Mitre 1211, Gral. Roca', 11, '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(4, 'Transporte Patagonia SRL', '2944435566', 'Av. de los Pioneros 3400, Bariloche', 6, '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(5, 'Correo Express Norte', '3814201133', 'San Juan 720, San Miguel de Tucumán', 15, '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(6, 'Flete Andino', '2614287744', 'Av. San Martín 2100, Mendoza', 14, '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(7, 'Logística Cordillera', '2944441020', 'Av. 12 de Octubre 1650, Bariloche', 6, '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(8, 'Envíos Lagos del Sur', '2972425588', 'Av. San Martín 980, San Martín de los Andes', 13, '2026-10-20 23:20:24', '2026-10-20 23:20:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_pedidos`
--

CREATE TABLE `detalles_pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `detalles_pedidos`
--

INSERT INTO `detalles_pedidos` (`id_pedido`, `id_producto`, `cantidad`, `precio_unitario`, `creado_en`, `actualizado_en`) VALUES
(1, 1, 6, 18500.00, '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(1, 2, 10, 24900.00, '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(2, 3, 8, 65000.00, '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(2, 4, 12, 31000.00, '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(3, 5, 15, 15800.00, '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(4, 3, 5, 68000.00, '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(4, 5, 10, 15800.00, '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(5, 1, 2, 18500.00, '2026-10-20 23:20:24', '2026-10-20 23:20:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `fecha_de_nac` date NOT NULL,
  `fecha_de_ingreso` date NOT NULL,
  `dni` varchar(10) NOT NULL,
  `cuil` varchar(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `puesto` varchar(50) NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id_empleado`, `nombre`, `apellido`, `fecha_de_nac`, `fecha_de_ingreso`, `dni`, `cuil`, `email`, `puesto`, `creado_en`, `actualizado_en`, `activo`) VALUES
(5, 'Lucas', 'Martínez', '1990-04-12', '2019-03-01', '35123456', '20351234563', 'lucas.martinez@distribuidora.com', 'Vendedor', '2026-10-20 23:20:24', '2026-10-20 23:20:24', 1),
(6, 'Valeria', 'López', '1985-11-23', '2016-08-15', '31987654', '27319876548', 'valeria.lopez@distribuidora.com', 'Administrativa', '2026-10-20 23:20:24', '2026-10-20 23:20:24', 1),
(7, 'Federico', 'Sosa', '1993-07-05', '2021-01-10', '37456123', '20374561237', 'federico.sosa@distribuidora.com', 'Encargado de depósito', '2026-10-20 23:20:24', '2026-10-20 23:20:24', 1),
(8, 'Julieta', 'Romero', '1998-02-18', '2023-05-02', '40789321', '27407893214', 'julieta.romero@distribuidora.com', 'Repartidora', '2026-10-20 23:20:24', '2026-10-20 23:20:24', 1),
(9, 'Pablo', 'Acosta', '1982-09-30', '2014-06-20', '29654987', '20296549871', 'pablo.acosta@distribuidora.com', 'Gerente comercial', '2026-10-20 23:20:24', '2026-10-20 23:20:24', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `id_compania` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `estado` enum('Pendiente','En preparacion','Despachado','Entregado','Cancelado') NOT NULL DEFAULT 'Pendiente',
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `id_cliente`, `id_empleado`, `id_compania`, `fecha`, `total`, `estado`, `creado_en`, `actualizado_en`) VALUES
(1, 5, 5, 4, '2026-08-04 13:30:00', 360000.00, 'Entregado', '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(2, 6, 5, 5, '2026-08-21 18:45:00', 892000.00, 'Entregado', '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(3, 7, 9, 6, '2026-09-10 12:15:00', 237000.00, 'Despachado', '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(4, 5, 5, 7, '2026-09-28 14:00:00', 498000.00, 'En preparacion', '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(5, 8, 9, 8, '2026-10-03 20:20:00', 37000.00, 'Pendiente', '2026-10-20 23:20:24', '2026-10-20 23:20:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `nombre_producto` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `id_proveedor`, `id_categoria`, `nombre_producto`, `descripcion`, `precio`, `stock`, `creado_en`, `actualizado_en`) VALUES
(1, 5, 1, 'Conjunto de encaje', 'Corpiño con aro y bombacha de encaje, talles 85 a 100', 18500.00, 40, '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(2, 2, 3, 'Camisa de lino manga larga', 'Camisa de lino, colores surtidos, talles S a XL', 24900.00, 60, '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(3, 3, 6, 'Campera puffer impermeable', 'Campera inflable con capucha desmontable, talles S a XXL', 68000.00, 25, '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(4, 1, 7, 'Jean mom fit tiro alto', 'Jean de denim rígido, talles 36 a 46', 32500.00, 0, '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(5, 4, 8, 'Calza deportiva térmica', 'Calza larga de lycra con frisa interior, talles S a XL', 15800.00, 80, '2026-10-20 23:20:24', '2026-10-20 23:20:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id_proveedor` int(11) NOT NULL,
  `razon_social` varchar(150) NOT NULL,
  `nombre_contacto` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `id_ciudad` int(11) DEFAULT NULL,
  `condicion_iva` enum('Responsable Inscripto','Monotributo','Exento') NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id_proveedor`, `razon_social`, `nombre_contacto`, `telefono`, `email`, `direccion`, `id_ciudad`, `condicion_iva`, `creado_en`, `actualizado_en`) VALUES
(1, 'Textil Andina SRL', 'Martín Gómez', '1145301122', 'ventas@textilandina.com.ar', 'Av. Avellaneda 2850, CABA', 16, 'Responsable Inscripto', '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(2, 'Confecciones del Plata SA', 'Laura Fernández', '1143205566', 'comercial@confeccionesdelplata.com.ar', 'Gascón 640, CABA', 16, 'Responsable Inscripto', '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(3, 'Hilados Patagonia SRL', 'Diego Ruiz', '2944427788', 'pedidos@hiladospatagonia.com.ar', 'Av. de los Pioneros 4200, Bariloche', 6, 'Responsable Inscripto', '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(4, 'Tejidos Norte SA', 'Carolina Díaz', '3814251199', 'contacto@tejidosnorte.com.ar', 'Av. Mitre 1300, San Miguel de Tucumán', 15, 'Responsable Inscripto', '2026-10-20 23:20:24', '2026-10-20 23:20:24'),
(5, 'Taller Costura Fina', 'Sofía Herrera', '2944523344', 'sofia@costurafina.com.ar', 'Mitre 455, Bariloche', 6, 'Monotributo', '2026-10-20 23:20:24', '2026-10-20 23:20:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('0f7847d3-8bf2-4326-9f80-921089a51318', '7fe1883b156ea38232a0667c48148d9043bd5f4b60a568233605f92aef1c9553', '2026-10-30 00:36:42.831', '20261030003642_cp_y_provincia_requeridos', NULL, NULL, '2026-10-30 00:36:42.801', 1),
('3035a23b-d016-4d87-ac67-ac23f662cfc0', '4956f2af347feb9c5e138e1835231ab1a08db3410af3ace469f0879f32d5738a', '2026-10-28 23:18:20.454', '20261028231820_localidades_cp_y_empleado_activo', NULL, NULL, '2026-10-28 23:18:20.434', 1),
('75b4e764-08b7-407c-a7d8-faf27bf5ad7f', 'c8ce888781e43a9e669bcad56693eff31c2817e9281126cd3a05f3c7bb1ea981', '2026-10-28 23:20:35.364', '20261028232035_cp_y_provincia_obligatorios', NULL, NULL, '2026-10-28 23:20:35.357', 1),
('93678d0e-fa9f-4c0a-9d08-47095aada7c3', '296b1d9af71d25e6d2dbfa3f2a73d659b83a4416a953faaf222fc0b47a4bca1c', '2026-10-20 23:16:08.252', '20261015194507_create_usuario', NULL, NULL, '2026-10-20 23:16:07.502', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id_ciudad`),
  ADD UNIQUE KEY `ciudad_provincia_unica` (`nombre`,`provincia`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `cuit` (`cuit`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD KEY `fk_clientes_ciudades` (`id_ciudad`);

--
-- Indices de la tabla `compania_envio`
--
ALTER TABLE `compania_envio`
  ADD PRIMARY KEY (`id_compania`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `fk_compania_envio_ciudades` (`id_ciudad`);

--
-- Indices de la tabla `detalles_pedidos`
--
ALTER TABLE `detalles_pedidos`
  ADD PRIMARY KEY (`id_pedido`,`id_producto`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_empleado`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `cuil` (`cuil`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_empleado` (`id_empleado`),
  ADD KEY `id_compania` (`id_compania`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_proveedor` (`id_proveedor`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id_proveedor`),
  ADD UNIQUE KEY `razon_social` (`razon_social`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_proveedores_ciudades` (`id_ciudad`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id_ciudad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `compania_envio`
--
ALTER TABLE `compania_envio`
  MODIFY `id_compania` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `fk_clientes_ciudades` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id_ciudad`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `compania_envio`
--
ALTER TABLE `compania_envio`
  ADD CONSTRAINT `fk_compania_envio_ciudades` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id_ciudad`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalles_pedidos`
--
ALTER TABLE `detalles_pedidos`
  ADD CONSTRAINT `detalles_pedidos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalles_pedidos_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pedidos_ibfk_3` FOREIGN KEY (`id_compania`) REFERENCES `compania_envio` (`id_compania`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id_proveedor`) ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD CONSTRAINT `fk_proveedores_ciudades` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id_ciudad`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
