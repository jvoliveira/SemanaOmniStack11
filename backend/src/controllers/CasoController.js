const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        // recebido o novo usuario request body
        const {titulo, descricao, valor} = request.body;
        const ong_id = request.headers.authorization;

        await connection('casos').insert({
            titulo,
            descricao, 
            valor,
            ong_id
        });

        return response.send("Criado");
    },

    async listAll(request, response){
        const { page = 1} = request.query;
        const ongs = await connection('casos')
        .select('casos.*', 'ongs.nome', 'ongs.email', 'ongs.telefone')
        .join('ongs', 'ongs.id', '=', 'casos.ong_id')
        .limit(5).offset((page-1)*5);

        return response.json(ongs);
    },

    async listCaso(request, response){
        const id = request.params.id;
        const ong = await connection('casos').select('*').where('id',id);
        return response.json(ong);
    },

    async delete(request, response){
        const id = request.params.id;
        const ong_id = request.headers.authorization;

        const ong = await connection('casos').select('ong_id').where('id',id).first();

        if (ong_id == ong.ong_id) {
            await connection('casos').where('id',id).del();
            return response.send("Caso Deletado com sucesso!");
        } else {
            return response.status(401).json({
                error: "Operação Não Permitida",
                msg: "Você não pode deletar um caso que não seja da sua ONG."
            });
        }
    }
};
