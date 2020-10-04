from config import *

# A classe está definindo as colunas do banco, e transformando os dados em JSON
class Jogo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    placar = db.Column(db.Integer)
    minimo = db.Column(db.Integer)
    maximo = db.Column(db.Integer)
    quebraMin = db.Column(db.Integer)
    quebraMax = db.Column(db.Integer)

    def json(self):
        return {
            "id": self.id,
            "placar": self.placar,
            "minimo": self.minimo,
            "maximo": self.maximo,
            "quebraMin": self.quebraMin,
            "quebraMax": self.quebraMax
        }