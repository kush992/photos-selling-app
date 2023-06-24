import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { DB_URL, firebaseCredentials } from './constants';

const firebaseConfig = {
	apiKey: firebaseCredentials.API_KEY,
	authDomain: firebaseCredentials.AUTH_DOMAIN,
	projectId: firebaseCredentials.PROJECT_ID,
	storageBucket: firebaseCredentials.STORAGE_BUCKET,
	messagingSenderId: firebaseCredentials.MESSAGING_SENDER_ID,
	appId: firebaseCredentials.APP_ID,
	measurementId: firebaseCredentials.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app, DB_URL);
