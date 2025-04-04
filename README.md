# Sanrakshika - Wildlife Conservation Platform

Sanrakshika is a comprehensive wildlife conservation platform that helps monitor, protect, and preserve India's diverse wildlife through advanced technology and dedicated efforts.

## Features

- **Real-time Monitoring**: Track wildlife movements and behaviors using advanced sensors and AI technology
- **Cryopreservation**: Manage and monitor genetic material storage for endangered species
- **Emergency Response**: Quick response system for wildlife emergencies and rescue operations
- **Analytics Dashboard**: Comprehensive data visualization and analysis tools
- **Interactive Map**: Visual representation of species locations and habitats

## Tech Stack

- **Frontend**: React, Vite, Material-UI
- **Backend**: Firebase
- **Maps**: Google Maps API
- **Charts**: Recharts
- **Animations**: GSAP

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Maps API key
- Firebase project credentials

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Dev7478/sanrakshika.git
   cd sanrakshika
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
sanrakshika/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── contexts/      # React contexts
│   ├── assets/        # Static assets
│   ├── App.jsx        # Main App component
│   └── main.jsx       # Entry point
├── public/            # Public assets
├── index.html         # HTML template
├── vite.config.js     # Vite configuration
└── package.json       # Project dependencies
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the component library
- Google Maps for mapping functionality
- Firebase for backend services
- All contributors and supporters of wildlife conservation

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/sanrakshika](https://github.com/yourusername/sanrakshika)
