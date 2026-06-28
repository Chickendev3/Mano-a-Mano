-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-06-2026 a las 21:26:05
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

--
-- Volcado de datos para la tabla `archivos`
--

INSERT INTO `archivos` (`id`, `campania_id`, `referencia`, `tipo`) VALUES
(1, 1, 'img/campaign_park.png', 'imagen'),
(2, 2, 'archivos/camp_6a4129666bba36.67559744.webp', 'imagen'),
(3, 6, 'archivos/camp_6a4161d60df020.05748233.webp', 'imagen');

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

--
-- Volcado de datos para la tabla `campanias`
--

INSERT INTO `campanias` (`id`, `usuario_id`, `tipo_id`, `titulo`, `descripcion`, `fecha_creacion`, `fecha_finalizacion`, `info_adicional`, `ubicacion`, `fecha_inicio`) VALUES
(1, 6, 2, 'Reforestación del Parque Urquiza', 'Buscamos voluntarios de todas las edades para plantar árboles nativos y ayudar a recuperar el pulmón verde de la costa.', '2026-06-26 12:03:54', '2026-07-15', 'Punto de encuentro: Entrada principal del parque. Traer ropa cómoda, pala de mano (opcional) y botella de agua.', 'Rosario, Santa Fe', '2026-07-01'),
(2, 6, 1, 'Colecta de Donaciones', 'Acercá alimento no perecedero, las ropa o juguetes que no uses, limpios y en buen estado a nuestros centros de recolección. \r\n\r\nNosotros los distribuiremos. ', '2026-06-26 12:14:33', '2026-07-10', '', 'Buenos Aires, Moron, Haedo', '2026-06-27'),
(4, 6, 2, 'Ayuda Humanitaria', 'Ayudanos a llevar ayuda humanitaria a Venezuela.', '2026-06-26 12:33:30', '2026-07-05', 'Nos reuniremos en el edificio tal, a la altura 1234, a las 15hs del miércoles.', 'Buenos Aires, Moron, Haedo', '2026-06-29'),
(5, 12, 1, 'Colecta de Alimentos No Perecederos', 'Acercate a nuestros puntos de encuentro para llevar alimentos no perecederos a los merenderos y centros más necesitados.', '2026-06-26 14:56:45', '2026-07-05', '', 'CABA, Caballito', '2026-06-29'),
(6, 13, 2, 'Necesitamos Voluntarios para Colecta de Alimentos', 'Necesitamos voluntarios que nos ayuden a organizar y empaquetar los alimentos que nos llegan.  ', '2026-06-28 18:03:02', '2026-06-29', 'Nos reuniremos en la Av. Libertador al 1200. A las 15hs.', 'Buenos Aires, Bahía Blanca', '2026-06-28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campanias_causas`
--

CREATE TABLE `campanias_causas` (
  `campania_id` int(11) NOT NULL,
  `causa_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `campanias_causas`
--

INSERT INTO `campanias_causas` (`campania_id`, `causa_id`) VALUES
(1, 9),
(1, 11),
(2, 4),
(2, 5),
(2, 8),
(4, 15),
(5, 4),
(5, 5),
(6, 4),
(6, 5);

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

--
-- Volcado de datos para la tabla `correos`
--

INSERT INTO `correos` (`id`, `nombre`, `email`, `apellido`, `asunto`, `cuerpo`, `fecha_envio`) VALUES
(1, 'Roma', 'romaramirez@gmail.com', 'Ramirez', 'Prueba de Correo', 'Esta es la primera prueba de envío de correos :)', '2026-06-14 02:56:27'),
(2, 'Roma', 'romaramirez@gmail.com', 'Ramirez', 'Prueba de Correo 2', 'Esta es la segunda prueba de envío de correoossss', '2026-06-14 03:02:19'),
(3, 'Roma', 'romaramirez@gmail.com', 'Ramirez', 'Prueba de Correo 3', 'Esta es le tercera prueba de correo :)', '2026-06-14 03:08:12'),
(4, 'Roma', 'romaramirez@gmail.com', 'Ramirez', 'Prueba de Correo 4', 'Cuarta prueba de correo :))', '2026-06-14 03:15:11'),
(5, 'Pilar', 'pilaralvarez080@gmail.com', 'Alvarez', 'Prueba de Correo 5', 'Quinta prueba de correo. ¿Será la última por hoy?', '2026-06-14 03:20:01'),
(6, 'Pilar', 'pilar@manoamano.com', 'Alvarez', 'Prueba de Correo 6', 'Esta es la sexta prueba de correo.. \r\n.\r\n.\r\n.\r\n.. ¿ahora si? ¿Será?', '2026-06-14 03:24:44'),
(7, 'Pilar', 'pilar@manoamano.com', 'Alvarez', 'Prueba de Correo 12', 'Prueba de correo 12..', '2026-06-17 22:10:43'),
(8, 'Pilar', 'pilar@manoamano.com', 'Alvarez', 'Prueba de Correo 13', 'prueba 13 para ver el mensaje..', '2026-06-17 22:15:21'),
(9, 'Pilar', 'pilar@manoamano.com', 'Alvarez', 'Prueba de Correo 13', 'Prueba 13? ', '2026-06-17 22:19:47'),
(10, 'Pilar', 'pilar@manoamano.com', 'Alvarez', 'Prueba de Correo 15', 'Prueba 15 para ver el mensajito temporal.', '2026-06-17 22:22:47');

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
(2, 11),
(3, 13),
(4, 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `organizaciones_causas`
--

CREATE TABLE `organizaciones_causas` (
  `organizacion_id` int(11) NOT NULL,
  `causa_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `organizaciones_causas`
--

INSERT INTO `organizaciones_causas` (`organizacion_id`, `causa_id`) VALUES
(1, 5),
(1, 8),
(1, 10),
(1, 11),
(2, 6),
(3, 5),
(4, 9);

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
(6, 'Pilar', 'pilar@manoamano.com', '$2y$10$YZ4Q5RgkgYsmK5y.IUlqk.H7fdfDDPizIywwPKX1J2nhrZqBHB4h.', 'Estudiante de Programación', '11-6666-9999', 'Buenos Aires, Moron, Haedo', 'archivos/avatar_6a4071a78a7fe8.13374548.webp'),
(10, 'Sonrisas', 'sonrisas@org.com', '$2y$10$FDFcqeLxPoORrteLDq8rz.Nq56DxdDoys3QHThYww7.F237WDIGAO', 'Somos una ONG sin fines de lucro que promueve los derechos de los niños y niñas; en especial el derecho a jugar y a la educación. Sin inclinaciones políticas o religiosas, nuestro compromiso ante la sociedad es devolver a los niños y niñas con derechos vulnerados la posibilidad de volver a sonreír y aprender jugando.', '11-0000-8888', 'Buenos Aires, Moron, Castelar', 'archivos/avatar_6a4154afec5392.98342941.webp'),
(11, '4Patas', '4patas@org.com', '$2y$10$kn2AS4fQCHfWizkp8flK3.AZI9bNeKYiBaEfqsTnxxOoKBBneunvK', 'Proyecto 4 Patas (P4P) es una organización sin fines de lucro abocada a difundir, proteger y promover los derechos de los animales.\r\n\r\nPropiciamos una actitud de respeto hacia todas las especies tomando como eje la premisa ética de que son seres sintientes y no “cosas” para ser utilizadas por el ser humano. Rechazamos todo tipo de explotación animal incluyendo su uso como vestimenta, comida, entretenimiento y experimentación.', '11-2222-5555', 'Buenos Aires, Merlo, Padua', 'archivos/avatar_6a41571a8b1393.51151272.webp'),
(12, 'Roma', 'romagutierrez@gmail.com', '$2y$10$Fe6m22o9tlbWq7Xmtae4v.L7Rexj3O29r8XSqKwYJ7XMGWesbe4yu', 'Profesora de Educación Física.', '011-8888-0000', NULL, 'archivos/avatar_6a4072172918c6.66545761.jpg'),
(13, 'Banco de Alimentos', 'bancodealimentos@org.ar', '$2y$10$PovgSJOvFLxxK9KUbMrkKeqqz4ulBqB3QM.n8YKdpTAcbbP9X.F4q', 'Trabajamos para reducir el hambre, mejorar la nutrición y evitar el desperdicio de alimentos. Recibimos grandes donaciones de alimentos y productos y los distribuimos entre comedores y otras organizaciones sociales que dan de comer a personas que lo necesitan.', '011-1515-1515', 'Puente Alto 2200', 'archivos/avatar_6a415781d7de11.38745139.webp'),
(14, 'Ambiente & Medio', 'ambienteymedio@org.ar', '$2y$10$snXYtG9CGwn2eTbXizHbveAWFt2RgGVOtR1ZTpuSjbcpEga5aolrC', 'En Fundación Ambiente y Medio, nos proponemos despertar a la sociedad hacia la ciudadanía ambiental. Ponemos el foco en el que identificamos como el principal problema ambiental del país: la basura, que está a la vista de todos con más de 5000 basurales a cielo abierto que deben erradicarse.\r\n\r\nGanador del premio Martín Fierro 2017, 2018, 2021 y 2023 como mejor programa cultural/educativo.', '011-4848-4848', 'Primavera 1144', 'archivos/avatar_6a415651ca4989.45581786.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voluntarios`
--

CREATE TABLE `voluntarios` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono_emergencia` varchar(15) DEFAULT NULL,
  `disponibilidad_horaria` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `voluntarios`
--

INSERT INTO `voluntarios` (`id`, `usuario_id`, `apellido`, `telefono_emergencia`, `disponibilidad_horaria`) VALUES
(1, 6, 'Alvarez', NULL, NULL),
(2, 12, 'Gutierrez', NULL, NULL);

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
-- Volcado de datos para la tabla `voluntarios_oficios`
--

INSERT INTO `voluntarios_oficios` (`voluntario_id`, `oficio_id`) VALUES
(1, 15),
(2, 3),
(2, 8),
(2, 12);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `campanias`
--
ALTER TABLE `campanias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `voluntarios`
--
ALTER TABLE `voluntarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
