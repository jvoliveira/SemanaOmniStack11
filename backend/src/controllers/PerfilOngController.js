const connection  = require('../database/connection');


module.exports = {

    async listAllCasosFromONG(request, response){
        const { page = 1} = request.query;
        const id = request.params.id;
        const casos = await connection('casos').select('*').where('ong_id',id)
        .limit(5).offset((page-1)*5);
        
        return response.json(casos);
    }
}