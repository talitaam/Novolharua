$(document).ready(() => {
    let data = [
        ['Jorge', '12/03/2019', 'TESTE'],
        ['Maria', '13/03/2019', 'TESTE 2']];

    data.forEach(line => {
        $('.table-body').append(
            "<tr>" +
            "<td>" + line[0] + "</td>" +
            "<td>" + line[1] + "</td>" +
            "<td>" + line[2] + "</td>" + 
            "</tr>"
        ); 
    });

    $.ajax({
        url: "localhost:3000/doacao/",
        type: "GET",
        crossDomain: true,
        data: JSON.stringify(somejson),
        dataType: "json",
        success: function (response) {
            var resp = JSON.parse(response)
            
            alert(resp.status);
            
            data.forEach(line => {
                $('.table-body').append(
                    "<tr>" +
                    "<td>" + line[0] + "</td>" +
                    "<td>" + line[1] + "</td>" +
                    "<td>" + line[2] + "</td>" + 
                    "</tr>"
                ); 
            }); 
        },
        error: function (xhr, status) {
            alert("error");
        }
    });
});
