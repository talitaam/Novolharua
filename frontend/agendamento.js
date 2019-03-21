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

    let data = {
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
    });

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
