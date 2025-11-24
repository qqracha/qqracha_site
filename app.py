from flask import Flask, render_template, jsonify
from flask_compress import Compress
from datetime import timedelta, datetime
import json
import os

app = Flask(__name__)

# Gzip compression 
Compress(app)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(days=1)
app.config['COMPRESS_LEVEL'] = 6
app.config['COMPRESS_MIN_SIZE'] = 500


# main routes
@app.route("/")
def index():
    """Main route"""
    return render_template("index.html")

@app.route("/tools")
def tools():
    return render_template("tools.html")

# API endpoins
@app.route('/api/visits')
def get_visits():
    """API visitor counter"""
    os.makedirs('data', exist_ok=True)
    visits_file = 'data/visits.json'
    try:
        with open(visits_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        data = {'count': 0}
    
    # update counter
    data['count'] += 1
    data['last_visit'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    # save
    with open(visits_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    return jsonify(data)


@app.route('/api/status')
def get_status():
    """API для статуса онлайн"""
    return jsonify({
        'status': 'online',
        'timestamp': datetime.now().isoformat(),
        'server_time': datetime.now().strftime('%H:%M:%S')
    })


@app.route('/api/data')
def get_data():
    """API for main data"""
    return jsonify({
        'name': 'Egor',
        'role': 'Full-stack Python Developer',
        'status': 'online',
        'timestamp': datetime.now().isoformat()
    })


# check routes
@app.route('/health')
def health_check():
    """Check server status"""
    return {'status': 'ok', 'timestamp': datetime.now().isoformat()}, 200


# error handlers
@app.errorhandler(404)
def not_found(error):
    """Processing 404 error"""
    return render_template('index.html'), 404

    
@app.errorhandler(500)
def internal_error(error):
    """Processing 500 error"""
    return jsonify({'error': 'Internal server error'}), 500


# start
if __name__ == "__main__":
    # for development
    app.run(debug=True, host='127.0.0.1', port=5000)
    
    # for production
    # gunicorn -w 4 -b 0.0.0.0:5000 app:app
