# Postcode Interactive

Postcode Interactive is a modern web application for searching, verifying, and visualizing location data using Elasticsearch and Google Maps.

## Features

- **Location Search:** Query and display location data using Elasticsearch.
- **Verification:** Validate and verify location information.
- **Interactive Map:** Visualize locations on Google Maps with markers.
- **GraphQL API:** Flexible data access via Apollo Server and GraphQL.
- **Responsive UI:** Built with Mantine and React for a seamless user experience.
- **Dockerized Services:** Easy setup for Elasticsearch and Kibana using Docker Compose.

## Tech Stack

- **Frontend:** Next.js, React, Mantine UI, React Hook Form, Zustand
- **Backend:** Apollo Server, GraphQL, Elasticsearch
- **Mapping:** @vis.gl/react-google-maps
- **Validation:** Zod
- **Dev Tools:** ESLint, GraphQL Codegen, Docker Compose

## Getting Started

### Prerequisites

- Node.js >= 20
- Docker & Docker Compose

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/milanseries/postcode-interactive.git
   cd postcode-interactive
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env.local` file:

   ```env
   NEXT_API_ENDPOINT=
   NEXT_ELASTIC_SEARCH_CLIENT_NODE=
   NEXT_GRAPHQL_API_KEY=
   NEXT_MAP_API_KEY=
   NEXT_GRAPHQL_URL=
   NEXT_ELASTIC_API_KEY=
   ```

4. **Start Elasticsearch & Kibana:**

   ```bash
   docker-compose up -d
   ```

5. **Run the development server:**

   ```bash
   npm run dev
   ```

6. **Access the app:**

   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Kibana: [http://localhost:5601](http://localhost:5601)
   - Elasticsearch: [http://localhost:9200](http://localhost:9200)

## Project Structure

```text
src/
  actions/           # Form actions
  app/               # Next.js app directory
  components/        # UI components (map, source, verifier)
  lib/
    elasticsearch/   # Elasticsearch client, configs, plugin
    graphql/         # GraphQL schema, resolvers, server
  services/          # API and GraphQL service logic
  store/             # Zustand store
  utils/             # Utility functions and providers
public/              # Static assets
docker-compose.yml   # Elasticsearch & Kibana setup
package.json         # Project metadata and scripts
README.md            # Project documentation
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
- `npm run generate` — Generate GraphQL types

## API & Data

- **GraphQL Endpoint:** `/api/graphql/route.ts`
- **Elasticsearch Index:** Configured in `src/lib/elasticsearch/elastic-index-configs.ts`

## License

This project is licensed under the MIT License.

## Author

Maintained by [milanseries](https://github.com/milanseries).
