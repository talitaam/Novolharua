$(document).ready(() => {
    $.ajax({
        url: "http://localhost:3000/doacao/",
        type: "POST",
        crossDomain: true,
        data: {},
        dataType: "json",
        success: function (response) {
            response.doacoes.forEach(line => {
                $('.table-body').append(
                    "<tr>" +
                    "<td>" + line.NOME + "</td>" +
                    "<td>" + line.DTDOACAO + "</td>" + 
                    "<td></td>" + 
                    "</tr>"
                ); 
            }); 
        },
        error: function (xhr, status) {
            alert("error");
        }
    });
});
