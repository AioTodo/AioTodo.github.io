# Food Ordering Website

## Overview
This document outlines the core features and user flow of the food ordering website platform.

## Tech Stack:
- Frontend: React with TypeScript and Next.js
- Backend/Database: Supabase
- UI Framework: Tailwind CSS with shadcn/ui components
- State Management: React Context API

## Project Structure
```
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── menu/
│   ├── cart/
│   ├── profile/
│   └── orders/
├── components/
│   ├── ui/
│   ├── forms/
│   └── layout/
├── contexts/
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── lib/
│   └── supabase/
└── types/
```

## Application Flow

### 1. Authentication
- **Landing Page**
  - Modern, responsive welcome page
  - User authentication options (sign up/login)
  - Guest browsing capability

### 2. Main Dashboard
- Clean, grid-based layout
- Featured items carousel
- Category navigation sidebar
- Real-time menu availability

### 3. Search Features
- **Advanced Search Options**
  - Dynamic search bar with suggestions
  - Filter by:
    - Name
    - Category
    - Price range
    - Dietary restrictions
  - Sort by popularity/price/rating

### 4. Home Page Features
- Hero section with promotional content
- **Featured Sections**
  - Today's Specials
  - Most Popular Items
  - New Additions
- Category quick-access cards
- Real-time order tracking module

### 5. Order Processing
- **Cart Management**
  - Real-time cart updates
  - Quantity adjustments
  - Special instructions
- **Item Details**
  - High-resolution images
  - Detailed descriptions
  - Nutritional information
  - Customization options
  - Related items

### 6. Digital Wallet
- Secure online balance management
- **Features**
  - Transaction history
  - Auto-reload options
  - Balance notifications
  - Payment method management
- **Security**
  - Encrypted transactions
  - Two-factor authentication for large transactions

### 7. Advanced Ordering
- **Scheduling System**
  - Calendar-based ordering
  - Time slot selection
  - Recurring order setup
- **Location Management**
  - Multiple pickup locations
  - Saved favorites
  - Map integration

### 8. Payment Integration
- **Multiple Payment Options**
  - Website wallet
  - Credit/Debit cards
  - PayPal integration
  - Cash on pickup
- Secure payment processing
- Order summary review

### 9. Notification System
- **Web Notifications**
  - Browser notifications
  - Email updates
  - SMS options (optional)
- **Status Updates**
  - Order confirmation
  - Preparation status
  - Ready for pickup
  - Low balance alerts

### 10. User Dashboard
- **Profile Management**
  - Account settings
  - Order history
  - Saved preferences
  - Payment methods
  - Favorite items
- **Analytics**
  - Spending patterns
  - Favorite categories
  - Order frequency

## Database Schema

### Tables

1. **users**
   - id: uuid (PK)
   - email: string (unique)
   - password_hash: string
   - full_name: string
   - phone_number: string
   - created_at: timestamp
   - updated_at: timestamp

2. **wallet**
   - id: uuid (PK)
   - user_id: uuid (FK -> users.id)
   - balance: decimal
   - last_updated: timestamp

3. **categories**
   - id: uuid (PK)
   - name: string
   - description: string
   - image_url: string
   - slug: string (unique)

4. **meals**
   - id: uuid (PK)
   - category_id: uuid (FK -> categories.id)
   - name: string
   - description: string
   - price: decimal
   - image_url: string
   - ingredients: jsonb
   - nutritional_info: jsonb
   - is_available: boolean
   - rating: decimal
   - slug: string (unique)
   - created_at: timestamp

5. **orders**
   - id: uuid (PK)
   - user_id: uuid (FK -> users.id)
   - total_amount: decimal
   - status: enum ('pending', 'confirmed', 'ready', 'completed', 'cancelled')
   - pickup_time: timestamp
   - created_at: timestamp
   - payment_method: enum ('wallet', 'card', 'paypal', 'cash')
   - payment_status: enum ('pending', 'completed', 'failed')

6. **order_items**
   - id: uuid (PK)
   - order_id: uuid (FK -> orders.id)
   - meal_id: uuid (FK -> meals.id)
   - quantity: integer
   - unit_price: decimal
   - subtotal: decimal
   - special_instructions: text

7. **ratings**
   - id: uuid (PK)
   - user_id: uuid (FK -> users.id)
   - meal_id: uuid (FK -> meals.id)
   - rating: integer
   - comment: text
   - created_at: timestamp

8. **favorites**
   - id: uuid (PK)
   - user_id: uuid (FK -> users.id)
   - meal_id: uuid (FK -> meals.id)
   - created_at: timestamp

## Developer Notes
This documentation provides a comprehensive overview of the website's features and structure. The design emphasizes responsive web design principles and progressive enhancement for optimal user experience across all devices.

Key Implementation Considerations:
- Implement proper SEO practices
- Ensure mobile-first responsive design
- Implement proper error handling and loading states
- Use appropriate caching strategies
- Implement proper security measures
- Follow accessibility guidelines
