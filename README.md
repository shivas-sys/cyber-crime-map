# Crime Hotspot Mapping & Behavioral Analysis

A comprehensive web-based system for crime hotspot mapping and behavioral analysis with interactive visualization tools and advanced analytics.

## Features

- 🗺️ **Interactive Crime Map**: Visualize crime data with different view types (heatmap, clusters, individual markers)
- 📊 **Statistical Analysis**: Analyze crime patterns and trends across different areas
- 🧠 **Behavioral Analysis**: Identify patterns and potential criminal behaviors
- 📁 **Data Management**: Import and manage crime data sets
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Deployment Options

This application can be deployed in two ways:

### 1. Full-Stack Deployment (with Database)

This option deploys the complete application with the backend server and PostgreSQL database.

**Requirements:**
- Node.js (v18 or later)
- PostgreSQL database

**Setup:**
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   ```
   DATABASE_URL=postgres://user:password@localhost:5432/crimedata
   ```
4. Run database migrations: `npm run db:push`
5. Start the application: `npm run dev`

### 2. Static Deployment (Client-Only)

This option creates a static version of the application that can be hosted on any static web hosting service without requiring a backend server.

**Static Build:**
1. Run the static build script: `./build-static.sh`
2. The static files will be generated in the `dist/public` directory

**Hosting Options:**
- **Netlify**: The repository includes a `netlify.toml` configuration file for easy deployment
  - Just connect your GitHub repository to Netlify, and it will automatically build and deploy
- **Vercel**: Deploy directly from GitHub
- **GitHub Pages**: Upload the generated files to your GitHub Pages branch
- **Any Static Hosting**: Upload the contents of the `dist/public` directory to any static web host

## Development

- **Development Mode**: `npm run dev`
- **Production Build**: `npm run build`
- **Static Build**: `./build-static.sh`

## Technologies

- React
- TypeScript
- Leaflet Maps
- TanStack Query
- PostgreSQL with Drizzle ORM
- Express
- Tailwind CSS with shadcn/ui

## License

MIT