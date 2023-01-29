var CEP = true;
var response;
_this = this;
window.onload = function () {
  alert('Bem vindo ao Busca CEP, meu projetinho de estudos. Fique a vontade para me dar feedbacks.')
}

getSearch = function (C) {};
/* 

Varificar se o padrão é valid ou não.

document.buscaCep.cep.validity.patternMismatch


I Usado para acessar o DOM
II Name do elemento pai
III Name do elemento dentro da do elemento pai
IV propriedade pai 
V propriedade filha


Slice - Fatia o Array 

1º Argumento - indice inicial
2º Argumento - indice Final


document.querySelectorAll('HTML ELEMNT')


} */

validateCep = function () {
  const CEPvalid = document.getElementById("CEP");
  if (CEPvalid.value.length == 8) {
    let firstPart = CEPvalid.value.slice(0, 5);
    let lastPart = CEPvalid.value.slice(5, 10);
    CEPvalid.value = `${firstPart}-${lastPart}`;
    // Validação se o Cep tá no padrão
    if (document.buscaCep.cep.validity.patternMismatch) {
      document.getElementById("CEP").value = "";
      window.alert("Digite um CEP válido");
      _this.clearInputs();
    } else {
      let CepTemp = CEPvalid.value.replace("-", "");
      _this.getData(CepTemp);
    }
  }

  console.log(document.buscaCep.cep.validity.patternMismatch, CEPvalid.value);
};

clearInputs = function () {
  document.querySelectorAll("input").forEach((i) => {
    i.value = "";
  });
  document.querySelectorAll("select").forEach((i) => {
    i.value = ".";
  });
};



getData = function (CEP) {
  fetch(`https://viacep.com.br/ws/${CEP}/json/`)
    .then((response) => response.json())
    .then((data) => {
      if (data.erro) {
        _this.clearInputs();
        window.alert("CEP inválido");
      } else {
        document.getElementById("Lagradouro").value = data.logradouro;
        document.getElementById("Complemento").value = data.complemento == "" ? "Sem Complemento" : data.complemento;
        document.getElementById("Bairro").value = data.bairro;
        document.getElementById("Cidade").value = data.localidade;
        document.getElementById("Uf").value = data.uf;
      }
    });
};

validaBuscaCep = function(){
  let Estado = document.getElementById("UF_lista")
  let Cidade = document.getElementById("Cidade_Lista")
  let Rua = document.getElementById("Rua_lista")
  console.log(Estado.value,Cidade.value,Rua.value);
  //Validações || Campo vazio

  if (Estado.value == false || Estado == '.') {
    window.alert("Preencha o Estado para fazer a Busca !");
    Estado.value = '.'
  } else if(Cidade.value == false){
    window.alert("Preencha a Cidade para fazer a Busca !");
    Cidade.value = ''
  }else if(Rua.value == false){
    window.alert("Preencha a Rua para fazer a Busca !");
    Rua.value = ''
  }

   //Validações || Fora do Padrão
  if(document.buscaCep_Lista.CidadeLista.validity.patternMismatch){
    window.alert("Não é permitido caractéres especiais na busca da Cidade !");
    Cidade.value = ''
  }else if(document.buscaCep_Lista.RuaLista.validity.patternMismatch){
    window.alert("Não é permitido caractéres especiais na busca da Rua !");
    Rua.value = ''
  }

  _this.getDataForUfMuLa(Estado.value,Cidade.value,Rua.value)
}

getDataForUfMuLa = function (UF,MU,LA) {



  fetch(`https://viacep.com.br/ws/${UF}/${MU}/${LA}/json/`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      _this.listaTabela(data)
     
    });
};

//Inserção de elementos na tabela 

listaTabela = function(retorno){
  let tbody = document.getElementById('tbody')
  tbody.innerHTML = ''
  
  //Se o retorno vier vazio
  if (!retorno || retorno.length == 0) {
    window.alert('Não achamos nada, Tente ontra busca !')
  }else{
    
    for(let i =0;i<retorno.length;i++){
      let tr = tbody.insertRow(i)

      let td_Cep = tr.insertCell(0);
      let td_Rua = tr.insertCell(1);
      let td_Complemento = tr.insertCell();
      let td_Bairro = tr.insertCell();
      let td_Cidade = tr.insertCell();
      let td_UF = tr.insertCell();

      td_Cep.innerHTML = retorno[i].cep
      td_Rua.innerHTML = retorno[i].logradouro
      td_Complemento.innerHTML = retorno[i].complemento == "" ? "Sem Complemento" : retorno.complemento;
      td_Bairro.innerHTML = retorno[i].bairro
      td_Cidade.innerHTML = document.getElementById("Cidade_Lista").value
      td_UF.innerHTML = retorno[i].uf
    }
  }
 
}





//Modificar classe 

exitElement = function(){
  let form = document.getElementById("BoxForm1")
  let iconRigth = document.getElementById("iconRight")

  form.className = "BoxForm BoxFormExit"
  iconRigth.className = "buttonGetList buttonGetListExit"

}

enterElement = function(){
  let form2 = document.getElementById('BoxForm2')
  let iconLeft = document.getElementById('iconLeft')
  form2.hidden = false
  form2.className = "BoxForm2 BoxFormEnter"
  iconLeft.className = "buttonGetForm buttonGetFormEnter"
}


// - - 

backElement = function(){
  let form = document.getElementById("BoxForm1")
  let iconRigth = document.getElementById("iconRight")

  form.className = "BoxForm BoxFormExit BackBoxFormExit"
  iconRigth.className = "buttonGetList buttonGetListExit BackBoxFormExit"

}

backenterElement = function(){
  let form2 = document.getElementById('BoxForm2')
  let iconLeft = document.getElementById('iconLeft')
  form2.hidden = false
  form2.className = "BoxForm2 BoxFormEnter BackBoxFormEnter"
  iconLeft.className = "buttonGetForm buttonGetFormEnter BackbuttonGetForm2"
}


