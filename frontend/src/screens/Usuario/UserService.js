import serverParams from 'variables/server.jsx';

class UserService {
    fecthUser() {
        const fetchData = {
            method: "GET"
        };
        return fetch(serverParams.SERVER_URL + 'rota/', fetchData).then((res) => res.json());
    }

    saveUser({ nome, email, obs }) {
        let data = {
            userName: nome,
            userEmail: email,
            observacao: obs
        };

        return fetch(serverParams.SERVER_URL + '/usuario/add',
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        ).then(res => res.json())
            .catch(error => {
                alert("Erro ao enviar cadastro de usuário!");
            });
    }
}

export default new UserService();
