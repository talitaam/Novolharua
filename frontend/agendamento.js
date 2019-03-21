//ACRÉSCIMO DO CÓDIGO POR TALITA:

function cadastrarAgen() //para cadastrar um agendamento de refeições:
{  
  let campoDoador = $('#doador').val();
  let campoData = $('#parent_selection').val();
  let campoRota = $('#child_selection').val();
  let valorCampo = campoDoador.trim();
  if (campoDoador != "" && campoData != "" && campoRota != "" && campoRota != null) { //garantir que todos os campos enviados para cadastro sejam válidos 
    if (valorCampo.length > 0) {  // garantir que campo de doador não pode ser preenchido somente com space e tenha pelo menos 1 caractere válido
      let cadAgend = { doador: campoDoador, data: campoData, rota: campoRota };
      //console.log(cadAgend);
      enviaCadastro(cadAgend);
    }
    else
      alert("Nome do doador não é válido! Cadastro de agendameno foi cancelado!");
  }
}

function validaData() //para verificar se a data escolhida é maior ou igual a data de hoje:
{  
  let dataEscolhida = document.getElementById('parent_selection').value;
  let dataDeHoje = moment();
  let dataParaComparar = moment(dataEscolhida, "YYYY-MM-DD");
  let verifica = moment(dataParaComparar).isSameOrAfter(dataDeHoje, 'day');
  //console.log(verifica);
  if (verifica) {
    verificaRotas(); //listar as rotas disponíveis para o a data válida selecionada
  }
  else {
    alert("Data inválida. Por favor, escolha uma data a partir do dia de hoje!");
    let hoje = moment().format("YYYY-MM-DD");
    let setDataValida = document.querySelector('input[type="date"]');
    setDataValida.value = hoje; //set o campo de data para o dia de hoje
    verificaRotas(); //listar as rotas disponíveis para o dia de hoje
  }
}

function verificaRotas() {
  var parent = $("#parent_selection").val();
  $.ajax({
    url: "http://localhost:3000/rota/", 
    type: "POST",
    crossDomain: true,
    data: { parent },
    dataType: "json",
    success: function (response) {
      let array = response.regioes;
      /*
      Exemplo de como deve ser a response.regioes:
        let array = [
          { display: "Área Hospitalar", value: "area_hositalar" },
          { display: "Praça Savassi", value: "praca_savassi" },
          { display: "Praça da Liberdade", value: "praca_liberdade" }];
      */
      console.log("Tamanho do array de rotas disponíveis recebido: " + array.length)
      if (array.length > 0) {
        listarRotas(array); //Só será listado caso tenha 1 ou mais rotas disponíveis
      }
      else
        alert("Todas as regiões já estão sendo atendidas nesta data! Por favor, escolha outra data!"); //não há listagem de rotas
    },
    error: function (xhr, status) {
      alert("error");
    }
  });
};

function enviaCadastro(cadastroAgen) {
  //Testando:
  //alert("Cadastro feito com sucesso!");
  //console.log("O objeto que está sendo enviado:");
  //console.log(cadastroAgen);
  var parent = $("#parent_selection").val();
  $.ajax({
    url: "http://localhost:3000/doacao/add", 
    type: "POST",
    crossDomain: true,
    data: { cadastroAgen },
    dataType: "json",
    success: function (response) {
      alert("Cadastro feito com sucesso!");
    },
    error: function (xhr, status) {
      alert("ERROR ao enviar cadastro de agendamento");
    }
  });
};

function listarRotas(array_list) {
  $("#child_selection").html(""); //reset child options
  $("#child_selection").append("<option></option>");
  $(array_list).each(function (i) { //populate child options 
    $("#child_selection").append("<option value=\"" + array_list[i].value + "\">" + array_list[i].display + "</option>");
  });
}

//ACRÉSCIMO DO CÓDIGO POR TALITA PAROU AQUI - 21/03/2019 
//____________________________________________________________________________________________________________________________


$(document).ready(() => {
    // $.ajax({
    //     url: "http://localhost:3000/doacao/",
    //     type: "POST",
    //     crossDomain: true,
    //     data: {},
    //     dataType: "json",
    //     success: function (response) {
    //         response.doacoes.forEach(line => {
    //             $('.table-body').append(
    //                 "<tr>" +
    //                 "<td>" + line.NOME + "</td>" +
    //                 "<td>" + line.DTDOACAO + "</td>" + 
    //                 "<td></td>" + 
    //                 "</tr>"
    //             ); 
    //         }); 
    //     },
    //     error: function (xhr, status) {
    //         alert("error");
    //     }
    // });

    /*let data = {
        dtdoacao : "22/03/2019"
    };

    $.ajax({
        url: "http://localhost:3000/rota/",
        type: "POST",
        crossDomain: true,
        data: data,
        dataType: "json",
        success: function (response) {
            
        },
        error: function (xhr, status) {
            alert("error");
        }
    });*/

    // let data = {
    //     nome: "doador",
    //     dtdoacao: "12/03/2019",
        
    // };

    // $.ajax({
    //     url: "http://localhost:3000/doacao/add",
    //     type: "POST",
    //     crossDomain: true,
    //     data: data,
    //     dataType: "json",
    //     success: function (response) {
            
    //     },
    //     error: function (xhr, status) {
    //         alert("error");
    //     }
    // });
});
