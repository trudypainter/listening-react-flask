from flask import Flask, render_template, send_from_directory
app = Flask(__name__, static_folder='./frontend/build', static_url_path='')

@app.route('/', methods=["GET"])
def index():
    print("GOT REQUEST *****😀")
    return app.send_static_file('index.html')

if __name__ == '__main__':
  app.run(debug=True)

