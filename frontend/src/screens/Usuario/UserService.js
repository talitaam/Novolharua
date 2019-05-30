import serverParams from "variables/server.jsx";

class UserService {
  fecthUser() {
    const fetchData = {
      method: "POST"
    };
    return fetch(serverParams.SERVER_URL + "doador/", fetchData).then(res =>
      res.json()
    );
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

    return fetch(serverParams.SERVER_URL + "/doador/add", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .catch(error => {
        alert("Erro ao enviar cadastro de usuário!");
      });
  }
}

export default new UserService();
