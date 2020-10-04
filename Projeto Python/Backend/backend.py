from config import *
from models import Jogo

# No Framework Flask é necessário definir uma função para cada rota.
@app.route("/")
def inicar():
    return 'Sistema de cadastro de jogos da Maria. '+\
        'É possível visualizar os dados na página web desenvovlida, favor\
            executar o arquivo index.html da pasta Front-end, também acessível \
                pela porta 5500/Front-end. Caso deseje apenas visualizar \
                    os dados já existentes, clique no link.' +\
        '<a href="/listarJogos">Listar Dados</a>'

@app.route("/listarJogos")
# Essa função recebe todos os dados armazenados no banco e retorna eles em JSON.
def listarJogos():
    jogos = db.session.query(Jogo).all()
    jogosJson = [ x.json() for x in jogos ]
    listaJson = jsonify(jogosJson)
    listaJson.headers.add("Access-Control-Allow-Origin", "*")
    return listaJson

@app.route("/incluirJogos", methods = ["POST"])
# A função verifica se ocorreu tudo certo ao incluir um jogo novo, 
# adicionando-o caso sim ou retornando uma mensagem de erro caso não.
def incluirJogos():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    try:
        novo = Jogo(**dados)
        db.session.add(novo)
        db.session.commit()

    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    
    # Evita problemas com o CORS
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

app.run(debug=True)