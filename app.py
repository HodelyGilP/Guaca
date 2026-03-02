from flask import Flask
import subprocess

app = Flask(__name__)

@app.route('/start-guacamole')
def start_guacamole():
    subprocess.Popen(["./start_guacamole.sh"])
    return "Guacamole is starting..."

if __name__ == "__main__":
    app.run(port=5000)
