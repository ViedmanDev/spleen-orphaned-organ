"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SimpleAuth } from '@components/auth/SimpleAuth';

export default function LoginPage() {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    const handleAuth = (userId: string, userName: string, userEmail: string) => {
        setIsRedirecting(true);
        // Opcional: guardar datos del usuario en localStorage para uso posterior
        localStorage.setItem('quiz_user', JSON.stringify({ userId, userName, userEmail }));

        // Redirigir al quiz después de la autenticación
        setTimeout(() => {
            router.push('/quiz');
        }, 1000);
    };

    if (isRedirecting) {
        return (
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
                    <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>
                        ✅ ¡Autenticación exitosa!
                    </h2>
                    <p>Redirigiendo al quiz...</p>
                    <div style={{
                        width: '100%',
                        height: '4px',
                        background: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '2px',
                        marginTop: '20px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            background: '#3b82f6',
                            animation: 'loading 1s ease-in-out'
                        }} />
                    </div>
                </div>
            </div>
        );
    }

    return <SimpleAuth onAuth={handleAuth} />;
}
