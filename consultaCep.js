var CEP
var response
_this = this


getSearch = function(C){


}
/* 
validateMask = function(){
    CEP = document.getElementById("CEP").value
    console.log($('#CEP').mask('00000-000')); 
} */

validateCep = function(){
    const CEPvalid = document.getElementById('CEP')
    if(CEPvalid.value.length == 8){
        let CepTemp = document.getElementById("CEP").value
        let firstPart = CepTemp.slice(0,5)
        let lastPart = CepTemp.slice(6,10)
        document.getElementById("CEP").value = `${firstPart}-${lastPart}`
            if (document.buscaCep.cep.validity.patternMismatch) {
                document.getElementById("CEP").value = ''
            }
    }
    

    console.log(document.buscaCep.cep.validity.patternMismatch,CEPvalid.value);
    
}


getData = function(CEP) {
    let CEPvalid = this.validateCep()

    


    fetch(`https://viacep.com.br/ws/${CEP}/json/`)
    .then(response => response.json())
    .then( data => {
        console.log(data);
      document.getElementById("Lagradouro").value = data.logradouro
      document.getElementById("Complemento").value = data.complemento
      document.getElementById("Bairro").value = data.bairro
      document.getElementById("Cidade").value = data.localidade
    })


}