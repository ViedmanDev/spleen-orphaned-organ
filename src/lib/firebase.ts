import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef'
};

// Verificar si estamos en desarrollo sin configuración
const isDemo = firebaseConfig.apiKey === 'demo-api-key';

if (isDemo) {
    console.warn('⚠️  Usando configuración demo de Firebase. Configura las variables de entorno para producción.');
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Configurar proveedor de Google
export const googleProvider = new GoogleAuthProvider();
// Removida restricción de dominio para permitir cualquier cuenta Google
googleProvider.setCustomParameters({
  prompt: 'select_account' // Permitir selección de cuenta
});

export { isDemo };
