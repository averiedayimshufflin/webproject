# WEB103 Project 2 - *Glow Guide*

Submitted by: **Averie Ahn**

About this web app: **Glow Guide is a database-backed makeup lookbook web app that displays makeup styles for different aesthetics, occasions, and skill levels. Users can browse all looks, filter by category and difficulty, and open a detail page for each look with products, timing, occasion, and tips.**

Time spent: **7** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured database table for the list items**
  - [ ] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [ ] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command `SELECT * FROM makeup_looks;` to display your table contents.**

The following **optional** features are implemented:

- [x] The user can search for items by a specific attribute

The following **additional** features are implemented:

- [x] Added category and difficulty filters that are populated from the database
- [x] Added detail pages for every makeup look using database records
- [x] Added a database connection error page to help debug missing environment variables or schema setup
- [x] Added SQL files for creating and seeding the PostgreSQL table

## Database Setup

This app expects a PostgreSQL connection string in `DATABASE_URL`.

Use the Render PostgreSQL URLs this way:

- In your Render web service, set `DATABASE_URL` to the database's **Internal Database URL**.
- From your own computer, use the database's **External Database URL** or copy Render's full **PSQL Command** from the database page.

Render shows these values on the PostgreSQL database page under **Connect**.

If you are using PowerShell on Windows, set a temporary local database URL like this:

```powershell
$env:DATABASE_URL="paste-the-render-external-database-url-here"
$env:DB_SSL="true"
```

Create the table:

```powershell
psql $env:DATABASE_URL -f server/config/schema.sql
```

Seed the makeup looks:

```powershell
psql $env:DATABASE_URL -f server/config/seed.sql
```

Show the table contents for the walkthrough:

```powershell
psql $env:DATABASE_URL -c "SELECT * FROM makeup_looks;"
```

If `psql` is not installed, use the full PSQL command copied from Render's database page, then run these SQL commands inside that opened prompt:

```sql
\i server/config/schema.sql
\i server/config/seed.sql
SELECT * FROM makeup_looks;
```

If you connect from outside Render with an external database URL and SSL is required, add `?sslmode=require` to the end of the connection string or set `DB_SSL=true`.

If you are using Command Prompt instead of PowerShell, set the temporary values like this:

```cmd
set DATABASE_URL=paste-the-render-external-database-url-here
set DB_SSL=true
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Render Deployment

Use these Render web service settings:

- **Build command:** `npm install`
- **Start command:** `npm start`
- **Environment variable:** `DATABASE_URL` set to the Render PostgreSQL internal database URL

After deployment, run the schema and seed SQL against the Render database using the external URL or the copied PSQL command. Then restart the web service if needed.

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ScreenToGif

The walkthrough should show:

- The homepage loading makeup looks from the PostgreSQL table
- The category or difficulty search/filter working
- At least one detail page URL
- The Render dashboard showing the PostgreSQL database is available
- The `psql` command `SELECT * FROM makeup_looks;` displaying table contents

## Notes

The main challenge was moving the list data out of the JavaScript file and into a PostgreSQL table while keeping the original card and detail page experience. The backend now queries PostgreSQL for the homepage, filters, and detail pages, so the displayed data comes from the database instead of a hardcoded array.

## License

Copyright 2026 Averie Ahn

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
