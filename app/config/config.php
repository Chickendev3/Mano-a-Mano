<?php
/* --------------------- Definición de CONSTANTES --------------------- */

/* Credenciales de BD */
define('BD_HOST','localhost');
define('BD_USUARIO', 'root');
define('BD_CLAVE', '');
define('BD_NOMBRE', 'mano_a_mano_bd');
define('BD_PUERTO', '3306');
// Dynamic BASE_URL definition to match exact domain/folder case and prevent session cookie path mismatches
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$script = $_SERVER['SCRIPT_NAME'] ?? '/Mano-a-Mano/public/index.php';
$dir = dirname($script);
$dir = rtrim(str_replace('\\', '/', $dir), '/') . '/';
define('BASE_URL', $protocol . $host . $dir);

?>