let Doacao = () =>  {
    let dbService = require('./db');
    const GET_ALL_DOACOES = "SELECT * FROM DOACAO ORDER BY 1";
    
    let getAllDoacoes = () => {
        dbService.runQuery(sqlStatement).then(result => {
            return result;
        });
    }

    let getDonationByUser = (userId) => {
        // Not Implemented Yet
    }   
}

module.exports = Doacao;