from flask import Flask,jsonify, request
from flaskext.mysql import MySQL 
from flask_cors import CORS

app = Flask(__name__)

#Configuracion DB
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_PORT'] = 3306
app.config['MYSQL_DATABASE_DB'] = 'games_db'
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''

mysql = MySQL()
mysql.init_app(app)
CORS(app)

#Test que funcione el servidor
@app.route('/')
def ping():
    return 'pong'


@app.route('/api/games', methods=['GET'])
def get_games():
    cur = mysql.get_db().cursor()
    cur.execute('SELECT * FROM games')
    game_list = cur.fetchall()
    games = []
    for game in game_list:
        new_game = {"id":game[0], "title":game[1], "description":game[2], "image":game[3]}
        games.append(new_game)
    return jsonify(games)

@app.route('/api/games/<id>', methods=['GET'])
def get_game(id):
    if request.method == 'GET':
        cur = mysql.get_db().cursor()
        cur.execute('SELECT * FROM games WHERE id = %s',(id))
        game_list = cur.fetchall()
        games = []
        for game in game_list:
            new_game = {"id":game[0], "title":game[1], "description":game[2], "image":game[3]}
            games.append(new_game)
        return jsonify(games)


@app.route('/api/games', methods=['POST'])
def add_game():
    if request.method == 'POST':
        title = request.json['title']
        description = request.json['description']
        image = request.json['image']
        cur = mysql.get_db().cursor()
        cur.execute('INSERT INTO games (title,description,image) VALUES (%s,%s,%s)',(title,description,image))
        mysql.get_db().commit()
        return jsonify({'message':'game added successfully'})

@app.route('/api/games/<id>', methods=['PUT'])
def edit_game(id):
    if request.method == 'PUT':
        title = request.json['title']
        description = request.json['description']
        image = request.json['image']
        cur = mysql.get_db().cursor()
        cur.execute('UPDATE games SET title=%s, description=%s, image=%s WHERE id=%s',(title,description,image,id))
        mysql.get_db().commit()
        games = [{'id':id,'title':title,'description':description,'image':image}]
        return jsonify(games)

@app.route('/api/games/<id>', methods=['DELETE'])
def delete_game(id):
    if request.method == 'DELETE':
        cur = mysql.get_db().cursor()
        cur.execute('DELETE FROM games WHERE id=%s',id)
        mysql.get_db().commit()
        return jsonify({"message":"game deleted successfully"})


#Arranco el servidor en modo prueba en el puerto 3000
if __name__ == "__main__":
    app.run(debug=True,port=3000)

    