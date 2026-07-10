import sqlite3

# Connect to SQLite database
conn = sqlite3.connect("crm.db", check_same_thread=False)

# Create cursor
cursor = conn.cursor()

# Create table if it doesn't exist
cursor.execute("""
CREATE TABLE IF NOT EXISTS interactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hcpName TEXT,
    interactionType TEXT,
    date TEXT,
    time TEXT,
    attendees TEXT,
    topics TEXT,
    materials TEXT,
    samples TEXT,
    sentiment TEXT,
    outcome TEXT,
    followUp TEXT
)
""")

conn.commit()