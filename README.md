# PropBet

PropBet is a modern web application for sports betting enthusiasts, focusing on NBA player props. Built with React, TypeScript, and Firebase, it offers a seamless and engaging betting experience with real-time updates and unique betting mechanics.

## Live Demo

Visit the live application at: [PropBet](https://prop-bet.netlify.app/)

## Features

### Core Betting Features
- 🎯 **Power Play System**
  - 2-6 picks with higher multipliers
  - All picks must hit to win
  - Multipliers up to 37.5x

- 💪 **Flex Play System**
  - 3-6 picks with partial win payouts
  - Get paid even if you miss 1-2 picks
  - Multipliers up to 25x for all correct

### User Experience
- 🏀 Real-time NBA player props with live odds
- 📊 Dynamic leaderboard system
- 👤 User authentication and profiles
- 💰 Virtual currency system
- 📱 Responsive design for all devices
- 🔄 Real-time updates

### Admin Features
- 🎮 Comprehensive admin dashboard
- 📈 User management system
- 🎲 Props management interface
- 💼 Bet status management
- 🔄 Automated props refresh system

## Technology Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for build tooling

### Backend & Services
- Firebase Authentication
- Firebase Realtime Database
- The Odds API integration

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- The Odds API key

### Environment Setup
Create a `.env` file in the root directory with:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_ODDS_API_KEY=your_odds_api_key
VITE_ADMIN_EMAIL=admin_email
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/propbet.git
cd propbet
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/         # React components
│   ├── BetSlip.tsx    # Betting interface
│   ├── Leaderboard.tsx# User rankings
│   ├── LoginPage.tsx  # Authentication
│   ├── Navbar.tsx     # Navigation
│   ├── Profile.tsx    # User profile
│   ├── PropCard.tsx   # Prop display
│   └── PropTabs.tsx   # Prop filtering
├── contexts/          # React contexts
│   └── AuthContext.tsx# Authentication state
├── lib/              # Utilities
│   ├── database.ts   # Firebase operations
│   ├── firebase.ts   # Firebase config
│   ├── playerIds.ts  # NBA player IDs
│   ├── playerTeams.ts# Player team mappings
│   └── teamLogos.ts  # Team logo URLs
└── types.ts          # TypeScript definitions
```

## Betting System Details

### Power Play
| Picks | Multiplier |
|-------|------------|
| 2     | 3x         |
| 3     | 5x         |
| 4     | 10x        |
| 5     | 20x        |
| 6     | 37.5x      |

### Flex Play
| Picks | All Correct | 1 Miss | 2 Miss |
|-------|-------------|---------|---------|
| 3     | 2.25x      | 1.25x   | -       |
| 4     | 5x         | 1.5x    | -       |
| 5     | 10x        | 2x      | 0.4x    |
| 6     | 25x        | 2x      | 0.4x    |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- NBA data from The Odds API
- Team logos from NBA official resources
- Icons from Lucide React
