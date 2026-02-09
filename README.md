# TrackMyAh 📊

> An enhanced task tracking application featuring GitHub-style activity heatmaps and intelligent task management

## Overview

TrackMyAh is a modern, feature-rich task tracking application built with Next.js 14 and React 18. It goes beyond traditional to-do lists by visualizing your productivity through an interactive GitHub-style contribution heatmap, helping you maintain consistency and track your accomplishments over time.

## ✨ Key Features

### 📅 GitHub-Style Activity Heatmap
- **Visual Progress Tracking**: Calendar view with color-coded intensity based on completed tasks per day
- **Year-at-a-Glance**: See your entire year's productivity patterns at once
- **Interactive Cells**: Hover over any day to see task details and completion counts
- **Gradient Intensity**: 10-level color gradient (green-50 to green-950) representing activity levels

### 🎯 Multiple View Modes
- **Calendar View**: Month-by-month heatmap visualization for pattern recognition
- **List View**: Sortable and searchable task list with grouping by date
- **Regular Tasks Manager**: Create and manage recurring tasks (daily, weekly, monthly)

### 🔄 Smart Task Management
- **One-Time Tasks**: Quick task entries for specific dates
- **Regular Tasks**: Set up recurring tasks with customizable frequency
- **Task Completion Tracking**: Mark regular tasks as complete on any given day
- **Rich Task Details**: Add titles, descriptions, and dates for comprehensive tracking

### 🎨 Modern UI/UX
- **Responsive Design**: Seamless experience across desktop and mobile devices
- **Dark/Light Theme Support**: Built-in theme switching with next-themes
- **Smooth Interactions**: Polished animations and transitions using Tailwind CSS
- **Accessible Components**: Radix UI primitives for WCAG-compliant interfaces

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 14**: App Router with React Server Components
- **React 18**: Latest React features including hooks and concurrent rendering
- **TypeScript**: Full type safety for robust development

### UI Libraries & Styling
- **Tailwind CSS**: Utility-first CSS framework with custom configurations
- **Radix UI**: Unstyled, accessible component primitives (30+ components)
- **Lucide React**: Beautiful, consistent icon library
- **shadcn/ui**: Re-usable component patterns built on Radix UI
- **class-variance-authority (CVA)**: Type-safe variant management
- **tailwindcss-animate**: Smooth, performant animations

### Form Management & Validation
- **React Hook Form**: Performant, flexible form validation
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Seamless integration between RHF and Zod

### Data Visualization
- **Recharts**: Composable charting library for React
- **date-fns**: Modern date utility library for parsing and formatting

### Additional Features
- **next-auth**: Authentication solution for Next.js
- **Sonner**: Toast notifications with elegant UI
- **React Day Picker**: Flexible date picker component
- **React Resizable Panels**: Split-view layouts with draggable dividers

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/NahinNilav/TrackMyAh.git
cd TrackMyAh

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
TrackMyAh/
├── app/                      # Next.js 14 App Router
│   ├── dashboard/           # Main dashboard with tabs
│   │   ├── list/           # List view route
│   │   └── page.tsx        # Calendar & regular tasks
│   ├── signup/             # User registration
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Landing/login page
├── components/              # React components
│   ├── ui/                 # Reusable UI primitives (shadcn/ui)
│   ├── calendar-view.tsx   # GitHub-style heatmap
│   ├── list-view.tsx       # Sortable task list
│   ├── regular-tasks-manager.tsx
│   ├── task-dialog.tsx     # Task creation modal
│   └── theme-provider.tsx  # Dark mode support
├── lib/                     # Utilities and types
│   ├── types.ts            # TypeScript interfaces
│   ├── utils.ts            # Helper functions
│   └── auth.ts             # Authentication logic
├── hooks/                   # Custom React hooks
├── styles/                  # Global styles
└── public/                  # Static assets
```

## 🎓 Technical Highlights

### Advanced React Patterns
- **Custom Hooks**: Reusable logic for state management and side effects
- **Component Composition**: Modular architecture with clear separation of concerns
- **Server & Client Components**: Strategic use of RSC for optimal performance
- **TypeScript Integration**: Comprehensive type definitions for all components

### State Management
- **Local Storage Persistence**: Client-side data persistence
- **React Hooks**: useState, useEffect, useMemo, useRef for efficient state handling
- **Prop Drilling Prevention**: Context API integration where appropriate

### Performance Optimizations
- **Lazy Loading**: Dynamic imports for code splitting
- **Memoization**: useMemo for expensive computations
- **Efficient Re-renders**: Strategic component optimization
- **Next.js Image Optimization**: Automatic image optimization

## 🌟 Design Decisions

1. **Heatmap Visualization**: Inspired by GitHub's contribution graph to gamify productivity
2. **Multiple Views**: Different perspectives (calendar, list, recurring) for various use cases
3. **Regular Tasks**: Addresses the common need for habit tracking and recurring responsibilities
4. **Type Safety**: TypeScript throughout for maintainable, error-free code
5. **Component Library**: Radix UI + shadcn/ui for consistent, accessible components

## 📝 License

This project is built for portfolio and educational purposes.

---

**Built with ❤️ using Next.js 14, React 18, and TypeScript**
