import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { provideHttpClient } from '@angular/common/http';
// Import the functions you need from the SDKs you need
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbSotFN0k_XP1fy-v9d2DhkkIe5QeCchk",
  authDomain: "cafemenu-fa2d4.firebaseapp.com",
  projectId: "cafemenu-fa2d4",
  storageBucket: "cafemenu-fa2d4.firebasestorage.app",
  messagingSenderId: "342607670078",
  appId: "1:342607670078:web:6e21efbd7750b7815b5a6f",
  measurementId: "G-CLFPKPKP65"
};

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
  ],
};

