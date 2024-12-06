# Staff Directory Mobile Application

## Overview
This Staff Directory is a mobile application developed for Red Opal Innovations (ROI) to manage employee contact information. The application allows users to view, add, and update staff contact details, supporting both phone and tablet devices in portrait and landscape orientations.

## System Requirements

### Development Environment
- Node.js (v14 or higher)
- npm (Node Package Manager)
- React Native CLI
- Android Studio with Android SDK
- Expo CLI

### Mobile Device Requirements
- Android device running Android 6.0 (API level 23) or higher

## Installation and Setup

### 1. Backend API Setup

First, set up the backend API server:

```bash
# Navigate to the API directory
cd api

# Install dependencies
npm install

# Start the API server
npm start
```

API server will run on http://localhost:3000 by default.

### 2. Mobile App Setup

```bash
# Navigate to the staff-directory folder
cd staff-directory

# Install dependencies
npm install

# If .env wasn't downloaded, create .env file with API configuration
touch .env
```

Add the following environment variables to your `.env` file:
```
API_URL=http://localhost:3000
ANDROID_API_URL=http://10.0.2.2:3000  # For Android emulator
```

### 3. Running the App

#### Development Mode
```bash
# Start the Expo development server
npx expo start
```

#### Building for Android
```bash
# Build Android APK
npx expo build:android
```

## Deployment Instructions

### Method 1: Installing via APK

1. Enable "Install from Unknown Sources" on your Android device:
   - Go to Settings > Security
   - Enable "Unknown Sources"

2. Transfer the generated APK file to your Android device

3. Locate the APK file on your device and tap to install

### Method 2: Running via Expo Go

1. Install Expo Go from the Google Play Store

2. Scan the QR code displayed after running `npx expo start`

3. The application will load in Expo Go

## App Features

- View complete staff directory
- Search staff by name or department
- View detailed staff information
- Add new staff members
- Update existing staff information
- Configurable text size for accessibility
- Portrait and landscape orientation support

## Version Information
- Current Version: 1.0.0
- Last Updated: December 2024
- Minimum Android Version: 6.0 (API 23)