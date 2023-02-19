// Variáveis de captura
const nome = document.querySelector('#nome');
const elemento = document.querySelector('#elemento');
const btn = document.getElementById('enviar');
// Variável dados: captura os dados presentes no localstorage e converte para JSON caso existam. Se não, cria um array vazio.
const dados = JSON.parse(localStorage.getItem("itens")) || []

btn.addEventListener('click', salvarItens)
function salvarItens(){

    // Cria um objeto para salvar as informações enviadas no input
    item = {
        "nome": nome.value,
        "elemento": elemento.value,
        "ataque": ataque.value,
        "defesa": defesa.value,
        "id": dados.length
    }

    if(nome.value === "" || ataque.value === "" || defesa.value === ""){
        alert("Preencha todos os campos antes de enviar!")
    }
    else{
        // Envia as informações pro array
        dados.push(item)
        // Salva as informações no array
        localStorage.setItem('itens', JSON.stringify(dados))
        alert("Um item foi cadastrado!")
        // Reseta os campos de entrada
        nome.value = "";
        ataque.value = "";
        defesa.value = "";
    }

}

const btnVisualizar = document.querySelector("#visualizar")
btnVisualizar.addEventListener("click", exibirItens)
let contador = 1;
function exibirItens(){
        // Acessa o corpo da tabela
        const tabela = document.querySelector('.tabela-corpo');
        // Caso contador seja par
        if(contador % 2 === 0){
            dados.forEach( (pokemon) =>{
            // Insere as informações do array na tabela
            tabela.innerHTML += `<tr class="pokemon-${pokemon.id}">
            <td>${pokemon.nome}</td>
            <td>${pokemon.elemento}</td>
            <td>${pokemon.ataque}</td>
            <td>${pokemon.defesa}</td>
            <td><button class="btn btn-danger" onclick="removerItens(${pokemon.id})">X</button></td>
            </tr>`
            btnVisualizar.innerText = "Fechar Dados"
            })
        }
        else{ // Caso Seja impar
            tabela.innerHTML = ""; // Fecha a tabela
            btnVisualizar.innerText = "Visualizar Dados" // Muda o texto do botao
        }
        contador++;
    
}
exibirItens();

function removerItens(valor){
    // Captura o elemento clicado baseado em seu id
    const elemento = document.querySelector(`.pokemon-${valor}`)
    // Remove o elemento da tela
    elemento.remove();
    // Remove o elemento no array
    dados.splice(valor, 1)

    // Cria uma estrutura que passa por todos itens do array
    dados.forEach((item) =>{ 
        if(item.id >= valor){ // caso o id do item seja maior que o parâmetro valor, diminui um
            item.id = item.id - 1;
        }   
    })
    // Atualiza o localStorage
    localStorage.setItem('itens', JSON.stringify(dados))
}

const btnAtualizar = document.getElementById("atualizar");
btnAtualizar.addEventListener('click', atualizarItens)
function atualizarItens(){
    // Cria um objeto com os elementos atualizados
    pokemon = {
        "nome": nome.value,
        "elemento": elemento.value,
        "ataque": ataque.value,
        "defesa": defesa.value,
        "id": dados.length
    }
    // Percorre o array de itens salvos
    dados.forEach((item) =>{ 
        // Caso o nome inserido exista no array, ou seja:
        if(pokemon.nome === item.nome){
            // Remove o item antigo pelo indice
           dados.splice(item.id, 1)
           // Adiciona o novo item atualizado
           dados.splice(item.id, 0, pokemon)
           // Atualiza o LocalStorage
           localStorage.setItem('itens', JSON.stringify(dados))
           alert("O item foi atualizado!")
        }
    })
}