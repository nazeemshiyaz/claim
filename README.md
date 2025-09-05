# Record Monitor Report Web App

A comprehensive web application for generating record monitor report claims with user authentication and role-based access control.

## Features

- **User Authentication**: Secure login system with JWT tokens
- **Role-Based Access**: Separate interfaces for users and administrators
- **Blue Max Claims System**: Complete claims management with project setup, claim entry, and voucher generation
- **Clean Interface**: Modern, responsive design
- **Backend Server**: Node.js/Express server with authentication endpoints

## Project Structure

```
├── server.js                 # Main server file
├── package.json              # Dependencies and scripts
├── public/                   # Frontend files
│   ├── login.html           # Login page
│   ├── user-dashboard.html  # User dashboard
│   ├── admin-dashboard.html # Admin dashboard
│   └── claims-system.html   # Blue Max Claims system
└── index.html               # Original HTML file (integrated)
```

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Open your browser and go to `http://localhost:3000`
   - You'll be redirected to the login page

### Demo Credentials

**Admin User:**
- Username: `admin`
- Password: `password`

**Regular User:**
- Username: `user`
- Password: `password`

## User Roles

### Regular User
- Access to Blue Max Claims System
- Can create projects and submit claims
- Generate vouchers and reports
- View their own data

### Admin User
- All user privileges
- User management capabilities
- System administration tools
- Access to all reports and data
- Database management tools

## Blue Max Claims System

The integrated claims system includes:

- **Project Setup**: Configure project details, phases, and parameters
- **Claim Entry**: Submit various types of claims (transport, accommodation, food, etc.)
- **Automatic Calculations**: System calculates caps and remaining amounts
- **Voucher Generation**: Automatic voucher creation with approval status
- **Category-Specific Logic**: Different rules for different claim types

### Claim Categories
- MTF: Material Transport – Supplier → Factory
- MTG: Material Transport – Supplier → Godown  
- MTS: Material Transport – Godown → Site
- TA: Technician Accommodation
- TF: Technician Food
- ST: Supervisor Travel
- SA: Supervisor Accommodation
- SF: Supervisor Food
- LU: Loading / Unloading

## API Endpoints

- `POST /api/login` - User authentication
- `GET /api/user` - Get current user info
- `GET /api/admin` - Admin-only endpoint
- `GET /dashboard` - Role-based dashboard redirect

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control
- Token expiration (24 hours)
- Secure session management

## Development Notes

- The original `index.html` functionality has been integrated into `claims-system.html`
- Authentication is required to access all features
- The system simulates database operations (can be extended with real database)
- All user data is stored in localStorage for session management

## Future Enhancements

- Database integration (MySQL/PostgreSQL)
- File upload handling
- Advanced reporting features
- Email notifications
- Audit logging
- User registration system
- Password reset functionality

## Troubleshooting

If you encounter issues:

1. Make sure Node.js is installed
2. Check that port 3000 is available
3. Verify all dependencies are installed with `npm install`
4. Check browser console for JavaScript errors
5. Ensure you're using the correct demo credentials

## License

MIT License - Feel free to modify and use for your projects.
