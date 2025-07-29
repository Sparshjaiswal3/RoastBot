# 🤖 RoastBot


## Overview


RoastBot is an AI-powered app that generates personalized, witty roasts based on a user's name, interests, and (optionally) their selfie! Built with Expo (React Native) and powered by OpenRouter's large language models, RoastBot delivers laughs with a modern, mobile-friendly interface.


---


## 🚀 Features


- **Personalized Roasts:** Enter a name, interests, and (optionally) upload a selfie for a custom roast.
- **Roast Intensity:** Choose from mild, spicy, or savage roast levels.
- **Save & Share:** Save your favorite roasts and share them with friends.
- **Modern UI:** Clean, mobile-friendly interface using Expo and NativeWind.


---


## 📁 Project Structure


```
├── app/
│   ├── api/roast+api.ts           # API route for roast generation
│   └── (tabs)/                    # Main app screens
├── components/                    # UI components
├── context/                       # React contexts (theme, saved roasts)
├── hooks/                         # Custom React hooks
├── utils/                         # Utility functions and mock data
├── constants/                     # App-wide constants (e.g., colors)
├── assets/                        # Images and static assets
├── package.json                   # Project dependencies and scripts
├── app.json                       # Expo configuration
└── README.md                      # Project documentation
```


---


## 🛠️ Installation


1. **Clone the Repository**


   ```sh
   git clone https://github.com/yourusername/roastbot.git
   cd roastbot
   ```


2. **Install Dependencies**


   ```sh
   npm install
   ```


3. **Configure API Keys**


   - Create a `.env` file in the root directory.
   - Add your OpenRouter API key:
     ```
     OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     ```


---


## ▶️ How to Run the App


1. **Start the Expo Development Server**


   ```sh
   npx expo start
   ```


   This will open the Expo Developer Tools in your browser.


2. **Running on Your Device Using QR Code**


   - **Install the Expo Go app** on your mobile device:
     - [Expo Go for Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
     - [Expo Go for iOS](https://apps.apple.com/app/expo-go/id982107779)
   - **Start the project** (see above).
   - **Scan the QR code** displayed in your terminal or browser (Expo Dev Tools) using the Expo Go app.
     - On Android: Use the built-in QR scanner in Expo Go.
     - On iOS: Use the Camera app to scan the QR code, then tap the notification.
   - **The app will load on your device!**


---


## 🧑‍💻 Usage


1. **Open the app** on your device.
2. **Enter a name, interests, and select a roast intensity.**
3. *(Optional)* **Upload a selfie** (must be a public URL if using a vision model).
4. **Tap "Roast Me!"** to generate a personalized roast.
5. **Save or share** your favorite roasts.


---


## 📦 Dependencies


- expo
- react
- react-native
- nativewind
- (and others as listed in `package.json`)


Install all dependencies with:


```sh
npm install
```


---


## 📝 Notes


- **Image Input:**  
  Only public image URLs are supported for vision models. Local file paths (e.g., `file://...`) will not work with OpenRouter.
- **Model Availability:**  
  Not all OpenRouter models support image input. Check your [OpenRouter dashboard](https://openrouter.ai/) for available models.
- **Default Model:**  
  The backend uses a text-only model by default. To enable image-based roasts, use a vision-capable model and ensure your image URLs are public.


---


## 🤝 Contributing


Feel free to fork the repository and submit pull requests!


---



**Enjoy roasting responsibly!** 
