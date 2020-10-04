from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

# Cria a instância do app, necessário no desenvolvimento.
app = Flask(__name__)
CORS(app)
# Criação e configuração do Banco de Dados 
path = os.path.dirname(os.path.abspath(__file__))
arquivobd = os.path.join(path, 'jogos.db')
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///"+arquivobd
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)