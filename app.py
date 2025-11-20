from flask import Flask, render_template, send_from_directory, url_for
import os
app = Flask(__name__)

# Путь к папке с статикой
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BG_DIR = os.path.join(BASE_DIR, "static", "backgrounds")

@app.route("/")
def index():
    # Получаем список локальных фоновых картинок (для селектора)
    backgrounds = []
    if os.path.isdir(BG_DIR):
        for fn in os.listdir(BG_DIR):
            if fn.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".webp")):
                backgrounds.append(url_for('static', filename=f"backgrounds/{fn}"))
    return render_template("index.html", backgrounds=backgrounds)

# если нужно — вернуть badges (уже доступны через /static)
# дополнительные маршруты не требуются для базового функционала

if __name__ == "__main__":
    app.run(debug=True)
