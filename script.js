async function buscarCep() {
    const cep = document.getElementById('cepInput').value;
    const resultadoDiv = document.getElementById('resultado');

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await response.json();

        if (dados.erro) {
            limparCampos();
            alert("CEP não encontrado!");
            return;
        }
        document.getElementById('rua').innerText = dados.logradouro;
        document.getElementById('bairro').innerText = dados.bairro;
        document.getElementById('cidade').innerText = dados.localidade;
        document.getElementById('uf').innerText = dados.uf;

    } catch (error) {
        limparCampos();
        alert("Erro ao buscar o CEP. Verifique se o formato está correto.");
        console.error("Detalhes do erro:", error);
    }
}
function limparCampos() {
    document.getElementById('rua').innerText = "...";
    document.getElementById('bairro').innerText = "...";
    document.getElementById('cidade').innerText = "...";
    document.getElementById('uf').innerText = "...";
}

const campoCep = document.getElementById('cepInput');

campoCep.addEventListener('keypress', function (evento) {

    if (evento.key === 'Enter') {
        buscarCep(); 
    }
    const apenasNumeros = /[0-9]/;

    const tecla = String.fromCharCode(evento.keyCode);

    if (!apenasNumeros.test(tecla)) {
        evento.preventDefault();
        return;
    }
});
