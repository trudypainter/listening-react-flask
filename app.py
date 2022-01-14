from os import error
from flask import Flask, send_from_directory, redirect, request
from sqlalchemy.sql.sqltypes import Integer
from flask_sqlalchemy import SQLAlchemy
import requests
import json
from urllib.parse import urlencode
from dateutil import parser
import psycopg2
import datetime

app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://gyapnprijuucxd:b5d546034ef4baa6cbe6c08b8ac38f5a37ecda76e60679de14ad2b0f72e6d440@ec2-3-89-214-80.compute-1.amazonaws.com:5432/d3tt7l03ba5bep'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

#########################
#  ⭐️ SPOTIFY SUPPORT   #
#########################

CLIENT_ID = "7397f801a0974e4c8c143e7f13de3c1c"
CLIENT_SECRET = "86576b4dbd68493e89b64616396bd8cd"
AUTH_URL = 'https://accounts.spotify.com/api/token'
BASE_URL = 'https://api.spotify.com/v1/'
REDIRECT_URI = 'http://localhost:5000/callback'
SCOPE = 'user-read-recently-played'
AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'

ACCESS_TOKEN = "BQBalEU5MeMTnK_qsyHb_aTLuaLRinr2dXsItZIMAkUSi83PDa0ameoolbAFcLQQkyoxo2BAyowcCuIQe7tWCchGVcnBC_YuFSvrEMNoiOc54PRCCLnNj6_dukKRzgOD7MEMvSN6367e9MDp9OINXrsXsA"
REFRESH_TOKEN = "AQCpj1cKRaoc-Ksc1AFx5mMHnq4xU9Eaq9Of6nBFciZbXgdH_ikKY53TO6xG3UZpYlZzjw-0XJ_hLXZv2Qn9G9VoANxnVCaDOROOJgZ311AM8OBd9ztfEiX85iD33MmVaO4"

# 🟨 GET TOKENS (specifically if refresh fails)
@app.route('/api/login', methods=["GET"])
def login():
    payload = {
            'client_id': CLIENT_ID,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'scope': SCOPE,
    }
    return redirect(f'{AUTH_URL}/?{urlencode(payload)}')

# 🟨 CALLBACK FOR REFRESH AND ACCESS TOKENS
@app.route('/callback')
def callback():
    code = request.args.get('code')
    # Request tokens with code we obtained
    payload = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
    }
    res = requests.post(TOKEN_URL, auth=(CLIENT_ID, CLIENT_SECRET), data=payload)
    res_data = res.json()
    return res_data

# 🟨 GET ACCESS TOKEN
def get_access_token():
    payload = {'grant_type': 'refresh_token',
             'refresh_token': REFRESH_TOKEN,
             'client_id': CLIENT_ID,
             'client_secret': CLIENT_SECRET}

    response = requests.post(TOKEN_URL, data=payload)
    token_obj = json.loads(response.text)
    return token_obj['access_token']
    

# 🟨 GET THE RECENTLY PLAYED SONGS
def get_recently_played():
    # build request
     # Get profile info
    ACCESS_TOKEN = get_access_token()
    headers = {'Authorization': f"Bearer {ACCESS_TOKEN}"}
    url = BASE_URL + "me/player/recently-played"

    # get request
    r = requests.get(url, headers=headers)
    return r.json()

# 🟨 GET CONTEXT NAME
def get_context_info(href_url):
    ACCESS_TOKEN = get_access_token()
    headers = {'Authorization': f"Bearer {ACCESS_TOKEN}"}

    # get request
    r = requests.get(href_url, headers=headers)
    return r.json()


##################
#  ⭐️ BACKEND    #
##################

class Song(db.Model):
    song_id = db.Column(db.Integer, primary_key=True)
    
    artist = db.Column(db.String(120))
    album = db.Column(db.String(120))
    song = db.Column(db.String(120))
    spotify_track_link = db.Column(db.String(120))
    spotify_img_link = db.Column(db.String(120))
    uri = db.Column(db.String(120))

    timestamp = db.Column(db.String(120))
    short_day = db.Column(db.String(120))
    long_day = db.Column(db.String(120))
    time_of_day = db.Column(db.String(120))

    context_uri = db.Column(db.String(120))
    context_link = db.Column(db.String(120))
    context_name = db.Column(db.String(120))

    preview_url = db.Column(db.String(120))

    def __repr__(self):
        return "[" + self.timestamp + ": " + self.song + " by " + self.artist + "]"

# 🟩 ADD MOST RECENT LISTENING HISTORY
@app.route('/api/collect', methods=["GET"])
def collect_listening():

    # 🔸 PERFORM SPOTIFY API GET REQUEST
    # get access token
    listening_history = get_recently_played()
    # return listening_history

    # ITERATE OVER RESPONSE OBJECT AND ADD SONG ROWS TO DB
    songs_added = []
    for song in listening_history['items']:

        # get general info
        timestamp = song.get("played_at", "")
        context = song.get("context", "")
        songObj = song.get("track")

        #ONLY ADD NEW ROWS
        dateObj = parser.parse(timestamp)
        dateObj = dateObj - datetime.timedelta(hours=5) 
        timestamp = datetime.datetime.strftime(dateObj, '%Y-%m-%dT%H:%M:%S.%f%z') #2018-01-02T22:10:05.284208
        print("CHECKING ", timestamp)
        exists = Song.query.filter_by(timestamp = timestamp).first()
        
        if not exists:

            # build context info
            if context is not None:
                context_uri = context.get('uri', "")
                context_link = context.get('external_urls', "").get("spotify", "")
                context_name = get_context_info(context.get("href", ""))

            # build time info
            time_of_day = datetime.datetime.strftime(dateObj, "%H:%M") # 04:23
            short_date = datetime.datetime.strftime(dateObj, "%m/%d/%Y") #07/06/2017
            long_date = datetime.datetime.strftime(dateObj, "%b %d, %Y") #12 Jun, 2018

            # build context info
            try:
                new_song = Song(
                    artist = songObj.get("artists")[0].get("name"),
                    album = songObj.get("album").get("name"),
                    song = songObj.get("name"),
                    spotify_track_link = songObj.get("external_urls").get("spotify"),
                    spotify_img_link = songObj.get("album").get("images")[0].get("url"),
                    uri = songObj.get("uri"),

                    timestamp = timestamp,
                    time_of_day = time_of_day,
                    short_day = short_date,
                    long_day = long_date,

                    context_uri = context_uri,
                    context_link = context_link,
                    context_name = context_name.get("name", ""),

                    preview_url = songObj.get('preview_url')
                )

                print(new_song)
                db.session.add(new_song)
                db.session.commit()
                print("**ADDED: ", new_song)
                songs_added.append(str(new_song))
            except error as e:
                print("****ERROR FOR", )
                print(e)

            

    return {"songs added":songs_added}
    
# 🟦 GET SONG HISTORY FOR SPECIFC DAY
@app.route('/api/<date>', methods=["GET"])
def get_date(date):

    # GET ALL ROWS WHERE SIMPLE DATE IS <date>
    formatted_date = date.replace(".", "/")

    song_list = []
    for song in Song.query.filter_by(short_day=formatted_date).all():

        song_list.append({
            "artist": str(song.artist),
            "album": str(song.album),
            "song": str(song.song),
            "spotify_track_link": str(song.spotify_track_link),
            "spotify_img_link": str(song.spotify_img_link),
            "uri":str(song.uri),

            "timestamp": str(song.timestamp),
            "time_of_day": str(song.time_of_day),
            "short_day": str(song.short_day),
            "long_day": str(song.long_day),

            "context_uri": str(song.context_uri),
            "context_link": str(song.context_link),
            "context_name": str(song.context_name),

            "preview_url": str(song.preview_url)
        })

    sorted_songs = sorted(song_list, key=lambda d: parser.parse(d['timestamp']))

    return {"songs": sorted_songs}

# 🟦 GET ALL SIMPLE SONG DATES
@app.route('/api/dates', methods=["GET"])
def get_all_dates():
    date_list = []
    # GET DISTINCT SIMPLE DATES FROM SONG ROWS
    for val in db.session.query(Song.short_day).distinct():
        date_list.append(parser.parse(val.short_day))

    date_list.sort(reverse=True)

    date_strs = [datetime.datetime.strftime(dateObj, "%m/%d/%Y") for dateObj in date_list]

    # RETURN IN ARRAY OF STRINGS
    return {"dates": date_strs}

# 🟦 GET ALL SIMPLE SONG DATES
@app.route('/api/all_songs', methods=["GET"])
def get_all_songs():
    song_list = []
    # GET DISTINCT SIMPLE DATES FROM SONG ROWS
    for val in db.session.query(Song).all():
        song_list.append(str(val))

    # RETURN IN ARRAY OF STRINGS
    return {"all songs": song_list}

##################
#  ⭐️ FRONTEND   #
##################
@app.route('/', methods=["GET"])
def index():
    return app.send_static_file('index.html')


if __name__ == '__main__':
  app.run(debug=True)

