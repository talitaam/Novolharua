let Doacao = () =>  {
    let doacaoService = require('../services/doacao');
    
    let getDoacoes = () => {
        return doacaoService.getAllDoacoes();
    }

}

module.exports = Doacao;