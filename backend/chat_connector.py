import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

SERVING_ENDPOINT  = os.getenv('SERVING_ENDPOINT')
DATABRICKS_HOST = os.getenv('DATABRICKS_HOST')
DATABRICKS_TOKEN  = os.getenv('DATABRICKS_TOKEN')


def format_response(response_content):
    try:
        return response_content['choices'][0]['message']['content']
    except Exception as e:
        return 'Desculpe, houve um erro. Tente novamente.'


def send_question(system_message, user_message) -> str:

    workspace_url = DATABRICKS_HOST
    endpoint_name = SERVING_ENDPOINT
    databricks_token = DATABRICKS_TOKEN
 
    messages = [
        {"role": "system",
         "content": system_message
        },
        {"role": "user",
         "content": user_message
        }
    ]
    max_tokens = 400

    url = f"{workspace_url.rstrip('/')}/serving-endpoints/{endpoint_name}/invocations"
    
    headers = {
        'Authorization': f'Bearer {databricks_token}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": 0.7
    }

    response = requests.post(url, headers=headers, json=payload, timeout=30)
    result = format_response(response.json())

    return result
