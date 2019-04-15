import { serverUrl } from "variables/server.jsx";

const messages = {
    
};

class AgendamentoController {
    constructor() {
        this.serverUrl = serverUrl;
    }

    agendarDoacao (doacao) {        
        if ( !doacao.doador && 
             !doacao.data && 
             !doacao.rota ) { 
            alert("Nome do doador não é válido! Cadastro de agendamento foi cancelado!");
        } else {
            $.ajax({
            url: 'http://localhost:3001/doacao/add', 
            type: "POST",
            crossDomain: true,
            data: { doacao },
            dataType: "json",
            success: function (response) {
                alert("Cadastro feito com sucesso!");
            },
            error: function (xhr, status) {
                alert("Erro ao enviar cadastro de agendamento");
            }
            });
        }
    }
}

export default AgendamentoController ;