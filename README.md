# IGHOST Edutainment

A modern Next.js site for IGHOST Edutainment, featuring:
- Home, Events, Shop, Ambassadors, About, Contact, Gallery, FAQ, Testimonials
- Firebase integration for event registration
- South Africa payment options (EFT, PayFast, Ozow, Yoco)
- TailwindCSS for beautiful styling
- Animated gradient backgrounds
- Custom components: EventCard, ProductCard, AmbassadorForm

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your local env file and fill in your keys:
   ```bash
   cp .env.example .env.local
   ```
   Add your Firebase values, South Africa payment variables, and `NEXT_PUBLIC_ADMIN_ACCESS_CODE` in `.env.local`.
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Features
- Dynamic event registration (Firebase)
- Shop cart and checkout with South Africa methods (EFT, PayFast, Ozow, Yoco)
- No-code admin content manager for events and products
- Ambassador application form
- Responsive, modern UI
- Animated backgrounds
- Social links and contact form

## Folder Structure
- `src/app/` — Pages
- `src/components/` — UI components
- `src/utils/` — Utility files (Firebase, EFT reference generation)

## No-Code Content Management
Use `/admin` to manage website content without coding.

### What can be managed
- Events displayed on `/events`
- Products displayed on `/shop`

### How it works
1. Open `/admin`
2. Enter `NEXT_PUBLIC_ADMIN_ACCESS_CODE` (if configured)
3. Use the Events or Products tab
4. Create, edit, or delete entries
5. Changes appear automatically on public pages

### Firestore collections used
- `events`
   - `title` (string)
   - `date` (string, `YYYY-MM-DD`)
   - `location` (string)
   - `description` (string)
   - `stream` (string)
   - `format` (string)
   - `seatsLeft` (number)
   - `createdAt` (timestamp)
   - `updatedAt` (timestamp)

- `products`
   - `name` (string)
   - `image` (string URL or `/public` path)
   - `price` (number)
   - `sizes` (string[])
   - `category` (string)
   - `edition` (string)
   - `createdAt` (timestamp)
   - `updatedAt` (timestamp)

### Important setup note
Firestore security rules should restrict write access to trusted admins only before going live.

## Customization
- Update content in page files
- Add images to `public/`
- Extend components as needed

## License
MIT
