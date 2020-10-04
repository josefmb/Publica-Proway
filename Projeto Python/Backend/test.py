import unittest
from config import *
from models import *

# A classe está criando, adicionando e persistindo dados ao banco.
class teste(unittest.TestCase):
  def testeCriarBanco(self):
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    primeiroJogo = Jogo(placar = 12, minimo = 12, maximo = 12,\
      quebraMin = 0, quebraMax = 0)
    segundoJogo = Jogo(placar = 24, minimo = 12, maximo = 24,\
      quebraMin = 0, quebraMax = 1)
    terceiroJogo = Jogo(placar = 10, minimo = 10, maximo = 24,\
      quebraMin = 1, quebraMax = 1)
    quartoJogo = Jogo(placar = 24, minimo = 10, maximo = 24,\
      quebraMin = 1, quebraMax = 1)

    db.session.add(primeiroJogo)
    db.session.add(segundoJogo)
    db.session.add(terceiroJogo)
    db.session.add(quartoJogo)
    db.session.commit()

if __name__ == "__main__":
  unittest.main()