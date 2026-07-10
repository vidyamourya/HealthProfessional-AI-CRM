from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ai_agent import run_agent
from tools import (
    log_interaction,
    edit_interaction,
    summarize_interaction,
    recommend_next_action,
    fetch_hcp_history,
)
from database import conn, cursor

app = FastAPI(title="AI CRM - HCP Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Interaction(BaseModel):
    hcpName: str
    interactionType: str
    date: str
    time: str
    attendees: str
    topics: str
    materials: str
    samples: str
    sentiment: str
    outcome: str
    followUp: str


@app.get("/")
def home():
    return {"message": "AI CRM Backend Running Successfully!"}

@app.post("/log")
def log(interaction: Interaction):

    data = interaction.model_dump()

    # Save interaction into SQLite database
    cursor.execute("""
        INSERT INTO interactions (
            hcpName,
            interactionType,
            date,
            time,
            attendees,
            topics,
            materials,
            samples,
            sentiment,
            outcome,
            followUp
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data["hcpName"],
        data["interactionType"],
        data["date"],
        data["time"],
        data["attendees"],
        data["topics"],
        data["materials"],
        data["samples"],
        data["sentiment"],
        data["outcome"],
        data["followUp"]
    ))

    conn.commit()

    # Tool 1
    logged = log_interaction(data)

    # AI
    ai_response = run_agent(data)

    # Tool 3
    summary = summarize_interaction(ai_response)

    # Tool 4
    recommendation = recommend_next_action(
        "Meet doctor again within one week."
    )

    # Tool 5
    history = fetch_hcp_history(data["hcpName"])

    return {
        "status": "success",
        "log": logged,
        "summary": summary,
        "recommendation": recommendation,
        "history": history,
    }
@app.get("/history")
def get_history():

    cursor.execute("""
        SELECT
            hcpName,
            interactionType,
            date,
            sentiment,
            outcome
        FROM interactions
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()

    history = []

    for row in rows:
        history.append({
            "hcpName": row[0],
            "interactionType": row[1],
            "date": row[2],
            "sentiment": row[3],
            "outcome": row[4]
        })

    return history
@app.get("/dashboard")
def dashboard():

    cursor.execute("SELECT COUNT(*) FROM interactions")
    total = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM interactions WHERE sentiment='Positive'")
    positive = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM interactions WHERE sentiment='Neutral'")
    neutral = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM interactions WHERE sentiment='Negative'")
    negative = cursor.fetchone()[0]

    return {
        "total": total,
        "positive": positive,
        "neutral": neutral,
        "negative": negative,
    }