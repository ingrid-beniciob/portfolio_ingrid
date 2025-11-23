<?php
$servidor = "127.0.0.1";
$usuario = "root";
$senha = "";
$banco = "formulario";

$conn = new mysqli($servidor, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

// Definir charset para evitar erro com acentos
$conn->set_charset("utf8mb4");
?>
