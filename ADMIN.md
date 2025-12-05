# Admin Panel Guide

## Overview

The admin panel provides comprehensive control over the entire platform with the following features:

## Features

### 1. Dashboard (`/admin`)
- **Platform Statistics**: Total users, active subscriptions, monthly revenue, content generated
- **Recent Users**: Latest user registrations
- **Quick Actions**: Direct links to key management pages
- **System Health**: Status of database, AI service, and payment gateway

### 2. User Management (`/admin/users`)
- View all registered users
- See user subscription status
- View user roles (admin/user)
- Track registration dates
- Quick access to user details

### 3. Subscription Management (`/admin/subscriptions`)
- View all subscriptions with detailed information
- Track active vs inactive subscriptions
- Monitor monthly recurring revenue (MRR)
- See subscription periods and renewal dates
- Manage individual subscriptions

### 4. Content Moderation (`/admin/content`)
- Review all generated content
- Filter by content type (website, social, ads, email)
- See content statistics by type
- View user and brand information for each content piece
- Moderate and manage content

### 5. System Settings (`/admin/settings`)
- **General Settings**:
  - Enable/disable maintenance mode
  - Control new user signups
  - Set free trial duration
  - Configure default subscription plan
  
- **API Configuration**:
  - Monitor Google Gemini AI status
  - Check Paystack integration
  - Verify Supabase connection
  
- **Danger Zone**:
  - Clear all content (destructive)
  - Reset subscriptions (destructive)

## Access Control

### Creating an Admin User

1. **Run the admin SQL additions**:
   ```sql
   -- In Supabase SQL Editor, run:
   -- supabase-admin-additions.sql
   ```

2. **Create admin account**:
   - The SQL script adds a `role` column to users
   - You need to manually create an admin user with a hashed password
   - Use bcrypt to hash your password

3. **Hash your password** (Node.js):
   ```javascript
   const bcrypt = require('bcryptjs');
   const password = 'your-secure-password';
   const hash = bcrypt.hashSync(password, 10);
   console.log(hash);
   ```

4. **Insert admin user** in Supabase SQL Editor:
   ```sql
   INSERT INTO users (email, password, name, role) VALUES 
   ('admin@yourdomain.com', 'your-bcrypt-hash-here', 'Admin User', 'admin');
   ```

## Security Features

- **Role-Based Access**: Only users with `role = 'admin'` can access admin panel
- **Automatic Redirects**: Non-admin users are redirected to dashboard
- **Activity Logging**: Track all admin actions (table created, needs implementation)
- **Separate Route Group**: Admin panel isolated from main app

## Navigation

Admin panel has its own navigation bar with:
- Dashboard
- Users
- Subscriptions
- Content
- Settings
- Back to App link

## Accessing the Admin Panel

1. Create an admin user (see above)
2. Log in with admin credentials
3. Navigate to `/admin`
4. You'll see the admin dashboard

## Future Enhancements

- [ ] Implement activity logging for all admin actions
- [ ] Add bulk user management (ban, delete, etc.)
- [ ] Create detailed analytics and reports
- [ ] Add email notification system
- [ ] Implement content approval workflow
- [ ] Add subscription plan management (create/edit plans)
- [ ] Create backup and restore functionality
- [ ] Add API usage monitoring
- [ ] Implement rate limiting controls

## Important Notes

⚠️ **Security**: 
- Always use strong passwords for admin accounts
- Never share admin credentials
- Regularly review admin activity logs
- Keep the number of admin users minimal

⚠️ **Danger Zone Actions**:
- Actions in the danger zone are irreversible
- Always backup data before performing destructive actions
- Consider adding confirmation dialogs for these actions
