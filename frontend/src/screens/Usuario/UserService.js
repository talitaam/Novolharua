import serverParams from "variables/server.jsx";

class UserService {
  fecthUser() {
    return fetch(serverParams.SERVER_URL + "doador/", {
      method: "POST"
    })
      .then(res => res.json())
      .catch(error => alert(this.NO_DONATIONS_MSG));
  }

  findUsers() {
    return this.fecthUser();
  }

  saveUser({
    name,
    email,
    doc,
    telefoneFixo,
    telefoneCelular,
    obs,
    acoesUsuario,
    status
  }) {
    let data = {
      nomDoador: name,
      cpfCnpj: doc,
      telefone: telefoneFixo,
      celular: telefoneCelular,
      email: email,
      idAcao: acoesUsuario,
      observacao: obs,
      status: status
    };

    return fetch("http://localhost:3001/doador/add", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .catch(error => {
        alert("Erro ao enviar cadastro de usuário!");
      });
  }

  activateUser(donatorId) {  
    const data = {
      donatorId
    };

  return fetch(serverParams.SERVER_URL + "doador/ativar/", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .catch(error => alert("Não foi possível ativar este usuário !"));
  }
}

export default new UserService();
