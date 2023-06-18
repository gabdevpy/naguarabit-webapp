-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 02-06-2021 a las 22:12:32
-- Versión del servidor: 10.3.28-MariaDB-log-cll-lve
-- Versión de PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `naguarab_backend`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `banks_pais`
--

CREATE TABLE `banks_pais` (
  `id` int(11) NOT NULL,
  `codigo` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` text COLLATE utf8_unicode_ci NOT NULL,
  `nombre_largo` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `codpais` varchar(5) COLLATE utf8_unicode_ci NOT NULL COMMENT 'codigo del pais',
  `tipo_pago` text COLLATE utf8_unicode_ci NOT NULL COMMENT '''DEP'': deposito bancario, ''GIRO''',
  `observ` text COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Observaciones, notas del tipo de pago',
  `activo` tinyint(1) NOT NULL COMMENT 'Estatus. 1:activo, 0:inactivo'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='TABLA EN USO. BANCOS POR PAIS';

--
-- Volcado de datos para la tabla `banks_pais`
--

INSERT INTO `banks_pais` (`id`, `codigo`, `nombre`, `nombre_largo`, `codpais`, `tipo_pago`, `observ`, `activo`) VALUES
(1, 'BDV', 'Banco de Venezuela', '', 'VEN', 'DEP', NULL, 1),
(2, 'BPROV', 'Provincial', 'Banco BBVA Provincial (Venezuela)', 'VEN', 'DEP', NULL, 1),
(3, 'BANSC', 'Banesco', '', 'VEN', 'DEP', NULL, 1),
(4, 'BMERC', 'Mercantil', 'Banco Mercantil', 'VEN', 'DEP', NULL, 1),
(5, 'BCARI', 'Bancaribe', NULL, 'VEN', 'DEP', NULL, 1),
(6, 'BTES', 'Banco del Tesoro', NULL, 'VEN', 'DEP', NULL, 1),
(7, 'BICNT', 'Bicentenario', 'Banco Bicentenario', 'VEN', 'DEP', NULL, 1),
(8, 'BCARO', 'Banco Caroní', NULL, 'VEN', 'DEP', NULL, 0),
(9, 'BCP', 'Banco Central de Perú', NULL, 'PER', 'DEP', NULL, 0),
(10, 'BITAU', 'Banco  Itaú', 'Banco Itaú Paraguay', 'PAR', 'DEP', NULL, 1),
(11, 'EFECT', 'Efectivo', 'Pago en efectivo en Paraguay', 'PAR', 'GIRO', NULL, 1),
(12, 'GT', 'Giro Tigo', 'Giro Tigo en Paraguay', 'PAR', 'GIRO', NULL, 1),
(13, 'GC', 'Giro Claro', 'Giro Claro en Paraguay', 'PAR', 'GIRO', NULL, 1),
(14, 'GP', 'Giro Personal', 'Giro Personal en Paraguay', 'PAR', 'GIRO', NULL, 0),
(15, 'WU', 'Western Union', 'Wester Union en Paraguay', 'PAR', 'WU', NULL, 1),
(17, 'BEXT', 'Banco Exterior', 'Banco Exterior Venezuela', 'VEN', 'DEP', NULL, 1),
(18, 'BFAM', 'Banco Familiar', 'Banco Familiar Paraguay', 'PAR', 'DEP', NULL, 1),
(19, 'BVIS', 'Banco Visión', 'Banco Visión Paraguay', 'PAR', 'DEP', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacora_login`
--

CREATE TABLE `bitacora_login` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `login` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `fechahora` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ip` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `cliente_software` text COLLATE utf8_unicode_ci NOT NULL COMMENT 'descripcion de cliente software usado, sistema operativo, navegador, etc.'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacora_tablas`
--

CREATE TABLE `bitacora_tablas` (
  `id` int(11) NOT NULL,
  `nombre_tabla` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `id_ref` int(11) NOT NULL,
  `tipo_mov` char(1) COLLATE utf8_unicode_ci NOT NULL COMMENT 'A:actualizar, I:insertar, E:eliminar',
  `fechahora` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `descripcion` text COLLATE utf8_unicode_ci NOT NULL,
  `valor_actual` int(11) NOT NULL COMMENT 'valores actuales del registro, aplica para Actualizacion y Eliminacion',
  `valor_nuevo` int(11) NOT NULL COMMENT 'valores nuevo del registro, aplica para Insercion y Actualizacion',
  `id_user` int(11) NOT NULL,
  `login` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='campos para rastrear movimiento CRUD de todas las tablas';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `btc_paridad`
--

CREATE TABLE `btc_paridad` (
  `id` int(11) NOT NULL,
  `cod_moneda` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT 'codigo de moneda',
  `nombre_par` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT 'descripcion de moneda',
  `valor_paridad` double DEFAULT NULL COMMENT 'valor del BTC contra la moneda',
  `valor_compra` double DEFAULT 0 COMMENT 'Valor del BTC frente a la moneda, para comprar',
  `valor_venta` double DEFAULT NULL COMMENT 'valor para cambiar btc a esta moneda',
  `fecha` date DEFAULT NULL,
  `fechahora` timestamp NULL DEFAULT current_timestamp() COMMENT 'este campo se actualiza cuando se inserta o actualiza',
  `date_updated` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'fecha ultima actualizacion'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Valores del BTC contra cada moneda';

--
-- Volcado de datos para la tabla `btc_paridad`
--

INSERT INTO `btc_paridad` (`id`, `cod_moneda`, `nombre_par`, `valor_paridad`, `valor_compra`, `valor_venta`, `fecha`, `fechahora`, `date_updated`) VALUES
(1, 'VES', 'BTC/VES', 155863448, 0, NULL, NULL, '2019-07-22 20:49:48', '2019-08-12 17:55:11'),
(2, 'USD', 'BTC/USD', 11419, 0, NULL, NULL, '2019-07-22 20:49:48', '2019-08-12 17:56:15'),
(3, 'USD-VES', 'USD/VES', 13622, 0, NULL, NULL, '2019-07-22 20:49:48', '2019-08-12 17:56:56'),
(6, 'GS', 'Guaraní', NULL, 0, NULL, NULL, '2019-07-22 20:49:48', '2019-08-12 17:55:11'),
(5, 'PCHI', 'PESO CHILENO', NULL, 0, NULL, NULL, '2019-07-22 20:49:48', '2019-08-12 17:55:11'),
(7, 'SOL', 'SOL PERUANO', NULL, 0, NULL, NULL, '2019-07-22 20:49:48', '2019-08-12 17:55:11'),
(8, 'ARS', 'PESO ARGENTINO', NULL, 0, NULL, NULL, '2019-07-22 20:49:48', '2019-08-12 17:55:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `casos_atenciones`
--

CREATE TABLE `casos_atenciones` (
  `id` int(11) NOT NULL,
  `id_reclamo` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `login` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `respuesta` text COLLATE utf8_unicode_ci NOT NULL,
  `id_user_admin` int(11) NOT NULL,
  `nombre_user_admin` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT 'nombre del usuario admin que realizó esta atención',
  `id_transaccion` int(11) DEFAULT NULL COMMENT 'relacion con tabla transaccion, en caso que aplique'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='atencion a los reclamos de usuarios';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `casos_reclamos`
--

CREATE TABLE `casos_reclamos` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `login` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` text COLLATE utf8_unicode_ci NOT NULL,
  `check_respondido` tinyint(1) DEFAULT NULL,
  `check_resuelto` tinyint(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='reclamos de usuarios';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE `ciudad` (
  `id` int(11) NOT NULL,
  `codigo` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `cod_pais` varchar(5) COLLATE utf8_unicode_ci NOT NULL COMMENT 'codigo del pais al que pertenece la ciudad',
  `observ` text COLLATE utf8_unicode_ci NOT NULL COMMENT 'Observaciones, notas',
  `activo` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1:activo, 0:inactivo'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`id`, `codigo`, `nombre`, `cod_pais`, `observ`, `activo`) VALUES
(1, 'CUC', 'Cúcuta', 'COL', '', 1),
(2, 'CCS', 'Caracas', 'VEN', '', 1),
(3, 'BQTO', 'Barquisimeto', 'VEN', 'prueba. linea 2, sdsds', 1),
(4, 'SF', 'San Felipe', 'VEN', '', 1),
(5, 'LMB', 'Lambaré', 'PAR', 'nsnas', 1),
(6, 'SLRNZ', 'San Lorenzo', 'PAR', '', 1),
(7, 'SANT', 'Santiago', 'CHI', '', 1),
(8, 'VAL', 'Valencia', 'VEN', 'Prueba.\nlinea 2', 1),
(9, 'BOG', 'Bogotá', 'COL', '', 1),
(10, 'CAL', 'Cali', 'COL', '', 1),
(11, 'LIM', 'Lima', 'PER', '', 1),
(12, 'BA', 'Buenos Aires', 'ARG', 'Llenar COMBO DE PAISES CON BD', 1),
(13, 'FM', 'Fernando de la Mora', 'PAR', '', 1),
(16, 'MARCB', 'Maracaibo', 'VEN', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formapago_origen`
--

CREATE TABLE `formapago_origen` (
  `id` int(11) NOT NULL,
  `codigo` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` text COLLATE utf8_unicode_ci NOT NULL COMMENT 'Descripción corta forma de pago',
  `codpais` varchar(5) COLLATE utf8_unicode_ci NOT NULL COMMENT 'codigo del pais',
  `cod_banco` varchar(5) COLLATE utf8_unicode_ci NOT NULL COMMENT 'codigo de banco, relacion con tabla banks_pais',
  `nombre_largo` text COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Descripción larga',
  `nombretitular` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `doctitular` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nrocuenta` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tipocuenta` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'A:ahorros, C:corriente, V:virtual',
  `tipocuenta_desc` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'nombre largo para tipo de cuenta',
  `ciudad` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ciudad donde está el operador, para efectivo y WU',
  `observ` text COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Observaciones, notas del tipo de pago',
  `activo` tinyint(1) NOT NULL COMMENT 'Estatus. 1:activo, 0:inactivo'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='usuarios operadores, tabla en desarrollo';

--
-- Volcado de datos para la tabla `formapago_origen`
--

INSERT INTO `formapago_origen` (`id`, `codigo`, `nombre`, `codpais`, `cod_banco`, `nombre_largo`, `nombretitular`, `doctitular`, `nrocuenta`, `tipocuenta`, `tipocuenta_desc`, `ciudad`, `observ`, `activo`) VALUES
(1, 'PAR_WU_1', 'Western Union Paraguay 1', 'PAR', 'WU', 'Western Unión Paraguay, Joseidy Aguilar, Pasaporte 15111222', 'Joseidy Aguilar', '12345678', '', NULL, NULL, 'Asunción', '', 1),
(2, 'PAR_BF1', 'Banco Familiar Paraguay, cuenta 1', 'PAR', 'BFAM', 'Banco Familiar\r\nCuenta Ahorros\r\nGabriel Perez\r\nC.I. 8.656.754', 'Gabriel Perez', '8656754', '38320143', 'A', 'Caja de Ahorros', NULL, '', 1),
(3, 'PAR_BV1', 'Banco Visión 1', 'PAR', 'BVIS', 'Nro Caja de Ahorro: 14582873 / Titular: Carlos Gutiérrez / C.I. : 8.532.291', 'Carlos Gutiérrez', '8532291', '14582873', 'A', 'Caja de Ahorros', NULL, '', 1),
(4, 'ITAU1', 'Banco Itaú, cuenta 1', 'PAR', 'BITAU', 'Caja de Ahorros: 25207909 / Titular: Dina Osma / C.I. : 8.532.292', 'Dina Osma', '8532288', '25207909', 'A', 'Caja de Ahorros', '', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `huso_horario`
--

CREATE TABLE `huso_horario` (
  `id` int(11) NOT NULL,
  `cod_pais` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `huso_horario` int(11) NOT NULL COMMENT 'nro que indica el huso horario. ej: PAR: +3, VEN: +3',
  `fecha_actual` date DEFAULT NULL,
  `hora_actual` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cod_ciudad` varchar(5) COLLATE utf8_unicode_ci NOT NULL COMMENT 'cod de ciudad, para paises con varios husos horarios. ej: brazil'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='almacena datos de husos horario actual de cada pais';

--
-- Volcado de datos para la tabla `huso_horario`
--

INSERT INTO `huso_horario` (`id`, `cod_pais`, `huso_horario`, `fecha_actual`, `hora_actual`, `cod_ciudad`) VALUES
(1, 'VEN', -4, NULL, NULL, ''),
(2, 'PAR', -4, NULL, NULL, ''),
(3, 'COL', -5, NULL, NULL, ''),
(4, 'ARG', -3, NULL, NULL, ''),
(5, 'BOL', -4, NULL, NULL, ''),
(6, 'CHI', -4, NULL, NULL, ''),
(7, 'ECU', -5, NULL, NULL, ''),
(8, 'PER', -5, NULL, NULL, ''),
(9, 'URU', -3, NULL, NULL, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `moneda`
--

CREATE TABLE `moneda` (
  `id` int(11) NOT NULL,
  `codigo` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT 'codigo de moneda',
  `nombre` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT 'descripcion de moneda',
  `nombre_plural` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `simbolo` varchar(5) COLLATE utf8_unicode_ci NOT NULL COMMENT 'simbolo internacional usado',
  `activo` int(11) NOT NULL DEFAULT 1 COMMENT ' 0 es desactivado. 1 es activado '
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `moneda`
--

INSERT INTO `moneda` (`id`, `codigo`, `nombre`, `nombre_plural`, `simbolo`, `activo`) VALUES
(1, 'BS', 'Bolívar', 'Bolívares Soberanos', 'VES', 1),
(2, 'USD', 'Dólar EEUU', 'Dólares', '$USD', 1),
(3, '$COL', 'Peso colombiano', 'Pesos colombianos', '$', 1),
(6, 'GS', 'Guaraní', 'Guaraníes', '₲', 1),
(5, '$CHI', 'Peso Chileno', 'Pesos Chilenos', '$', 1),
(7, 'SOL', 'Sol', 'Soles', 'S/', 1),
(8, '$ARS', 'Peso Argentino', 'Pesos Argentinos', '$', 1),
(9, '$BOL', 'Peso Boliviano', 'Pesos Bolivianos', 'b$.', 1),
(10, 'BAL', 'Balboa', 'Balboas', 'BAL', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monedas_pares`
--

CREATE TABLE `monedas_pares` (
  `id` int(11) NOT NULL,
  `cod_moneda` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT 'codigo de moneda',
  `cod_moneda_contra` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `nombre_par` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT 'descripcion de moneda',
  `valor_par` double DEFAULT 0 COMMENT 'Valor de una moneda respecto a otra. Cuantas unidades se necesitan de una cantidad para comprar 1 unidad de la otra'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `monedas_pares`
--

INSERT INTO `monedas_pares` (`id`, `cod_moneda`, `cod_moneda_contra`, `nombre_par`, `valor_par`) VALUES
(1, 'BS', '', 'Bolívar', 0),
(2, 'USD', '', 'Dolar Americano', 0),
(3, 'PCOL', '', 'Peso colombiano', 0),
(6, 'GS', '', 'Guaraní', 0),
(5, 'PCHI', '', 'PESO CHILENO', 0),
(7, 'SOL', '', 'SOL PERUANO', 0),
(8, 'ARS', '', 'PESO ARGENTINO', 0),
(9, 'VES', 'USD', 'Bolivar contra dolar', 11000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monedas_paridad_tentativo`
--

CREATE TABLE `monedas_paridad_tentativo` (
  `id` int(11) NOT NULL,
  `cod_moneda` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT 'codigo de moneda',
  `cod_moneda_contra` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `nombre_par` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT 'descripcion de moneda',
  `valor_compra` double DEFAULT 0 COMMENT 'Valor del BTC frente a la moneda, para comprar',
  `valor_venta` double DEFAULT NULL COMMENT 'valor para cambiar btc a esta moneda',
  `fecha` date DEFAULT NULL,
  `fechahora` timestamp NULL DEFAULT current_timestamp() COMMENT 'este campo se actualiza cuando se inserta o actualiza',
  `valor_paridad` double DEFAULT NULL COMMENT 'valor parida de una moneda contra, sin importar si es compra o venta'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Valores del BTC contra cada moneda';

--
-- Volcado de datos para la tabla `monedas_paridad_tentativo`
--

INSERT INTO `monedas_paridad_tentativo` (`id`, `cod_moneda`, `cod_moneda_contra`, `nombre_par`, `valor_compra`, `valor_venta`, `fecha`, `fechahora`, `valor_paridad`) VALUES
(1, 'BS', '', 'Bolívar', 0, NULL, NULL, '2019-07-22 20:49:48', NULL),
(2, 'USD', '', 'Dolar Americano', 0, NULL, NULL, '2019-07-22 20:49:48', NULL),
(3, 'PCOL', '', 'Peso colombiano', 0, NULL, NULL, '2019-07-22 20:49:48', NULL),
(6, 'GS', '', 'Guaraní', 0, NULL, NULL, '2019-07-22 20:49:48', NULL),
(5, 'PCHI', '', 'PESO CHILENO', 0, NULL, NULL, '2019-07-22 20:49:48', NULL),
(7, 'SOL', '', 'SOL PERUANO', 0, NULL, NULL, '2019-07-22 20:49:48', NULL),
(8, 'ARS', '', 'PESO ARGENTINO', 0, NULL, NULL, '2019-07-22 20:49:48', NULL),
(9, 'VES', 'USD', 'Bolivar contra dolar', 11000, NULL, NULL, '2019-07-22 20:49:48', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacion`
--

CREATE TABLE `notificacion` (
  `id` int(11) NOT NULL COMMENT 'id de la notificacion',
  `cod_tipo` varchar(5) COLLATE utf8_unicode_ci NOT NULL COMMENT 'definir cuando se programen las notificaciones',
  `fechahora` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `login_user` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT 'login de usuario que recibe la notificacion',
  `descripcion` text COLLATE utf8_unicode_ci NOT NULL COMMENT 'texto de la notificacion',
  `user_checked` tinyint(1) DEFAULT NULL COMMENT 'indica que el usuario ya vio la notificacion'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='notificaciones del sistema a usuarios';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacion_respuesta`
--

CREATE TABLE `notificacion_respuesta` (
  `id` int(11) NOT NULL,
  `id_notificacion` int(11) NOT NULL,
  `respuesta_user` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='respuesta de usuarios a notificaciones';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacion_tipo`
--

CREATE TABLE `notificacion_tipo` (
  `id` int(11) NOT NULL,
  `codigo` int(11) NOT NULL COMMENT 'codigo de tipo',
  `descripcion` int(11) NOT NULL COMMENT 'descripcion tipo de notificacion',
  `observaciones` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='tipos de notificaciones a usuarios';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago_destino`
--

CREATE TABLE `pago_destino` (
  `id` int(11) NOT NULL,
  `id_transaccion` int(11) NOT NULL COMMENT 'relacion con tabla transaccion',
  `login_user` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `cod_pais` varchar(5) COLLATE utf8_unicode_ci NOT NULL COMMENT 'cod pais destino',
  `monto` double(8,2) NOT NULL COMMENT 'monto del pago en moneda de destino',
  `cod_banco` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `nroctabank` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT 'nro de cuenta bancaria',
  `check_realizado` tinyint(1) DEFAULT 0 COMMENT 'indica si el pago/transferencia ya fue realizado',
  `login_user_pagador` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'login de user OPERADOR que hizo la transferencia',
  `img_comprob` tinytext COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'url de imagen que comprueba la transaccion, bien sea foto o imagen escaneada',
  `fechahora_comprobante` timestamp NULL DEFAULT NULL COMMENT 'fecha/hora de comprobante de pago por parte del banco',
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'fecha y hora de registro, segun hora del servidor',
  `check_admin` int(11) DEFAULT NULL COMMENT 'verificacion por parte de un usuario admin. OPCIONAL',
  `login_user_admin` int(11) DEFAULT NULL COMMENT 'login del usuario admin que hizo la verificacion. OPCIONAL',
  `fechahora_check` timestamp NULL DEFAULT NULL COMMENT 'fecha y hora de verificacion por parte de un user admin. OPCIONAL',
  `observ_user_check` text COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'observaciones registrador por usuario que hace el chequeo de la transferencia. OPCIONAL',
  `observ_user` tinytext COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'observaciones registrada por usuario',
  `check_user_cliente` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'verificacion por parte del usuario cliente, de que la transferencia se le acredito con exito'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='pagos realizados a cuenta de usuarios';

--
-- Volcado de datos para la tabla `pago_destino`
--

INSERT INTO `pago_destino` (`id`, `id_transaccion`, `login_user`, `cod_pais`, `monto`, `cod_banco`, `nroctabank`, `check_realizado`, `login_user_pagador`, `img_comprob`, `fechahora_comprobante`, `date_created`, `check_admin`, `login_user_admin`, `fechahora_check`, `observ_user_check`, `observ_user`, `check_user_cliente`) VALUES
(1, 4, 'jmercado', 'VEN', 10000.00, 'MERC', '01052222333344445555', 1, 'gperez', 'img/comprobantes/destino/vzla/4.jpg', NULL, '2019-08-16 20:16:33', NULL, NULL, NULL, NULL, NULL, 0),
(2, 4, 'jmercado', 'VEN', 2000.00, 'BDV', '01021212121212121555', 1, 'gperez', NULL, NULL, '2019-08-16 20:29:41', NULL, NULL, NULL, NULL, NULL, 0),
(3, 4, 'jmercado', 'VEN', 1000.00, 'PROV', '01082222333344445555', 0, NULL, NULL, NULL, '2019-08-16 20:29:41', NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago_origen`
--

CREATE TABLE `pago_origen` (
  `id` int(11) NOT NULL,
  `id_transaccion` int(11) NOT NULL COMMENT 'relacion: id de tabla transaccion',
  `nro_ref_transferencia` int(11) NOT NULL COMMENT 'nro referencia de transferencia',
  `login_user` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cod_pais` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'PAR' COMMENT 'codigo pais origen',
  `monto` double(8,2) NOT NULL COMMENT 'monto del pago',
  `formapago` varchar(5) COLLATE utf8_unicode_ci NOT NULL COMMENT 'forma de pago en origen. DEP: deposito bancario. GIRO: giro de alguna billetera )tigo, personal, claro, westerm)	',
  `detalles_formapago` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT 'debe ser relacion con otra tabla, llamada formaspago',
  `img_comprob` int(11) NOT NULL COMMENT 'url de imagen que comprueba la transaccion, bien sea foto o imagen escaneada',
  `fecha_oper` date DEFAULT NULL COMMENT 'fecha operacion indicada por el usuario',
  `hora_oper` time DEFAULT NULL COMMENT 'hota operacion registrada por usuario',
  `observ` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `detalles` text COLLATE utf8_unicode_ci NOT NULL,
  `check_admin` tinyint(1) DEFAULT NULL COMMENT 'verificacion por parte de un usuario admin. OPCIONAL',
  `user_admin` int(11) DEFAULT NULL COMMENT 'login del usuario admin que hizo la verificacion. OPCIONAL',
  `fechahora_check` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'fecha y hora de verificacion por parte de un user admin',
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'fechay hora de registro/actualizacion',
  `check_realizado` tinyint(1) DEFAULT NULL COMMENT 'indica si el pago/transferencia ya fue realizao, es marcado por un user admin'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='pagos en moneda local, realizados por usuarios a cuentas del sitio';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

CREATE TABLE `pais` (
  `id` int(11) NOT NULL,
  `codigo` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `cod_moneda` varchar(6) COLLATE utf8_unicode_ci NOT NULL COMMENT 'moneda oficial del pais',
  `observ` text COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Observaciones',
  `activo` tinyint(1) DEFAULT 1 COMMENT '0 es desactivado. 1 es activado',
  `url_img_bandera` text COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `pais`
--

INSERT INTO `pais` (`id`, `codigo`, `nombre`, `cod_moneda`, `observ`, `activo`, `url_img_bandera`) VALUES
(27, 'VEN', 'Venezuela', 'BS', 'Prueba', 1, NULL),
(2, 'PAR', 'Paraguay', 'GS', '', 1, NULL),
(3, 'COL', 'Colombia', '$COL', NULL, 0, NULL),
(4, 'PER', 'Peru', 'SOL', 'Perú', 1, NULL),
(5, 'CHI', 'Chile', 'SOL', '', 0, NULL),
(6, 'ECU', 'Ecuador', '$ARS', '', 0, NULL),
(13, 'BOL', 'Bolivia', '$BOL', '', 0, NULL),
(12, 'ARG', 'Argentina', '$ARS', 'Sur América', 0, NULL),
(25, 'PR', 'Puerto Rico', '', 'Agregar moneda', 0, NULL),
(15, 'URU', 'Uruguay', '', 'Agregar moneda', 0, NULL),
(18, 'BRA', 'Brasil', '', 'Agregar moneda', 0, NULL),
(19, 'PAN', 'Panama', 'BAL', 'Agregar moneda', 0, NULL),
(23, 'CR', 'Costa Rica', '', 'Agregar moneda.\r\nCentroAmerica', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prueba`
--

CREATE TABLE `prueba` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t1`
--

CREATE TABLE `t1` (
  `a` int(11) DEFAULT NULL,
  `ts` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transacciones`
--

CREATE TABLE `transacciones` (
  `id` int(11) NOT NULL,
  `login` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `user_observ` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `origen_codpais` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'PAR' COMMENT 'codigo pais origen',
  `destino_codpais` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'VEN' COMMENT 'codigo pais destino',
  `origen_monto` double NOT NULL,
  `destino_monto` double NOT NULL,
  `monto_dolares` double DEFAULT NULL COMMENT 'monto origen en dolares, segun calculadora',
  `tasa_dolar_origen` double NOT NULL COMMENT 'tasa dolar respecto a moneda origen, al momento de realizar el calculo',
  `tasa_dolar_destino` double DEFAULT NULL COMMENT 'tasa dolar respecto a moneda destino, , al momento de realizar el calculo',
  `destino_observ` tinytext COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'observaciones sobre el pago destino, escrito por el usuario',
  `observ_admin` text COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'observaciones escritas por un usuario administrador',
  `fechahora_origen` timestamp NULL DEFAULT current_timestamp() COMMENT 'fecha y hora en que se hizo el registro en el sistema, segun huso horario de pais origen',
  `fechahora_destino` timestamp NULL DEFAULT NULL COMMENT 'fecha/hora de registro, segun huso horario de pais destino',
  `check_admin` int(11) DEFAULT NULL COMMENT 'verificacion por parte de un usuario admin. verifica que los datos, montos, tasas, etc, registrados son correctos. Y que se puede proceder a realizar la operacion',
  `user_admin` int(20) DEFAULT NULL COMMENT 'login del usuario admin que hizo la verificacion',
  `fechahora_check` timestamp NULL DEFAULT NULL COMMENT 'fecha y hora de verificacion por parte de un user admin segun el servidor',
  `date_created` timestamp NULL DEFAULT current_timestamp() COMMENT 'fecha y hora en que se hizo el registro en el sistema, segun hora del servidor',
  `date_updated` timestamp NULL DEFAULT NULL COMMENT 'ultima fecha en que se actualizo el registro',
  `status` varchar(6) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'New' COMMENT 'NEW, ORI_OK, DES_OK, FIN, CANC, ANUL',
  `status_PO` varchar(5) COLLATE utf8_unicode_ci NOT NULL COMMENT 'status de pago en origen. A:agregado por cliente. OK: verificado por operador	',
  `status_PD` varchar(5) COLLATE utf8_unicode_ci NOT NULL COMMENT 'status de pago en destino: A: por cliente. OK: verificado por operador',
  `activo` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1: activo, 0: inactiva. indica si la transaccion esta activa o no',
  `id_formapago_origen` int(11) NOT NULL COMMENT 'id forma de pago elegida en origen	',
  `porc_comision` double DEFAULT NULL,
  `monto_comision_dolares` double DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='transacciones, implica calculo de pago en origen. pago en destino. comisiones';

--
-- Volcado de datos para la tabla `transacciones`
--

INSERT INTO `transacciones` (`id`, `login`, `user_observ`, `origen_codpais`, `destino_codpais`, `origen_monto`, `destino_monto`, `monto_dolares`, `tasa_dolar_origen`, `tasa_dolar_destino`, `destino_observ`, `observ_admin`, `fechahora_origen`, `fechahora_destino`, `check_admin`, `user_admin`, `fechahora_check`, `date_created`, `date_updated`, `status`, `status_PO`, `status_PD`, `activo`, `id_formapago_origen`, `porc_comision`, `monto_comision_dolares`) VALUES
(4, 'jmercado', 'Prueba insert', 'PAR', 'VEN', 6000, 13000, 6000, 0, 13000, NULL, NULL, '2019-08-05 21:04:40', NULL, NULL, NULL, NULL, '2019-08-05 21:04:40', NULL, 'PO', 'A', 'A', 1, 0, NULL, NULL),
(2, 'gperez', 'Prueba insert', 'PAR', 'VEN', 12000, 26000, 6000, 0, 13000, NULL, '', '2019-08-05 19:57:40', NULL, NULL, NULL, NULL, '2019-08-05 20:31:29', NULL, 'PD', 'OK', '', 1, 0, NULL, NULL),
(3, 'ja.aguilar', 'Prueba insert', 'PAR', 'VEN', 12000, 26000, 6000, 0, 13000, NULL, NULL, '2019-08-05 21:04:06', NULL, NULL, NULL, NULL, '2019-08-05 21:04:06', NULL, 'FIN', 'OK', 'A', 1, 0, NULL, NULL),
(5, 'jmercado', 'Prueba insert', 'PAR', 'VEN', 6000, 13000, 6000, 0, 13000, NULL, NULL, '2019-08-05 21:50:42', NULL, NULL, NULL, NULL, '2019-08-05 21:50:42', NULL, 'FIN', 'OK', 'OK', 1, 0, NULL, NULL),
(6, 'venebit', 'Prueba insert', 'PAR', 'VEN', 6000, 13000, 6000, 0, 13000, NULL, NULL, '2019-08-05 21:52:21', NULL, NULL, NULL, NULL, '2019-08-05 21:52:21', NULL, 'New', '', '', 1, 0, NULL, NULL),
(14, 'dosma', NULL, 'PAR', 'VEN', 18000, 38983.17, 6007, 0, 13009.55, NULL, NULL, '2019-08-12 14:17:08', '2019-08-12 14:17:08', NULL, NULL, NULL, '2019-08-12 14:17:08', NULL, 'New', '', '', 1, 0, NULL, NULL),
(13, 'gperez', NULL, 'PAR', 'VEN', 18000, 38983.17, 6007, 0, 13009.55, NULL, NULL, '2019-08-06 15:07:37', '2019-08-06 15:07:37', NULL, NULL, NULL, '2019-08-06 15:07:37', NULL, 'CC', '', '', 1, 0, NULL, NULL),
(15, 'romand', NULL, 'PAR', 'VEN', 18150, 39308.03, 6007, 0, 13009.55, NULL, NULL, '2019-08-14 16:57:28', '2019-08-14 16:57:28', NULL, NULL, NULL, '2019-08-14 16:57:28', NULL, 'CO', '', '', 1, 0, NULL, NULL),
(16, 'admin', NULL, 'PAR', 'VEN', 65000, 1309730, 10, 6500, 130973, NULL, NULL, '2020-08-19 12:08:35', NULL, NULL, NULL, NULL, '2020-08-19 12:08:35', NULL, 'New', '', '', 1, 0, NULL, NULL),
(17, 'admin', NULL, 'PAR', 'VEN', 65000, 1309730, 10, 6500, 130973, NULL, NULL, '2020-11-04 12:18:03', NULL, NULL, NULL, NULL, '2020-11-04 12:18:03', NULL, 'New', '', '', 1, 0, NULL, NULL),
(18, 'admin', NULL, 'PAR', 'VEN', 65000, 1309730, 10, 6500, 130973, NULL, NULL, '2020-11-07 13:03:04', NULL, NULL, NULL, NULL, '2020-11-07 13:03:04', NULL, 'New', '', '', 1, 0, NULL, NULL),
(19, 'admin', NULL, 'PAR', 'VEN', 300000, 6044908, 46.15, 6500, 130973, NULL, NULL, '2020-12-06 11:38:21', NULL, NULL, NULL, NULL, '2020-12-06 11:38:21', NULL, 'New', '', '', 1, 0, NULL, NULL),
(20, 'admin', NULL, 'PAR', 'VEN', 65000, 1309730, 10, 6500, 130973, NULL, NULL, '2020-12-06 11:41:18', NULL, NULL, NULL, NULL, '2020-12-06 11:41:18', NULL, 'New', '', '', 1, 0, NULL, NULL),
(21, 'admin', NULL, 'PAR', 'VEN', 65000, 1309730, 10, 6500, 130973, NULL, NULL, '2020-12-06 19:39:52', NULL, NULL, NULL, NULL, '2020-12-06 19:39:52', NULL, 'New', '', '', 1, 0, NULL, NULL),
(22, 'admin', NULL, 'PAR', 'VEN', 65000, 1309730, 10, 6500, 130973, NULL, NULL, '2021-05-21 20:45:02', NULL, NULL, NULL, NULL, '2021-05-21 20:45:02', NULL, 'New', '', '', 1, 4, NULL, NULL),
(23, 'admin', NULL, 'PAR', 'VEN', 65000, 1309730, 10, 6500, 130973, NULL, NULL, '2021-05-22 19:34:23', NULL, NULL, NULL, NULL, '2021-05-22 19:34:23', NULL, 'New', '', '', 1, 4, NULL, NULL),
(24, 'admin', NULL, 'PAR', 'VEN', 65000, 1309730, 10, 6500, 130973, NULL, NULL, '2021-05-23 22:29:14', NULL, NULL, NULL, NULL, '2021-05-23 22:29:14', NULL, 'New', '', '', 1, 3, NULL, NULL),
(25, 'admin', NULL, 'PAR', 'VEN', 65000, 1309730, 10, 6500, 130973, NULL, NULL, '2021-05-29 01:58:24', NULL, NULL, NULL, NULL, '2021-05-29 01:58:24', NULL, 'New', '', '', 1, 4, NULL, NULL),
(26, 'admin', NULL, 'PAR', 'VEN', 10000, 201497, 1.54, 6500, 130973, NULL, NULL, '2021-05-31 02:29:20', NULL, NULL, NULL, NULL, '2021-05-31 02:29:20', NULL, 'New', '', '', 1, 3, NULL, NULL),
(27, 'admin', NULL, 'PAR', 'VEN', 65000, 1309730, 10, 6500, 130973, NULL, NULL, '2021-06-02 22:48:08', NULL, NULL, NULL, NULL, '2021-06-02 22:48:08', NULL, 'New', '', '', 1, 4, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transacciones_btc`
--

CREATE TABLE `transacciones_btc` (
  `id` int(11) NOT NULL,
  `id_transaccion` int(11) NOT NULL COMMENT 'relacion: id de tabla transaccion',
  `tasa_btc_origen` double NOT NULL COMMENT 'tasa del btc respecto a moneda origen, usada realmente para comprar',
  `tasa_btc_destino` double NOT NULL COMMENT 'tasa del btc respecto a moneda destino, usada realmente para vender. POSIBLEMENTE ESTE SOBRANDO ESTE CAMPO',
  `origen_codpais` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'PAR' COMMENT 'codigo pais origen',
  `destino_codpais` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'VEN' COMMENT 'codigo pais destino',
  `origen_monto` double NOT NULL COMMENT 'monto en moneda origen',
  `destino_monto` double NOT NULL COMMENT 'monto en moneda destino',
  `btc_monto_buy` double DEFAULT 0 COMMENT 'monto de btc comprado, equivalente al monto en moneda origen',
  `btc_monto_sell` double DEFAULT 0 COMMENT 'monto de btc vendido, equivalente al monto en moneda destino',
  `btc_dif` double DEFAULT 0 COMMENT 'diferencia entre btc compra y venta.si es positivo fue ganancia, si es negativo seria perdida. es redudante. se puede CALCULAR',
  `monto_destino_dolares` double DEFAULT NULL COMMENT 'monto destino en dolares',
  `monto_origen_dolares` double DEFAULT NULL COMMENT 'monto origen en dolares',
  `dif_dolar` double DEFAULT NULL COMMENT 'monto diferencia en dolares. indica la ganancia por compra/venta. POSIBLEMENTE ESTA REDUDANTE',
  `fechahora_buy` timestamp NULL DEFAULT NULL COMMENT 'fecha y hora de compra de btc, segun servidor',
  `fechahora_sell` double DEFAULT NULL COMMENT 'fecha y hora de venta de btc, segun servidor',
  `tasa_dolar_origen` double DEFAULT NULL COMMENT 'tasa dolar respecto a moneda origen, usando el btc, al momento de la compra de btc',
  `tasa_dolar_destino` double DEFAULT NULL COMMENT 'tasa dolar respecto a moneda destino, , al momento de realizar la venta de btc',
  `observ_buy` tinytext COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'observaciones sobre compra de btc',
  `observ_venta` tinytext COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'observaciones sobre venta de btc',
  `check_admin` int(11) DEFAULT NULL COMMENT 'verificacion por parte de un usuario admin. verifica que los datos, montos, tasas, etc, registrados son correctos. Y que se puede proceder a realizar la operacion',
  `user_admin` int(20) DEFAULT NULL COMMENT 'login del usuario admin que hizo la verificacion',
  `date_created` timestamp NULL DEFAULT current_timestamp() COMMENT 'fecha y hora en que se hizo el registro en el sistema, segun hora del servidor',
  `date_updated` timestamp NULL DEFAULT NULL COMMENT 'ultima fecha en que se actualizo el registro',
  `activo` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1: activo, 0: inactiva. indica si la transaccion esta activa o no',
  `tasa_btc_dolar` float NOT NULL COMMENT 'tasa btc en dolar al momento de la transaccion'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='transacciones, en terminos de btc. compras y ventas. data recopilada por trabajo de operadores';

--
-- Volcado de datos para la tabla `transacciones_btc`
--

INSERT INTO `transacciones_btc` (`id`, `id_transaccion`, `tasa_btc_origen`, `tasa_btc_destino`, `origen_codpais`, `destino_codpais`, `origen_monto`, `destino_monto`, `btc_monto_buy`, `btc_monto_sell`, `btc_dif`, `monto_destino_dolares`, `monto_origen_dolares`, `dif_dolar`, `fechahora_buy`, `fechahora_sell`, `tasa_dolar_origen`, `tasa_dolar_destino`, `observ_buy`, `observ_venta`, `check_admin`, `user_admin`, `date_created`, `date_updated`, `activo`, `tasa_btc_dolar`) VALUES
(4, 0, 0, 0, 'PAR', 'VEN', 6000, 13000, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 6000, 13000, NULL, NULL, NULL, NULL, '2019-08-05 21:04:40', NULL, 1, 0),
(2, 0, 0, 0, 'PAR', 'VEN', 12000, 26000, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 6000, 13000, '', NULL, NULL, NULL, '2019-08-05 20:31:29', NULL, 1, 0),
(3, 0, 0, 0, 'PAR', 'VEN', 12000, 26000, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 6000, 13000, NULL, NULL, NULL, NULL, '2019-08-05 21:04:06', NULL, 1, 0),
(5, 0, 0, 0, 'PAR', 'VEN', 6000, 13000, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 6000, 13000, NULL, NULL, NULL, NULL, '2019-08-05 21:50:42', NULL, 1, 0),
(6, 0, 0, 0, 'PAR', 'VEN', 6000, 13000, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 6000, 13000, NULL, NULL, NULL, NULL, '2019-08-05 21:52:21', NULL, 1, 0),
(14, 0, 0, 0, 'PAR', 'VEN', 18000, 38983.17, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 6007, 13009.55, NULL, NULL, NULL, NULL, '2019-08-12 14:17:08', NULL, 1, 0),
(13, 0, 0, 0, 'PAR', 'VEN', 18000, 38983.17, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 6007, 13009.55, NULL, NULL, NULL, NULL, '2019-08-06 15:07:37', NULL, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `es_admin` tinyint(1) DEFAULT 0 COMMENT 'indica que el usuario es administrador',
  `login` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'nombre de usuario, por defecto sera igual al email. o un codigo de usuario cualquiera. puede formarse con sus datos',
  `nombre` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `nro_documento` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'doc identidad',
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `telefono` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'telefono de usuario',
  `password` text COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'password codificado con MD5 o algun otro metodo',
  `cod_pais` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cod_ciudad` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'codigo de ciudad, localidad, provincia del usuario',
  `url_foto` text COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'URL que indica archivo de foto o avatar',
  `date_primeratransaccion` date DEFAULT NULL COMMENT 'fecha de primera transaccion',
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'fecha registro de cuenta',
  `date_updated` int(11) DEFAULT NULL COMMENT 'fecha ultima actualizacion de datos',
  `observ` text COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'notas, comentarios, ingresados por el admin ...',
  `activo` tinyint(1) DEFAULT 1 COMMENT '1:activo, 0:inactivo',
  `url_img_documento` text COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'url de imagen que comprueba la documento, bien sea foto o imagen escaneada'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='usuarios de la aplicacion, clientes y operadores, etc.';

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `es_admin`, `login`, `nombre`, `nro_documento`, `email`, `telefono`, `password`, `cod_pais`, `cod_ciudad`, `url_foto`, `date_primeratransaccion`, `date_created`, `date_updated`, `observ`, `activo`, `url_img_documento`) VALUES
(3, 0, 'dosma', 'Dina Osma', '', 'dosma@gmail.com', '+595992123456', '0', 'PAR', 'FM', '', NULL, '2019-07-12 18:28:10', 0, 'ssss', 1, ''),
(4, 0, 'romand', 'Denis Roman', '', 'romand@gmail.com', '+595981654321', '0', 'PAR', 'ASUNC', '', NULL, '2019-07-12 18:28:10', 0, '', 1, ''),
(46, 0, 'gperez', 'Gabriel Pérez', '', 'gperez@gmail.com', '+595992860184', '123', 'VEN', 'SF', '', NULL, '2019-07-12 18:28:10', 0, 'Linea 1. Linea 2. Linea 3\nacenos\náéíóú', 1, ''),
(85, 0, 'germontilla', 'Gerardo Montilla', '', 'user@mail.com', '+5689898989', NULL, 'CHI', 'SANT', NULL, NULL, '2019-07-19 18:19:23', NULL, NULL, 1, ''),
(86, 0, 'cguti', 'Carlos Gutierrez', '', 'user7@mail.com', '+595992123456', NULL, 'PAR', 'SLRNZ', NULL, NULL, '2019-07-22 17:29:27', NULL, NULL, 1, ''),
(74, 0, 'jdanielperez', 'Jose Daniel Perez', '', 'jdanielperez77@gmail.com', '+584164542962', NULL, 'VEN', 'VAL', NULL, NULL, '2019-07-19 15:35:55', NULL, NULL, 1, ''),
(87, 0, 'verom', 'Veronica Marcone', '', 'user777@mail.com', '+555656656', NULL, 'COL', 'SLRNZ', NULL, NULL, '2019-07-22 17:30:12', NULL, NULL, 1, ''),
(88, 0, 'moraimafonseca', 'Moraima Fonseca', '', 'moraimafonseca10@gmail.com', '+584264391368', NULL, 'VEN', 'SF', NULL, NULL, '2019-07-22 17:31:43', NULL, NULL, 1, ''),
(89, 0, 'alvaleromendoza', 'Alvaro Valero', '', 'alvaleromendoza@mail.com', '+58426123456', NULL, 'VEN', 'BQTO', NULL, NULL, '2019-07-22 18:30:31', NULL, 'probé acentos. que rollo con los acentos!!!', 1, ''),
(90, 0, 'ja.aguilar', 'Joseidy Aguilar', '', 'user878787@mail.com', '+584269570383', NULL, 'VEN', 'BQTO', NULL, NULL, '2019-07-22 18:49:38', NULL, '', 1, ''),
(91, 0, 'gladimaradjunta', 'Gladimar Adjunta', '', 'use123@mail.com', '+57898989898', NULL, 'COL', 'BOG', NULL, NULL, '2019-07-22 18:50:00', NULL, NULL, 1, ''),
(93, 0, 'msuarez', 'Mariangel Suarez', '', 'msuarez@mail.com', '+518989898', NULL, 'PER', 'LIM', NULL, NULL, '2019-07-24 13:25:35', NULL, NULL, 1, ''),
(94, 0, 'zescalona', 'Zenaida Escalona', '', 'zescalona@gmail.com', '+', NULL, 'VEN', 'BQTO', NULL, NULL, '2019-07-24 13:30:37', NULL, '', 1, ''),
(99, 0, 'frodriguez', 'Francisco Rodriguez', '', 'abcuser@mail.com', '+', NULL, 'COL', 'SANT', NULL, NULL, '2019-07-24 17:08:19', NULL, '', 1, ''),
(98, 0, 'jrivera', 'Jairo Rivera', '', 'jrivera@gmail.com', '+57', NULL, 'COL', 'CAL', NULL, NULL, '2019-07-24 15:03:41', NULL, NULL, 1, ''),
(101, 0, 'jmercado', 'Juan Mercado', '', 'jmercado@gmail.com', '+', NULL, 'PAR', '', NULL, NULL, '2019-07-30 19:59:35', NULL, '', 1, ''),
(102, 0, 'venebit', 'Naguarabit operador en Vzla', NULL, 'Venebit@gmail.com', '+', NULL, 'VEN', 'SF', NULL, NULL, '2019-08-14 13:04:01', NULL, '', 1, NULL),
(103, 0, 'admin', 'Admin Naguarabit Backend', NULL, 'naguarabit@gmail.com', '', NULL, 'PAR', 'LMB', NULL, NULL, '2021-05-22 16:09:08', NULL, NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_avatar`
--

CREATE TABLE `user_avatar` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `login` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `url_image` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='avatar de usuarios, o fotos de perfil';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_bank`
--

CREATE TABLE `user_bank` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `codbank` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `nombank` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `nro_cuenta` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `nombretitular` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `doctitular` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Cuentas bancarias destino de usuarios';

--
-- Volcado de datos para la tabla `user_bank`
--

INSERT INTO `user_bank` (`id`, `id_user`, `codbank`, `nombank`, `nro_cuenta`, `nombretitular`, `doctitular`) VALUES
(1, 0, 'PROV', 'BANCO PROVINCIAL', '0108241200000000001', 'GABRIEL PEREZ', '16594651');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_bloqueados`
--

CREATE TABLE `user_bloqueados` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `login` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `motivo_bloqueo` text COLLATE utf8_unicode_ci NOT NULL,
  `fechahora` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_admin` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT 'login de usuario admin que bloqueo al usario cliente',
  `activo` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'indica si el bloqueo sigue activo, o ya el usuario esta desbloqueado'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='lista de usuarios bloqueados';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_comentarios`
--

CREATE TABLE `user_comentarios` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `login` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `fechahora` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'fecha y hora del comentario',
  `tipo` int(11) NOT NULL COMMENT '1:positivo, 2:negativo, 3:neutral',
  `comentario` text COLLATE utf8_unicode_ci NOT NULL,
  `observaciones` int(11) NOT NULL COMMENT 'observaciones de la app, escritos por algun administrador'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='comentarios de los usuarios, dados por operadores y usuarios admin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_reputacion`
--

CREATE TABLE `user_reputacion` (
  `id` int(11) NOT NULL,
  `id_user` int(30) NOT NULL,
  `coment_posit` int(11) DEFAULT NULL,
  `coment_neg` int(11) DEFAULT NULL,
  `veces_bloqueado` int(11) DEFAULT NULL,
  `comentarios_neutrales` int(11) DEFAULT NULL,
  `reputacion_total` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_seguridad`
--

CREATE TABLE `user_seguridad` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `nro_documento` text COLLATE utf8_unicode_ci NOT NULL,
  `doc_verificado` tinyint(1) NOT NULL,
  `login_user_admin` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `fechahora_check` int(11) NOT NULL,
  `url_img_documento` text COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'url de imagen que comprueba la documento, bien sea foto o imagen escaneada	'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='datos de seguridad de usuarios, para verificar sus documentos';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `x.formapago`
--

CREATE TABLE `x.formapago` (
  `id` int(11) NOT NULL,
  `codigo` varchar(5) NOT NULL COMMENT 'DEP, GIRO, WU, EFECT',
  `nombre` varchar(30) NOT NULL COMMENT 'deposito bancario, giro, wester union, efectivo, etc.',
  `numero` varchar(30) NOT NULL COMMENT 'nro de cuenta, nro de giro,etc.',
  `detalles` varchar(11) NOT NULL COMMENT 'detalle largo',
  `observ` text NOT NULL COMMENT 'observaciones sobre la forma de pago',
  `cod_pais` varchar(5) NOT NULL COMMENT 'codigo de pais'
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Definicion de tipos de pago de origen. Depósito, Giro, WU...';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `x.formapago_pais`
--

CREATE TABLE `x.formapago_pais` (
  `id` int(11) NOT NULL,
  `cod_pais` varchar(5) NOT NULL COMMENT 'codigo de pais',
  `cod_formapago` varchar(5) NOT NULL COMMENT 'codigo forma de pago',
  `activo` tinyint(1) NOT NULL COMMENT '0: inactivo, 1:activo'
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='x.Tipos de pago de origen por pais';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `x.tareas de tablas`
--

CREATE TABLE `x.tareas de tablas` (
  `id` int(11) NOT NULL,
  `descripcion` text COLLATE utf8_unicode_ci NOT NULL,
  `detalles` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `x.tareas de tablas`
--

INSERT INTO `x.tareas de tablas` (`id`, `descripcion`, `detalles`) VALUES
(1, 'tabla: users.\r\ncampo: email\r\ndebe ser unico', ''),
(2, 'paridad de monedas.\r\ntabla: monedas_pares', 'hay que gestionar el hecho de que una paridad de monedas puede cambiar mientras un usuario realiza una operacion.\r\nCuando el usuario inicia la transaccion, esta se realiza con la paridad del momento.\r\nAun si esta cambia en el proceso?\r\nDebe haber un timeout bajo de la app, digamos de 10 minutos.'),
(3, 'table: user\r\ncampos posibles de user', 'campos posibles de user.\r\nfecha nac\r\nprofesion/ocupacion\r\nidioma preferido\r\nuso horario preferido'),
(4, 'tabla user', 'add field ultima fecha de conexion'),
(5, 'tabla x.formapago_pais.\r\n', 'tabla no usada.\r\nborrar luego de comprobar que no se usa en el codigo'),
(6, 'tabla x.formapago\r\n', 'borrar tabla luego de comprobar que no se usa en el codigo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `x_backup_20200815_banks_pais`
--

CREATE TABLE `x_backup_20200815_banks_pais` (
  `id` int(11) NOT NULL,
  `codigo` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` text COLLATE utf8_unicode_ci NOT NULL,
  `nombre_largo` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `codpais` varchar(5) COLLATE utf8_unicode_ci NOT NULL COMMENT 'codigo del pais',
  `activo` tinyint(1) NOT NULL COMMENT 'Estatus. 1:activo, 0:inactivo'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `x_backup_20200815_banks_pais`
--

INSERT INTO `x_backup_20200815_banks_pais` (`id`, `codigo`, `nombre`, `nombre_largo`, `codpais`, `activo`) VALUES
(1, 'BDV', 'Banco de Venezuela', NULL, 'VEN', 1),
(2, 'BPROV', 'Provincial', 'Banco Provincial', 'VEN', 1),
(3, 'BANSC', 'Banesco', NULL, 'VEN', 1),
(4, 'BMERC', 'Mercantil', 'Banco Mercantil', 'VEN', 1),
(5, 'BCARI', 'Bancaribe', NULL, 'VEN', 1),
(6, 'BTES', 'Banco del Tesoro', NULL, 'VEN', 1),
(7, 'BICNT', 'Bicentenario', 'Banco Bicentenario', 'VEN', 1),
(8, 'BCAR', 'Banco Caroní', NULL, 'VEN', 0),
(9, 'BCP', 'Banco Central de Peru', NULL, 'PER', 1),
(10, 'BITAU', 'Banco Itaú', 'Banco Itaú Paraguay', 'PAR', 1),
(11, 'GP', 'Giros Personal', 'Giros Personal Paraguay', 'PAR', 1),
(12, 'GT', 'Giros Tigo', 'Giros Tigo Paraguay', 'PAR', 1),
(13, 'GC', 'Giros Claro', 'Giros Claro Paraguay', 'PAR', 1),
(14, 'CE', 'Efectivo', NULL, 'PAR', 1),
(15, 'BFAM', 'Banco Familiar', 'Banco Familiar -Paraguay', 'PAR', 1),
(16, 'BEXT', 'Banco Exterior', 'Banco Exterior -Venezuela', 'VEN', 1),
(18, 'BVIS', 'Banco Visión', 'Banco Visión -Paraguay', 'PAR', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `banks_pais`
--
ALTER TABLE `banks_pais`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_banks_codpais` (`codpais`);

--
-- Indices de la tabla `bitacora_login`
--
ALTER TABLE `bitacora_login`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `bitacora_tablas`
--
ALTER TABLE `bitacora_tablas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `btc_paridad`
--
ALTER TABLE `btc_paridad`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cod` (`cod_moneda`);

--
-- Indices de la tabla `casos_atenciones`
--
ALTER TABLE `casos_atenciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `casos_reclamos`
--
ALTER TABLE `casos_reclamos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD UNIQUE KEY `unicopar_ciudad_y_pais` (`nombre`,`cod_pais`);

--
-- Indices de la tabla `formapago_origen`
--
ALTER TABLE `formapago_origen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_banks_codpais` (`codpais`),
  ADD KEY `cod_banco` (`cod_banco`),
  ADD KEY `activo` (`activo`);

--
-- Indices de la tabla `huso_horario`
--
ALTER TABLE `huso_horario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `moneda`
--
ALTER TABLE `moneda`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cod` (`codigo`);

--
-- Indices de la tabla `monedas_pares`
--
ALTER TABLE `monedas_pares`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cod` (`cod_moneda`);

--
-- Indices de la tabla `monedas_paridad_tentativo`
--
ALTER TABLE `monedas_paridad_tentativo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cod` (`cod_moneda`);

--
-- Indices de la tabla `pago_destino`
--
ALTER TABLE `pago_destino`
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_transaccion` (`id_transaccion`);

--
-- Indices de la tabla `pago_origen`
--
ALTER TABLE `pago_origen`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `prueba`
--
ALTER TABLE `prueba`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `t1`
--
ALTER TABLE `t1`
  ADD PRIMARY KEY (`ts`);

--
-- Indices de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `transacciones_btc`
--
ALTER TABLE `transacciones_btc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_transaccion` (`id_transaccion`) USING BTREE COMMENT 'relacion con id de tabla transacciones';

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `cod_ciudad` (`cod_ciudad`),
  ADD KEY `cod_pais` (`cod_pais`),
  ADD KEY `telefono` (`telefono`),
  ADD KEY `cod_pais_2` (`cod_pais`),
  ADD KEY `cod_ciudad_2` (`cod_ciudad`);

--
-- Indices de la tabla `user_bank`
--
ALTER TABLE `user_bank`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_comentarios`
--
ALTER TABLE `user_comentarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `x.formapago`
--
ALTER TABLE `x.formapago`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `x.formapago_pais`
--
ALTER TABLE `x.formapago_pais`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `x.tareas de tablas`
--
ALTER TABLE `x.tareas de tablas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `x_backup_20200815_banks_pais`
--
ALTER TABLE `x_backup_20200815_banks_pais`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_banks_codpais` (`codpais`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `banks_pais`
--
ALTER TABLE `banks_pais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `bitacora_login`
--
ALTER TABLE `bitacora_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `bitacora_tablas`
--
ALTER TABLE `bitacora_tablas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `btc_paridad`
--
ALTER TABLE `btc_paridad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `casos_atenciones`
--
ALTER TABLE `casos_atenciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `casos_reclamos`
--
ALTER TABLE `casos_reclamos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `formapago_origen`
--
ALTER TABLE `formapago_origen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `huso_horario`
--
ALTER TABLE `huso_horario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `moneda`
--
ALTER TABLE `moneda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `monedas_pares`
--
ALTER TABLE `monedas_pares`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `monedas_paridad_tentativo`
--
ALTER TABLE `monedas_paridad_tentativo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `pago_destino`
--
ALTER TABLE `pago_destino`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pago_origen`
--
ALTER TABLE `pago_origen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pais`
--
ALTER TABLE `pais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `prueba`
--
ALTER TABLE `prueba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `transacciones_btc`
--
ALTER TABLE `transacciones_btc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT de la tabla `user_bank`
--
ALTER TABLE `user_bank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `user_comentarios`
--
ALTER TABLE `user_comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `x.formapago`
--
ALTER TABLE `x.formapago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `x.formapago_pais`
--
ALTER TABLE `x.formapago_pais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `x.tareas de tablas`
--
ALTER TABLE `x.tareas de tablas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `x_backup_20200815_banks_pais`
--
ALTER TABLE `x_backup_20200815_banks_pais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
