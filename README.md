# Heartistry - English Learning Web Application

![Repo Size](https://img.shields.io/github/repo-size/votranphi/heartistry)
![Last Commit](https://img.shields.io/github/last-commit/votranphi/heartistry)
![Open Issues](https://img.shields.io/github/issues/votranphi/heartistry)
![Vercel Badge](https://deploy-badge.vercel.app/vercel/deploy-badge)
![License](https://img.shields.io/github/license/votranphi/heartistry)

![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.10-blueviolet)
![ESLint](https://img.shields.io/badge/ESLint-9.13.0-yellowgreen)
![Recharts](https://img.shields.io/badge/Recharts-2.15.0-orange)

![GitHub Stars](https://img.shields.io/github/stars/votranphi/heartistry)
![GitHub Forks](https://img.shields.io/github/forks/votranphi/heartistry)

Heartistry is a React and Vite-based web application designed to help users learn English vocabulary efficiently through Flashcards. Users can create their own vocabulary sets (Wordsets) or use suggested sets to study and memorize words in a fun and interactive way.

## Features

### 1. User Authentication
- **Register, Login, and Logout**: Users can create an account, log in, and log out securely.
- **Session Authentication**: User sessions are verified with JSON Web Tokens (JWT).
- **Email Verification**: Verify email using a One-Time Password (OTP) for enhanced security.

### 2. Home Interface
- **Quick Access**: Quickly navigate to your personal Wordsets from the Home page.

### 3. Flashcard Learning
- **Personalized Flashcards**: 
  - Add, delete, and edit words in your personal Wordsets.
  - Create new Wordsets based on specific topics.
- **Suggested Wordsets**: Add system-suggested Wordsets to your personal collection.
- **Interactive Learning**: Study words using Flashcards that display:
  - The English word on the front.
  - Additional information (pronunciation, definition, examples) on the back.

## Related Projects

Heartistry consists of multiple services. Here are the related repositories:

- [Heartistry Frontend (this repo)](https://github.com/votranphi/heartistry): The web-based user interface, built with React and Vite.
- [Heartistry Backend User/Auth API](https://github.com/votranphi/heartistry-user-api): The backend API built with NestJS that handles authentication, email verification, and user management.
- [Heartistry Backend Task API](https://github.com/votranphi/heartistry-task-api): A Spring Boot service that manages tasks and metrics.

These services work together to provide a seamless learning experience.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn (package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/votranphi/heartistry.git
   cd heartistry
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open the app in your browser:
   ```
   http://localhost:5173
   ```

### Environment Variables
Create a `.env` file in the root directory and include the following variables:
```env
# API base urls
VITE_USER_API_BASE_URL=http://<user-service-ip>:<user-service-port>
VITE_TASK_API_BASE_URL=http://<task-service-ip>:<task-service-port>
VITE_TOKEN_EXPIRE_TIME=24

# Cloudinary secrets
VITE_CLOUD_NAME=<cloud-name>
VITE_UPLOAD_PRESET=<unsigned-upload-preset-name>

# Google cloud storage API secrets
VITE_API_TOKEN=<token>
VITE_STORAGE_BUCKET=<bucket-name>

# Default password account created by admin
VITE_DEFAULT_PASSWORD=<default-password>
```

## Contributing

We welcome contributions! If you'd like to contribute to Heartistry, follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## Acknowledgements

Heartistry was developed to make learning English vocabulary more effective and enjoyable. Thank you for using Heartistry!

## License

This project is licensed under the [Apache License 2.0](LICENSE). See the `LICENSE` file for details.

## Credits
Contributors:
- Vo Tran Phi (Student ID: 22521081)  
Github link: [votranphi](https://github.com/votranphi) 
- Le Duong Minh Phuc (Student ID: 22521116)  
Github link: [minhphuc2544](https://github.com/minhphuc2544)