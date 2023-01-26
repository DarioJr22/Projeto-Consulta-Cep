var CEP = true;
var response;
_this = this;

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
};

getData = function (CEP) {
  fetch(`https://viacep.com.br/ws/${CEP}/json/`)
    .then((response) => response.json())
    .then((data) => {
      debugger
      console.log(data);
      if (data.erro == 'true') {
        _this.clearInputs();
        window.alert("CEP inválido");
      } else {
        document.getElementById("Lagradouro").value = data.logradouro;
        document.getElementById("Complemento").value = data.complemento == "" ? "Sem Complemento" : data.complemento;
        document.getElementById("Bairro").value = data.bairro;
        document.getElementById("Cidade").value = data.localidade;
      }
    });
};
