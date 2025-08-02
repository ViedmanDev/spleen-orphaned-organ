import React, { useState, useEffect } from 'react';
import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider, isDemo } from '../../lib/firebase';

interface AuthProps {
    onAuth: (userId: string, userName: string, userEmail: string) => void;
}

export function SimpleAuth({ onAuth }: AuthProps) {
    const [loading, setLoading] = useState(false);

    // Verificar resultado de redirect al cargar el componente
    useEffect(() => {
        const checkRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result && result.user) {
                    const userId = result.user.uid;
                    const userName = result.user.displayName || 'Usuario';
                    const userEmail = result.user.email || '';
                    
                    console.log('✅ Autenticación exitosa via redirect:', userEmail);
                    onAuth(userId, userName, userEmail);
                }
            } catch (error) {
                console.error('Error al verificar redirect:', error);
            }
        };

        checkRedirectResult();
    }, [onAuth]);

    const handleGoogleAuth = async () => {
        setLoading(true);
        try {
            if (isDemo) {
                // Modo demo - simular autenticación con cualquier email
                const userId = `demo_${Date.now()}`;
                const userName = 'Usuario Demo';
                const userEmail = 'demo@gmail.com';
                console.log('🔧 Modo demo: Simulando autenticación Google');
                setTimeout(() => {
                    onAuth(userId, userName, userEmail);
                    setLoading(false);
                }, 1500);
            } else {
                // Intentar primero con popup, si falla usar redirect
                try {
                    console.log('🔄 Intentando autenticación con popup...');
                    const result = await signInWithPopup(auth, googleProvider);
                    const user = result.user;
                    
                    if (!user.email) {
                        throw new Error('No se pudo obtener la información del usuario');
                    }
                    
                    const userId = user.uid;
                    const userName = user.displayName || 'Usuario';
                    const userEmail = user.email;
                    
                    console.log('✅ Autenticación exitosa con popup:', userEmail);
                    onAuth(userId, userName, userEmail);
                    setLoading(false);
                    
                } catch (popupError: any) {
                    console.warn('⚠️ Popup falló, usando redirect:', popupError.code);
                    
                    // Si el popup falla por CORS o popup bloqueado, usar redirect
                    if (popupError.code === 'auth/popup-blocked' || 
                        popupError.code === 'auth/popup-closed-by-user' ||
                        popupError.message.includes('Cross-Origin-Opener-Policy')) {
                        
                        console.log('🔄 Cambiando a autenticación con redirect...');
                        await signInWithRedirect(auth, googleProvider);
                        // El redirect manejará el loading automáticamente
                        
                    } else {
                        throw popupError; // Re-lanzar otros errores
                    }
                }
            }
        } catch (error: any) {
            console.error('Error en autenticación:', error);
            
            if (error.code === 'auth/popup-closed-by-user') {
                alert('⚠️ Ventana de autenticación cerrada');
            } else if (error.code === 'auth/popup-blocked') {
                alert('⚠️ Popup bloqueado. Redirigiendo...');
            } else {
                alert('Error al iniciar sesión con Google: ' + (error.message || 'Error desconocido'));
            }
            setLoading(false);
        }
    };    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '40px',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
                maxWidth: '400px',
                width: '90%'
            }}>
                <h1 style={{ marginBottom: '20px', fontSize: '28px' }}>
                    🧠 Quiz del Bazo
                </h1>
                <p style={{ marginBottom: '30px', opacity: 0.9 }}>
                    Inicia sesión con tu cuenta de Google para acceder al quiz interactivo
                </p>

                <button
                    onClick={handleGoogleAuth}
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '12px 24px',
                        background: loading ? '#6b7280' : '#4285f4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'background 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                    }}
                >
                    {!loading && (
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="white" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="white" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="white" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="white" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                    )}
                    {loading ? 'Iniciando sesión...' : 'Continuar con Google'}
                </button>

                <div style={{ marginTop: '20px', fontSize: '14px', opacity: 0.7 }}>
                    <p>🌐 Acceso con cualquier cuenta Google</p>
                    <p>🏆 Compite por el primer lugar</p>
                    <p>📊 Progreso guardado automáticamente</p>
                    <p>🎯 5 preguntas interactivas en 3D</p>
                </div>
            </div>
        </div>
    );
}