# Virmer Next.js Frontend

Modern e-commerce platform for CNC machines, laser and router equipment.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **API Integration:** [Strapi CMS](https://strapi.io/)
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/)
<!-- - **State Management:** React Hooks -->

## Key Libraries

### UI Components
- `@radix-ui/*` - Headless UI components
- `class-variance-authority` - Component variant management
- `tailwind-merge` - Tailwind class merging
- `lucide-react` - Icon library
- `sonner` - Toast notifications
- `vaul` - Drawer component

### Carousel
- `embla-carousel-react` - Core carousel functionality
- `embla-carousel-autoplay` - Autoplay feature
- `embla-carousel-fade` - Fade transitions

### Forms and Validation
- `@hookform/resolvers` - Form validation resolvers
- `react-hook-form` - Form state management
- `react-phone-number-input` - Phone input component
- `zod` - Schema validation

### Internationalization
- `next-intl` - Internationalization support
- `@formatjs/intl-localematcher` - Locale matching
<!-- - `negotiator` - Content negotiation -->

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Learn More

To learn more about the core technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)