const connection = require('../database/connection');
const encrypt = require('../Encrypt');

module.exports = {
    async create(request, response) {
        // recebido o novo usuario request body
        const dados = request.body;
        dados.senha = encrypt.criptografar(dados.senha)
        await connection('ongs').insert(dados);

        return response.send("Criado");
    },

    async listAll(request, response){
        const { page = 1} = request.query;
        const ongs = await connection('ongs').select('*')
        .limit(5).offset((page-1)*5);

        return response.json(ongs);
    },

    async listOng(request, response){
        const id = request.params.id;
        const ong = await connection('ongs').select('*').where('id',id);
        return response.json(ong);
    },

    async delete(request, response){
        const id = request.params.id;
        const ong_id = request.headers.authorization;

        if (ong_id == id) {
            await connection('ongs').where('id',id).del();
            return response.send("ONG Deletada com sucesso!");
        } else {
            return response.status(401).json({
                error: "Operação Não Permitida",
                msg: "Você não pode deletar uma ONG que não seja sua."
            });
        }
    }
}


