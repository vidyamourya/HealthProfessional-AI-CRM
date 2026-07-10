import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY")
)


def run_agent(interaction):

    prompt = f"""
You are an AI CRM Assistant for pharmaceutical representatives.

Analyze the interaction below.

Rules:
- Use ONLY the information provided.
- Do NOT invent names or details.
- Respond in plain text only.
- Do NOT use Markdown.
- Do NOT use ** or bullet points.
- Keep the response concise and professional.

Format your response exactly like this:

Short Summary:
<2-3 sentence summary>

Doctor Sentiment:
<Positive / Neutral / Negative>

Recommended Follow-up:
<One short recommendation>

Interaction Details:
{interaction}
"""

    response = llm.invoke(prompt)

    return response.content