async function buscarCep() {
    // 1. Pegar o valor que o usuário digitou
    const cep = document.getElementById('cepInput').value;
    const resultadoDiv = document.getElementById('resultado');

    // 2. Tentar buscar os dados (try/catch)
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await response.json();

        // 3. Verificar se o CEP existe (a ViaCEP retorna "erro: true" se não achar)
        if (dados.erro) {
            limparCampos();
            alert("CEP não encontrado!");
            return;
        }

        // 4. Exibir os dados no HTML
        document.getElementById('rua').innerText = dados.logradouro;
        document.getElementById('bairro').innerText = dados.bairro;
        document.getElementById('cidade').innerText = dados.localidade;
        document.getElementById('uf').innerText = dados.uf;

    } catch (error) {
        // Trata erros de conexão ou digitação errada (ex: letras no lugar de números)
        limparCampos();
        alert("Erro ao buscar o CEP. Verifique se o formato está correto.");
        console.error("Detalhes do erro:", error);
    }
}

// Função para limpar os campos quando der erro
function limparCampos() {
    document.getElementById('rua').innerText = "...";
    document.getElementById('bairro').innerText = "...";
    document.getElementById('cidade').innerText = "...";
    document.getElementById('uf').innerText = "...";
}

const campoCep = document.getElementById('cepInput');

// Este evento roda TODA VEZ que você pressiona uma tecla
campoCep.addEventListener('keypress', function (evento) {

    if (evento.key === 'Enter') {
        buscarCep(); 
    }
    
    // 1. Criamos uma "regra" (Expressão Regular) que só aceita números
    const apenasNumeros = /[0-9]/;

    // 2. Transformamos a tecla apertada em texto
    const tecla = String.fromCharCode(evento.keyCode);

    // 3. Se a tecla NÃO for um número, a gente cancela o evento
    if (!apenasNumeros.test(tecla)) {
        evento.preventDefault(); // Isso "trava" a digitação da letra
        return;
    }
});