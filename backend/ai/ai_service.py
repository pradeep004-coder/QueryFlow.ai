import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("AI_API_KEY"))

def ask_ai(question: str):
    chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": question}],
        model="llama-3.3-70b-versatile",
    )
    answer = chat_completion.choices[0].message.content
    return answer
