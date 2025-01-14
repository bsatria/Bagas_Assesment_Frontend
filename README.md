# Dashboard Management System

A modern React TypeScript application for managing packages with authentication, CRUD operations, and export capabilities.

## Features

### Authentication
- Secure login system with JWT token
- Protected routes and API endpoints
- Token stored in cookies for persistence
- Automatic redirect to login for unauthenticated users

### Dashboard Layout
- Clean and modern interface using Ant Design
- Responsive sidebar navigation
- Header with user profile dropdown
- Logout functionality with proper cleanup

### Package Management
- View all packages in a sortable and filterable table
- Create new packages with validation
- Edit existing package details
- Delete packages with confirmation
- Real-time updates using React Query

### Export Capabilities
- Export package data to PDF
- Professional PDF reports including:
  - Title and generation date
  - Formatted table with package details
  - Consistent styling and layout

## Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Ant Design (antd)
- **State Management**: React Query
- **HTTP Client**: Axios
- **PDF Generation**: jsPDF with AutoTable
- **Authentication**: JWT with Cookie storage
- **Routing**: React Router v6

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (version 16 or higher)
- npm (comes with Node.js)
- Git

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <project-name>
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Update the environment variables in `.env`
```env
VITE_API_BASE_URL=https://dev.patriotmed.id
```

## Running the Application

### Development Mode
```bash
npm run dev
```
This will start the development server at http://localhost:5173

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
src/
├── api/                 # API integration
│   ├── auth.ts         # Authentication API calls
│   ├── axios.ts        # Axios instance configuration
│   └── package.ts      # Package-related API calls
├── components/         # Reusable components
│   ├── Layout.tsx      # Main layout component
│   └── PrivateRoute.tsx # Route protection component
├── pages/             # Page components
│   ├── Home.tsx       # Main dashboard page
│   └── Login.tsx      # Login page
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── App.tsx            # Root component
```

## API Endpoints

### Authentication
- `POST /dashboard-user/LoginDashboard`
  - Login endpoint
  - Payload: `{ username: string, password: string }`
  - Returns: JWT token and user data

### Package Management
- `GET /BannerAds/Package/List`
  - Get all packages
- `POST /BannerAds/Package/Insert`
  - Create new package
- `PUT /BannerAds/Package/Update/{id}`
  - Update existing package
- `DELETE /BannerAds/Package/Delete/{id}`
  - Delete package

## Usage

1. Login using your credentials
   - Username: "admin"
   - Password: "12qwaszx"

2. Navigate through the dashboard using the sidebar

3. Manage Packages:
   - Click "Add Package" to create a new package
   - Use the table to view all packages
   - Use edit/delete buttons for each row
   - Export data using the PDF button

4. Logout:
   - Click your profile name in the header
   - Select "Logout" from the dropdown

## Error Handling

The application includes comprehensive error handling:
- Form validation for all inputs
- API error messages
- Loading states for all operations
- Protected routes for unauthorized access
- Automatic token handling

## Development Notes

### Adding New Features
1. Create necessary API endpoints in `/api`
2. Add TypeScript interfaces in `/types`
3. Create components in `/components`
4. Update routes in `App.tsx`

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement error boundaries where necessary
- Use React Query for server state management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Support

For support, email your support team or create an issue in the repository.