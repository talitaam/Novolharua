import serverParams from "variables/server.jsx";

class DoacoesService {
  constructor() {
    this.NO_DONATIONS_MSG = "Não foi possível recuperar as doações !";
  }

  fetchDoacoes() {
    return fetch(serverParams.SERVER_URL + "doacao/", {
      method: "POST"
    })
      .then(res => res.json())
      .catch(error => alert(this.NO_DONATIONS_MSG));
  }

  saveDonation({ donatorName, donationDate, selectedRoute }) {
    const doacao = {
      doador: donatorName,
      data: donationDate,
      rota: selectedRoute
    };

    return fetch("http://localhost:3001/doacao/add", {
      method: "POST",
      body: JSON.stringify(doacao)
    })
      .then(res => res.json())
      .then(json => {
        if (json) alert(json.message);
      })
      .catch(error => {
        alert("Erro ao enviar cadastro de agendamento");
      });
  }
}

export default new DoacoesService();
