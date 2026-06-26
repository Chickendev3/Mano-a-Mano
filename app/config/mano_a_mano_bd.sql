-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-06-2026 a las 01:59:51
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
-- Base de datos: `mano_a_mano_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivos`
--

CREATE TABLE `archivos` (
  `id` int(11) NOT NULL,
  `campania_id` int(11) NOT NULL,
  `referencia` varchar(200) NOT NULL,
  `tipo` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencias`
--

CREATE TABLE `asistencias` (
  `voluntario_id` int(11) NOT NULL,
  `campania_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campanias`
--

CREATE TABLE `campanias` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `tipo_id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_finalizacion` date NOT NULL,
  `info_adicional` text DEFAULT NULL,
  `ubicacion` varchar(60) NOT NULL,
  `fecha_inicio` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campanias_causas`
--

CREATE TABLE `campanias_causas` (
  `campania_id` int(11) NOT NULL,
  `causa_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `causas`
--

CREATE TABLE `causas` (
  `id` int(11) NOT NULL,
  `causa` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `causas`
--

INSERT INTO `causas` (`id`, `causa`) VALUES
(4, 'Donaciones'),
(5, 'Asistencia Alimentaria'),
(6, 'Bienestar Animal'),
(7, 'Adultos Mayores'),
(8, 'Niñez'),
(9, 'Medio Ambiente'),
(10, 'Educación y Desarrollo'),
(11, 'Salud y Bienestar'),
(12, 'Discapacidad'),
(13, 'Vivienda'),
(14, 'Género y Diversidad'),
(15, 'Emergencias y Desastres'),
(16, 'Arte y Cultura'),
(17, 'Deporte e Inclusión');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos_asistencia`
--

CREATE TABLE `codigos_asistencia` (
  `id` int(11) NOT NULL,
  `campania_id` int(11) NOT NULL,
  `codigo` varchar(10) NOT NULL,
  `fecha_vencimiento` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `correos`
--

CREATE TABLE `correos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `asunto` varchar(100) NOT NULL,
  `cuerpo` text NOT NULL,
  `fecha_envio` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `id` int(11) NOT NULL,
  `estado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`id`, `estado`) VALUES
(1, 'Aceptado'),
(2, 'Rechazado'),
(3, 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invitaciones`
--

CREATE TABLE `invitaciones` (
  `id` int(11) NOT NULL,
  `campania_id` int(11) NOT NULL,
  `emisor_id` int(11) NOT NULL,
  `destinatario_id` int(11) NOT NULL,
  `estado_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oficios`
--

CREATE TABLE `oficios` (
  `id` int(11) NOT NULL,
  `oficio` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `oficios`
--

INSERT INTO `oficios` (`id`, `oficio`) VALUES
(1, 'Cocina'),
(2, 'Psicología'),
(3, 'Docencia'),
(4, 'Medicina'),
(5, 'Enfermería'),
(6, 'Construcción'),
(7, 'Logística'),
(8, 'Comunicación'),
(9, 'Diseño'),
(10, 'Fotografía'),
(11, 'Música'),
(12, 'Deportes'),
(13, 'Veterinaria'),
(14, 'Ambiente'),
(15, 'Tecnología');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `organizaciones`
--

CREATE TABLE `organizaciones` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `organizaciones`
--

INSERT INTO `organizaciones` (`id`, `usuario_id`) VALUES
(1, 10),
(2, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `organizaciones_causas`
--

CREATE TABLE `organizaciones_causas` (
  `organizacion_id` int(11) NOT NULL,
  `causa_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulaciones`
--

CREATE TABLE `postulaciones` (
  `id` int(11) NOT NULL,
  `voluntario_id` int(11) NOT NULL,
  `campania_id` int(11) NOT NULL,
  `estado_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_campanias`
--

CREATE TABLE `tipos_campanias` (
  `id` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_campanias`
--

INSERT INTO `tipos_campanias` (`id`, `tipo`) VALUES
(1, 'Informativa'),
(2, 'Convocatoria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `telefono` varchar(15) NOT NULL,
  `ubicacion` varchar(60) DEFAULT NULL,
  `img_perfil` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `clave`, `descripcion`, `telefono`, `ubicacion`, `img_perfil`) VALUES
(6, 'Pilar', 'pilar@manoamano.com', '$2y$10$YZ4Q5RgkgYsmK5y.IUlqk.H7fdfDDPizIywwPKX1J2nhrZqBHB4h.', NULL, '11-6666-9999', 'Buenos Aires, Moron, Castelar', NULL),
(10, 'Sonrisas', 'sonrisas@org.com', '$2y$10$FDFcqeLxPoORrteLDq8rz.Nq56DxdDoys3QHThYww7.F237WDIGAO', NULL, '11-0000-8888', 'Buenos Aires, Moron, Castelar', NULL),
(11, '4Patas', '4patas@org.com', '$2y$10$kn2AS4fQCHfWizkp8flK3.AZI9bNeKYiBaEfqsTnxxOoKBBneunvK', NULL, '11-2222-5555', 'Buenos Aires, Merlo, Padua', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voluntarios`
--

CREATE TABLE `voluntarios` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono_emergencia` varchar(15) DEFAULT NULL,
  `disponibilidad_horaria` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `voluntarios`
--

INSERT INTO `voluntarios` (`id`, `usuario_id`, `apellido`, `telefono_emergencia`, `disponibilidad_horaria`) VALUES
(1, 6, 'Alvarez', '0', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voluntarios_fijos`
--

CREATE TABLE `voluntarios_fijos` (
  `voluntario_id` int(11) NOT NULL,
  `organizacion_id` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voluntarios_oficios`
--

CREATE TABLE `voluntarios_oficios` (
  `voluntario_id` int(11) NOT NULL,
  `oficio_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivos`
--
ALTER TABLE `archivos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campania_id` (`campania_id`);

--
-- Indices de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD PRIMARY KEY (`voluntario_id`,`campania_id`),
  ADD KEY `campania_id` (`campania_id`);

--
-- Indices de la tabla `campanias`
--
ALTER TABLE `campanias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `tipo_id` (`tipo_id`);

--
-- Indices de la tabla `campanias_causas`
--
ALTER TABLE `campanias_causas`
  ADD PRIMARY KEY (`campania_id`,`causa_id`),
  ADD KEY `causa_id` (`causa_id`);

--
-- Indices de la tabla `causas`
--
ALTER TABLE `causas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `codigos_asistencia`
--
ALTER TABLE `codigos_asistencia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campania_id` (`campania_id`);

--
-- Indices de la tabla `correos`
--
ALTER TABLE `correos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `invitaciones`
--
ALTER TABLE `invitaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campania_id` (`campania_id`),
  ADD KEY `emisor_id` (`emisor_id`),
  ADD KEY `destinatario_id` (`destinatario_id`),
  ADD KEY `estado_id` (`estado_id`);

--
-- Indices de la tabla `oficios`
--
ALTER TABLE `oficios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `organizaciones`
--
ALTER TABLE `organizaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `organizaciones_causas`
--
ALTER TABLE `organizaciones_causas`
  ADD PRIMARY KEY (`organizacion_id`,`causa_id`),
  ADD KEY `causa_id` (`causa_id`);

--
-- Indices de la tabla `postulaciones`
--
ALTER TABLE `postulaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `voluntario_id` (`voluntario_id`),
  ADD KEY `campania_id` (`campania_id`),
  ADD KEY `estado_id` (`estado_id`);

--
-- Indices de la tabla `tipos_campanias`
--
ALTER TABLE `tipos_campanias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `voluntarios`
--
ALTER TABLE `voluntarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `voluntarios_fijos`
--
ALTER TABLE `voluntarios_fijos`
  ADD PRIMARY KEY (`voluntario_id`,`organizacion_id`),
  ADD KEY `organizacion_id` (`organizacion_id`);

--
-- Indices de la tabla `voluntarios_oficios`
--
ALTER TABLE `voluntarios_oficios`
  ADD PRIMARY KEY (`voluntario_id`,`oficio_id`),
  ADD KEY `oficio_id` (`oficio_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivos`
--
ALTER TABLE `archivos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `campanias`
--
ALTER TABLE `campanias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `causas`
--
ALTER TABLE `causas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `codigos_asistencia`
--
ALTER TABLE `codigos_asistencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `correos`
--
ALTER TABLE `correos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `invitaciones`
--
ALTER TABLE `invitaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `oficios`
--
ALTER TABLE `oficios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `organizaciones`
--
ALTER TABLE `organizaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `postulaciones`
--
ALTER TABLE `postulaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipos_campanias`
--
ALTER TABLE `tipos_campanias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `voluntarios`
--
ALTER TABLE `voluntarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `archivos`
--
ALTER TABLE `archivos`
  ADD CONSTRAINT `archivos_ibfk_1` FOREIGN KEY (`campania_id`) REFERENCES `campanias` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD CONSTRAINT `asistencias_ibfk_1` FOREIGN KEY (`voluntario_id`) REFERENCES `voluntarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `asistencias_ibfk_2` FOREIGN KEY (`campania_id`) REFERENCES `campanias` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `campanias`
--
ALTER TABLE `campanias`
  ADD CONSTRAINT `campanias_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `campanias_ibfk_2` FOREIGN KEY (`tipo_id`) REFERENCES `tipos_campanias` (`id`);

--
-- Filtros para la tabla `campanias_causas`
--
ALTER TABLE `campanias_causas`
  ADD CONSTRAINT `campanias_causas_ibfk_1` FOREIGN KEY (`campania_id`) REFERENCES `campanias` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `campanias_causas_ibfk_2` FOREIGN KEY (`causa_id`) REFERENCES `causas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `codigos_asistencia`
--
ALTER TABLE `codigos_asistencia`
  ADD CONSTRAINT `codigos_asistencia_ibfk_1` FOREIGN KEY (`campania_id`) REFERENCES `campanias` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `invitaciones`
--
ALTER TABLE `invitaciones`
  ADD CONSTRAINT `invitaciones_ibfk_1` FOREIGN KEY (`campania_id`) REFERENCES `campanias` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `invitaciones_ibfk_2` FOREIGN KEY (`emisor_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `invitaciones_ibfk_3` FOREIGN KEY (`destinatario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `invitaciones_ibfk_4` FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`);

--
-- Filtros para la tabla `organizaciones`
--
ALTER TABLE `organizaciones`
  ADD CONSTRAINT `organizaciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `organizaciones_causas`
--
ALTER TABLE `organizaciones_causas`
  ADD CONSTRAINT `organizaciones_causas_ibfk_2` FOREIGN KEY (`causa_id`) REFERENCES `causas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `organizaciones_causas_ibfk_3` FOREIGN KEY (`organizacion_id`) REFERENCES `organizaciones` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `postulaciones`
--
ALTER TABLE `postulaciones`
  ADD CONSTRAINT `postulaciones_ibfk_1` FOREIGN KEY (`voluntario_id`) REFERENCES `voluntarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `postulaciones_ibfk_2` FOREIGN KEY (`campania_id`) REFERENCES `campanias` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `postulaciones_ibfk_3` FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`);

--
-- Filtros para la tabla `voluntarios`
--
ALTER TABLE `voluntarios`
  ADD CONSTRAINT `voluntarios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `voluntarios_fijos`
--
ALTER TABLE `voluntarios_fijos`
  ADD CONSTRAINT `voluntarios_fijos_ibfk_1` FOREIGN KEY (`voluntario_id`) REFERENCES `voluntarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `voluntarios_fijos_ibfk_2` FOREIGN KEY (`organizacion_id`) REFERENCES `organizaciones` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `voluntarios_oficios`
--
ALTER TABLE `voluntarios_oficios`
  ADD CONSTRAINT `voluntarios_oficios_ibfk_1` FOREIGN KEY (`voluntario_id`) REFERENCES `voluntarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `voluntarios_oficios_ibfk_2` FOREIGN KEY (`oficio_id`) REFERENCES `oficios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
