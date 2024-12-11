# Kestra Appointment Management System

This project implements an appointment management system with Kestra integration for automated email and calendar invites. The system allows users to create appointments through a web interface and automatically sends email notifications with calendar attachments.

## Project Structure

- `frontend/`: Web interface for creating and viewing appointments
  - `index.html`: Main application page
  - `js/app.js`: Frontend JavaScript code
- `backend/`: Node.js API server
  - `server.js`: Express.js server implementation
  - `package.json`: Node.js dependencies
- `kestra/`: Kestra workflow and configuration files
  - `flows/`: Kestra workflow definitions
  - `config.yml`: Kestra configuration
  - `requirements.txt`: Python dependencies for Kestra workflows

## Prerequisites

1. Node.js (v14 or later)
2. Python (v3.7 or later)
3. Java Runtime Environment (JRE) for Kestra
4. Kestra Server (v0.5 or later)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AbdullahAlNassan/kestra-appointments.git
cd kestra-appointments
```

2. Set up the backend:
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your Kestra webhook URL
```

3. Install Kestra Python requirements:
```bash
cd kestra
pip install -r requirements.txt
```

4. Configure Kestra:
Edit `kestra/config.yml` and update the email settings with your SMTP server details.

## Running the Application

1. Start Kestra server:
```bash
# Download Kestra from https://kestra.io/docs/installation
java -jar kestra-standalone.jar server
```

2. Start the backend server:
```bash
cd backend
npm run dev
```

3. Serve the frontend:
```bash
cd frontend
# You can use any static file server, for example:
python -m http.server 8000
```

4. Access the application at `http://localhost:8000`

## Configuration

### Backend Configuration (.env file)
- `PORT`: API server port (default: 3000)
- `KESTRA_WEBHOOK_URL`: Kestra webhook URL for triggering workflows

### Kestra Configuration (config.yml)
- Email settings:
  - SMTP server details
  - From address
  - Authentication credentials

## Usage

1. Open the web interface at `http://localhost:8000`
2. Fill out the appointment form with:
   - Title
   - Description
   - Date and Time
   - Duration
   - Email address
3. Submit the form
4. Check your email for the calendar invitation
5. Add the appointment to your calendar by opening the .ics attachment

## Development

- Frontend: The application uses plain JavaScript with Tailwind CSS for styling
- Backend: Express.js API with in-memory storage (can be extended to use a database)
- Kestra: Python workflow for generating calendar invites and sending emails

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request