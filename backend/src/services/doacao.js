let Doacao = () =>  {
    
    let getDonationByUser = (userId) => {
        // Not Implemented Yet
    }   
};


module.exports = function () {
    let dbService = new (require('./db')) ();
    const GET_ALL_DOACOES = "SELECT * FROM DOACAO ORDER BY 1";

    return dbService.runQuery(GET_ALL_DOACOES).then(result => {
        return result;
    });
};
// module.exports = Doacao;