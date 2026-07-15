# AI CRM – HCP Module

## Project Overview
AI CRM – HCP Module is a full-stack web application designed for pharmaceutical sales representatives to manage Healthcare Professional (HCP) interactions. The application allows users to log interactions, generate AI-powered summaries, view interaction history, search and filter records, export data as CSV, and monitor dashboard statistics.

## Features
- Log HCP interactions through a structured form.
- AI-generated interaction summary.
- Dashboard with total, positive, neutral, and negative interactions.
- Interaction history table.
- Search interactions by HCP name.
- Filter interactions by sentiment.
- Export interaction history to CSV.
- REST API using FastAPI.

## Tech Stack

### Frontend
- React.js
- JavaScript
- Bootstrap 5
- Axios
- Vite

### Backend
- Python
- FastAPI

### AI
- LangChain
- Groq (Llama 3.3)

### Database
- SQLite

## Project Structure

```
ai-crm-hcp/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│
├── backend/
│   ├── main.py
│   ├── ai_agent.py
│   ├── tools.py
│   ├── database.py
│
├── package.json
├── README.md
```

## Installation

### Clone Repository

```bash
git clone <your-github-repository-url>
cd ai-crm-hcp
```

### Frontend Setup

```bash
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

### Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Create and activate virtual environment:

```bash
python -m venv venv

Windows:
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run FastAPI:

```bash
uvicorn main:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /log | Log HCP interaction |
| GET | /history | Retrieve interaction history |
| GET | /dashboard | Retrieve dashboard statistics |

## AI Features

- AI-generated interaction summary
- Interaction logging
- Follow-up recommendation
- HCP interaction history retrieval
- Structured backend tool functions

## Future Enhancements

- User authentication
- Edit/Delete interactions
- MySQL/PostgreSQL integration
- Charts and analytics
- Cloud deployment

## Author

**Vidya Maurya**