<?php
include 'conexao.php';
header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');


if (!isset($_POST['nome'])) {
    echo json_encode(["status" => "error", "message" => "Formulário não enviado."]);
    exit();
}

$nome = $_POST['nome'];
$sobrenome = $_POST['sobrenome'];
$email = $_POST['email'];
$mensagem = $_POST['mensagem'];

$sql = "INSERT INTO contato (nome, sobrenome, email, mensagem) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nome, $sobrenome, $email, $mensagem);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Mensagem enviada com sucesso!"]);
    exit();
} else {
    echo json_encode(["status" => "error", "message" => "Erro ao enviar: " . $stmt->error]);
    exit();
}

$stmt->close();
$conn->close();
?>
