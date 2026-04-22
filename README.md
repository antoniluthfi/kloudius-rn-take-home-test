# User Authentication App

A React Native application with complete Login and Signup functionality, built using React Context API for authentication state management, React Hook Form + Zod for form handling and schema validation, React Navigation for screen routing, and AsyncStorage for persistent sessions. The codebase follows an **MVVM (Model-View-ViewModel)** architecture for a clean separation of concerns.

---

## Features

- **Login** — Authenticate with email and password, with schema validation and credential error handling
- **Signup** — Register a new account with name, email, and password
- **Home Screen** — Displays the logged-in user's name and email with a logout button
- **Persistent Session** — Users remain logged in after closing and reopening the app (AsyncStorage)
- **Schema Validation** — Zod schemas power all form validation with inline error messages
- **Password Visibility Toggle** — Eye icon (react-native-vector-icons) to show/hide password input
- **MVVM Architecture** — Screens are pure Views; business logic lives in custom hooks (ViewModel); Zod schemas define the Model
- **Reusable UI Components** — Shared components (FormField, PasswordField, PrimaryButton, etc.) used across screens

---

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| React Native | 0.85.2 | Mobile framework |
| React | 19.2.3 | UI library |
| TypeScript | ^5.8 | Type safety |
| React Navigation | ^7.0 | Screen navigation |
| React Hook Form | ^7.0 | Form state management |
| Zod | ^4.0 | Schema validation |
| @hookform/resolvers | ^5.0 | Bridge between RHF and Zod |
| AsyncStorage | ^1.24 | Persistent session storage |
| React Native Vector Icons | ^10.0 | Icon library (Ionicons) |
| React Native Safe Area Context | ^5.0 | Safe area handling |
| React Native Screens | ^4.0 | Native navigation screens |

---

## Project Structure

```
src/
├── components/          # Reusable UI components (View layer)
│   ├── AlertBox.tsx        # Error banner
│   ├── Divider.tsx         # "or" separator
│   ├── FormField.tsx       # Label + Controller + error text
│   ├── PasswordField.tsx   # FormField with eye visibility toggle
│   ├── PrimaryButton.tsx   # Filled action button with loading state
│   └── SecondaryButton.tsx # Outlined navigation button
├── context/
│   └── AuthContext.tsx     # Global auth state (login, signup, logout, user)
├── hooks/               # Custom hooks / ViewModel layer
│   ├── useLoginForm.ts     # Login form logic + zodResolver
│   └── useSignupForm.ts    # Signup form logic + zodResolver
├── navigation/
│   └── AppNavigator.tsx    # Stack navigator — auth guard logic
├── schemas/             # Zod schemas / Model layer
│   ├── loginSchema.ts      # Login validation schema + LoginFormData type
│   └── signupSchema.ts     # Signup validation schema + SignupFormData type
└── screens/             # Screen components (pure View layer)
    ├── LoginScreen.tsx
    ├── SignupScreen.tsx
    └── HomeScreen.tsx
```

---

## Architecture

This project follows the **MVVM (Model-View-ViewModel)** pattern:

| Layer | Location | Responsibility |
|---|---|---|
| **Model** | `src/schemas/` | Zod schemas that define data shape and validation rules. Types are auto-inferred via `z.infer<>`. |
| **ViewModel** | `src/hooks/` | Custom hooks that own form state, call AuthContext, and handle errors. Screens know nothing about this logic. |
| **View** | `src/screens/` | Pure UI — renders components and passes data from the ViewModel hook. No business logic. |
| **Shared View** | `src/components/` | Reusable UI building blocks used across screens. |

### Data flow

```
Zod Schema  ──(zodResolver)──▶  useForm (RHF)  ──▶  Custom Hook  ──▶  Screen
  (Model)                        (validation)      (ViewModel)       (View)
```

---

## Prerequisites

Make sure your development environment is set up for React Native:

- [Node.js](https://nodejs.org/) **>= 22** (older versions will throw a `util.styleText is not a function` error)
- [React Native CLI environment](https://reactnative.dev/docs/set-up-your-environment)
- **Android:** Android Studio + Android SDK
- **iOS (macOS only):** Xcode + CocoaPods (`gem install cocoapods`)

> **Tip — switching Node version with nvm:**
> ```sh
> nvm install 22
> nvm use 22
> nvm alias default 22  # make v22 the default for new terminals
> ```

---

## Setup & Installation

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd UserAuthenticationApp
```

### 2. Install dependencies

```sh
npm install
```

### 3. iOS only — install CocoaPods

```sh
npm run pods
```

---

## Running the App

### Start Metro bundler

```sh
npm start
```

> Use `npm run start:reset` to start with a clean cache if you encounter module resolution issues.

### Android

```sh
npm run android
```

### iOS

```sh
npm run ios
```

---

## Build for Production

### Android — debug APK

```sh
npm run android:build
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

### Android — release mode on device

```sh
npm run android:release
```

### Android — JS bundle only

```sh
npm run android:bundle
```

### iOS — release configuration

```sh
npm run ios:release
```

---

## Other Useful Scripts

| Script | Description |
|---|---|
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run format` | Format `src/` files with Prettier |
| `npm run clean` | Clean build cache and artifacts |
| `npm test` | Run Jest unit tests |

---

## Authentication Flow

1. **First launch** — User lands on the Login screen
2. **No account?** — Navigate to Signup, fill in Name / Email / Password (min. 6 chars), tap Signup
3. **Login** — Enter registered email and password, tap Login
4. **Home** — User info is displayed; tap Logout to end the session
5. **Reopen app** — Session is restored automatically from AsyncStorage

### Validation Rules

All rules are defined in Zod schemas (`src/schemas/`) and enforced automatically via `zodResolver`.

| Field | Schema | Rules |
|---|---|---|
| Email | `loginSchema`, `signupSchema` | Required, valid email format |
| Password | `loginSchema` | Required |
| Password | `signupSchema` | Required, minimum 6 characters |
| Name | `signupSchema` | Required |

---

## Demo Video

https://github.com/user-attachments/assets/fb79dc46-e90e-400c-ba1c-f3e0c214852e

> If the video does not play inline, [download demo.mp4](assets/videos/demo.mp4).

---

## Screenshots

### Login Screen

<table>
  <tr>
    <td align="center"><b>Empty Form</b></td>
    <td align="center"><b>Validation Error</b></td>
    <td align="center"><b>Incorrect Credentials</b></td>
  </tr>
  <tr>
    <td><img src="assets/screenshots/login-empty.jpeg" width="220"/></td>
    <td><img src="assets/screenshots/login-error-validation.jpeg" width="220"/></td>
    <td><img src="assets/screenshots/login-error-incorrect-credentials.jpeg" width="220"/></td>
  </tr>
  <tr>
    <td align="center"><b>Password Hidden</b></td>
    <td align="center"><b>Password Visible</b></td>
    <td></td>
  </tr>
  <tr>
    <td><img src="assets/screenshots/login-password-hidden.jpeg" width="220"/></td>
    <td><img src="assets/screenshots/login-password-visible.jpeg" width="220"/></td>
    <td></td>
  </tr>
</table>

### Signup Screen

<table>
  <tr>
    <td align="center"><b>Empty Form</b></td>
    <td align="center"><b>Validation Error</b></td>
    <td align="center"><b>Email Already Registered</b></td>
  </tr>
  <tr>
    <td><img src="assets/screenshots/signup-empty.jpeg" width="220"/></td>
    <td><img src="assets/screenshots/signup-error-validation.jpeg" width="220"/></td>
    <td><img src="assets/screenshots/signup-error-email-already-registered.jpeg" width="220"/></td>
  </tr>
  <tr>
    <td align="center"><b>Password Hidden</b></td>
    <td align="center"><b>Password Visible</b></td>
    <td></td>
  </tr>
  <tr>
    <td><img src="assets/screenshots/signup-password-hidden.jpeg" width="220"/></td>
    <td><img src="assets/screenshots/signup-password-visible.jpeg" width="220"/></td>
    <td></td>
  </tr>
</table>

### Home Screen

<table>
  <tr>
    <td align="center"><b>Success Login</b></td>
  </tr>
  <tr>
    <td><img src="assets/screenshots/home-success-login.jpeg" width="220"/></td>
  </tr>
</table>

---

## License

This project is for educational purposes.
