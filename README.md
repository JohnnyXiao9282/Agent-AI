Agent AI – Full-Stack RAG & MCP-Based Document Q&A Agent

Agent AI is a full-stack AI assistant for semantic document question-answering with both text and voice interaction. It combines a Retrieval-Augmented Generation (RAG) pipeline, web search via a Model Context Protocol (MCP) server, and a Node.js + Express backend to deliver context-aware answers grounded in your own documents and the web.

Key Features

•  End-to-end Document Q&A
◦  Upload documents and ask natural language questions.
◦  Answers are grounded in retrieved document chunks plus live web search when needed.
•  RAG Pipeline
◦  Uses a Retrieval-Augmented Generation setup built on LangChain and a GPT-5-compatible LLM API.
◦  Semantic chunking, embedding-based retrieval, and context construction for each query.
•  Hybrid Search (RAG + Web)
◦  Combines local document retrieval results with web search via an MCP (Model Context Protocol) server.
◦  Integrates results from the Google Search API for fresher, broader context.
•  Voice-Enabled Interaction
◦  Speech input using react-speech-recognition.
◦  Speech output using speak-tts.
◦  Enables hands-free, conversational Q&A experience in the browser.
•  Full-Stack Architecture
◦  Frontend: React + TypeScript (Create React App), Ant Design UI, Axios for API calls.
◦  Backend: Node.js + Express server for document ingestion, query handling, and orchestration of LLM, RAG, and MCP calls.
◦  Designed for deployment on Google Cloud (GCE / Cloud Run / App Engine, etc.).



Tech Stack

Frontend

•  React 18 (Create React App)
•  TypeScript (if enabled in project configuration)
•  Ant Design (antd)
•  Axios
•  react-speech-recognition (speech-to-text)
•  speak-tts (text-to-speech)

Backend

•  Node.js + Express
•  LangChain (RAG pipeline)
•  LLM API (GPT-5-compatible endpoint)
•  MCP server for tool calling / web search
•  Google Search API integration
•  File upload handling for document ingestion (e.g., PDFs, text)



High-Level Architecture

1. User Interaction (Browser)
◦  User types or speaks a query.
◦  Optionally uploads one or more documents.
◦  Frontend calls backend REST endpoints to ingest documents and answer questions.
2. Document Ingestion (Backend)
◦  Backend receives files.
◦  Files are stored (local or remote store).
◦  Documents are chunked and embedded via LangChain.
◦  Metadata and embeddings are stored in a vector index (e.g., in-memory or external DB, depending on configuration).
3. Query Handling
◦  Frontend sends query (plus optional document filters) to the backend.
◦  Backend runs the RAG pipeline:
▪  Retrieve top-k relevant chunks from the vector index.
▪  Call MCP server to perform external web search using Google Search API.
▪  Combine document context + web snippets.
▪  Call LLM (GPT-5-compatible API) with combined context.
4. Response
◦  Backend returns structured answer payload:
▪  Final answer text.
▪  Optional citations / source snippets.
◦  Frontend renders the answer, with optional:
▪  Highlighted source excerpts.
▪  Text-to-speech playback via speak-tts.

Getting Started

The project consists of a React frontend (Create React App) at the repo root and an Express/Node backend in the server directory.

One-time setup
# From the repo root
cd /Users/yuxiao/Projects/Agent-AI

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install

# Go back to repo root
cd ..

Run the full app (frontend + backend)
# From the repo root
npm run dev

This will:
•  Start the React dev server on port 3000 (npm start)
•  Start the Express backend on port 5001 (npm run server → cd server && npm run start)

Run tests (frontend)

Create React App’s Jest-based test runner is wired to npm test.
# From the repo root
npm test             # interactive watch mode
npm test -- App.test # focus on tests matching "App.test"

Linting is handled by Create React App’s built-in ESLint configuration and surfaces during npm start and npm run build; there is no separate lint script defined.



