from flask import Flask, render_template, request, jsonify, session
import os
import json
from datetime import datetime
from backend.chat_connector import send_question

app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        if 'chat_history' not in session:
            session['chat_history'] = [{"role": "system", "content": ''}]

        data = request.get_json()
        user_message = data.get('message', '').lower().strip()
        
        if not user_message:
            return jsonify({
                'status': 'error',
                'message': 'Mensagem vazia'
            })

        session['chat_history'].append(
            {"role": "user",
                "content": user_message
            }
        )
        session.modified = True

        response_text = send_question(session['chat_history'])

        session['chat_history'].append(
            {"role": "system",
                "content": response_text
            }
        )
        session.modified = True

        return jsonify({
            'status': 'success',
            'response': response_text,
            'timestamp': datetime.now().strftime('%H:%M')
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': 'Erro interno do servidor'
        })

if __name__ == '__main__':
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static/css', exist_ok=True)
    os.makedirs('static/js', exist_ok=True)
    os.makedirs('static/img', exist_ok=True)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
