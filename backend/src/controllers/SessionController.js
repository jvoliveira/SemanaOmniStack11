const connection = require('../database/connection');

module.exports = {

    async create(request, response){
        const id = request.body.id;

        const ong = await connection('ongs').select('nome').where('id',id).first();

        if(!ong){
            return response.status(400).json({error: "Não foi encontrada nenhuma ONG com o ID informado."});
        }else{
            return response.status(200).json(ong);
        }
    }
}