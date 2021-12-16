from flask import Flask, render_template, send_from_directory
app = Flask(__name__, static_url_path='', static_folder='./frontend/build')

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')


@app.route('/api/get_listening')
def get_listening():
  return render_template('index.html')

if __name__ == '__main__':
  app.run(debug=True)

