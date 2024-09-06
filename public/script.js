$("#cep").on("input change", function(){
    var cep = this.value.replace(/[^0-9]/, "");

    if(cep.length != 8){
        return false;
    }
    else{
        getCEP(cep)
        .then(response => {
            $("#endereco").val(response.logradouro);
            $("#bairro").val(response.bairro);
            $("#cidade").val(response.localidade);
            $("#estado").val(response.uf);
        })
        .catch(e => {
            alert("Erro");
            console.error('Erro:', e);
        }); 
    }
});


async function getCEP(cep){
    return new Promise((resolve, reject) => {
        fetch("/getCEP/" + cep)
        .then(response => response.json())
        .then(response => {
            console.log("Dados: " + response);
            console.log(response.data)
    
            if (!response.success) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            else{
                resolve(response.data);
            }
        })
        .catch(e => {
            reject(e);
        });
    });
}