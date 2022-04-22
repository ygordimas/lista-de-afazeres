const toDoTarefaInput = document.getElementById('inputTarefaTexto');
const toDoButton = document.querySelector('.botaoAdicionar');
const toDoLista = document.querySelector('.toDoLista');
const linha = document.querySelector('.linha');
let arrayStorage = JSON.parse(localStorage.getItem('arrayStorage')) || [];
let toDoTarefa = toDoTarefaInput.value;
let listaDeElementos = arrayStorage || [];


/*recuperar array do local storage, mostrar lista ordenada do local storage*/
displayLocalStorage();

/*quando adicionar item com botao, adicionar ao local storage, reorganizar o local storage, reconstruir o display com local storage */
toDoButton.addEventListener('click', atualizaArrayDeElementos);
// toDoButton.addEventListener('click', displayLocalStorage);

/*COLETA INPUT DE TAREFA*/
toDoTarefaInput.addEventListener('input', function valorInput() {
    toDoTarefa = this.value;
})
/*FIM DE COLETA DE INPUT DE TAREFA*/

/*ACIONA BOTÃO ADICIONAR COM ENTER*/
toDoTarefaInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        atualizaArrayDeElementos()
        displayLocalStorage()
    }
})
/*ACIONA BOTÃO ADICIONAR COM ENTER*/

/*RECUPERA ARRAY DO LOCAL STORAGE E MOSTRA LISTA ORDENADA*/
function displayLocalStorage() {

    toDoTarefaInput.value = "";
    toDoLista.innerHTML = "";
    arrayStorage.forEach((elemento) => {criaElementoDeLista(elemento)});

    /*CRIA BOTÃO DE LIMPAR LISTA*/
    if (listaDeElementos.length > 0) {
        criaBotaoLimpaLista()
    }


}
/*FIM DE RECUPERA ARRAY DO LOCAL STORAGE E MOSTRA LISTA ORDENADA*/

function atualizaArrayDeElementos() {
    
    const objeto = {
        'hora': timePicker.dataset.time,
        'tarefa': toDoTarefa,
    }

    if (objeto.tarefa == "") {
        toDoTarefaInput.classList.add('inputTarefaTexto-erro');
        return;

    } else {
        toDoTarefaInput.classList.remove('inputTarefaTexto-erro');
    }

    listaDeElementos.push(objeto);

    listaDeElementos = listaDeElementos.sort(function(a, b) {
        let horaA = a.hora.replace(":", "");
        let horaB = b.hora.replace(":", "");
        if (horaA < horaB) return -1;
        if (horaA > horaB) return 1;
        
        return 0;
        
    });
    
    localStorage.setItem('arrayStorage', JSON.stringify(listaDeElementos));

    displayLocalStorage()
    toDoTarefa = "";
    // return listaDeElementos;
}

function criaElementoDeLista(elemento) {
    
    const elementoLista = document.createElement('div'); 
    elementoLista.classList.add('toDoElemento')

    criaBotaoLixeira(elementoLista)
    /*HORÁRIO*/
    const toDoHora = elemento.hora;
    const horario = document.createElement('span');
    horario.textContent = toDoHora;
    horario.classList.add('toDoHora')
    elementoLista.appendChild(horario)

    /*TAREFA*/
    const tarefa = document.createElement('span');
    tarefa.textContent = elemento.tarefa;
    tarefa.classList.add('toDoTarefa')
    elementoLista.appendChild(tarefa)
    
    toDoLista.appendChild(elementoLista)
}

/*CHECKBOX*/
function criaBotaoLixeira(elemento) {
    
    // const checkArea = document.createElement('div');
    // const checkbox = document.createElement('input');
    // checkbox.setAttribute('type', 'checkbox');
    // checkArea.classList.add('toDoCheck');
    // checkArea.appendChild(checkbox);
    // elemento.appendChild(checkArea);
    const botaoLixeiraArea = document.createElement('div');
    botaoLixeiraArea.classList.add('botaoLixeiraArea');
    botaoLixeiraArea.innerHTML = `<i class="ph-trash"></i>`;
    
    botaoLixeiraArea.addEventListener('click', botaoLixeira);
    elemento.appendChild(botaoLixeiraArea);
    
}

function criaBotaoLimpaLista() {
    const botaoLimpa = document.createElement('button');
    botaoLimpa.classList.add('botaoLimpaLista');
    botaoLimpa.textContent = 'Limpar lista';

    botaoLimpa.addEventListener('click', limparLista);

    toDoLista.appendChild(botaoLimpa);
    linha.style.visibility = 'visible';
}

function limparLista() {
    listaDeElementos = [];
    toDoLista.innerHTML = "";
    localStorage.setItem('arrayStorage', JSON.stringify(listaDeElementos));
    arrayStorage = listaDeElementos;
    linha.style.visibility = 'hidden';
    
}

function botaoLixeira() {
    
    const elementoHora = this.parentNode.querySelector('.toDoHora').textContent;
    const elementoTarefa = this.parentNode.querySelector('.toDoTarefa').textContent;
    
    const found = listaDeElementos.findIndex(elemento => elemento.hora == elementoHora && elemento.tarefa == elementoTarefa);
    listaDeElementos.splice(found, 1)
    
    localStorage.setItem('arrayStorage', JSON.stringify(listaDeElementos));
    displayLocalStorage();
    
    
    
}