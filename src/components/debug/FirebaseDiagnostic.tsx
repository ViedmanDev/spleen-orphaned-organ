"use client";

import React, { useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { QuizService } from '../../services/quizService';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export function FirebaseDiagnostic() {
    const [results, setResults] = useState<string[]>([]);
    const [testing, setTesting] = useState(false);

    const log = (message: string) => {
        console.log(message);
        setResults(prev => [...prev, message]);
    };

    const runDiagnostic = async () => {
        setTesting(true);
        setResults([]);

        try {
            log('🔍 Iniciando diagnóstico de Firebase...');

            // Test 1: Verificar configuración
            log('📋 Configuración Firebase:');
            log(`  - Project ID: ${db.app.options.projectId}`);
            log(`  - Auth Domain: ${auth.app.options.authDomain}`);
            log(`  - API Key: ${auth.app.options.apiKey?.substring(0, 10)}...`);

            // Test 2: Verificar usuario autenticado
            const user = auth.currentUser;
            if (user) {
                log(`✅ Usuario autenticado: ${user.email}`);

                // Test 3: Verificar conexión a Firestore
                log('🔄 Probando conexión a Firestore...');
                const testRef = doc(db, 'diagnostic', 'test');

                try {
                    await setDoc(testRef, {
                        timestamp: new Date().toISOString(),
                        user: user.uid,
                        test: 'Conexión exitosa'
                    });

                    const docSnap = await getDoc(testRef);
                    if (docSnap.exists()) {
                        log('✅ Firestore: Lectura/escritura exitosa');
                        log(`   Datos: ${JSON.stringify(docSnap.data())}`);
                    } else {
                        log('⚠️ Firestore: Documento no encontrado después de escribir');
                    }
                } catch (firestoreError) {
                    log(`❌ Error de Firestore: ${firestoreError}`);
                }

                // Test 4: Verificar QuizService
                log('🔄 Probando QuizService...');
                const testConnection = await QuizService.testConnection();
                log(`QuizService conexión: ${testConnection ? '✅' : '❌'}`);

                // Test 5: Verificar consulta de rankings (índices)
                log('🔄 Probando consulta de rankings...');
                try {
                    const rankings = await QuizService.getGlobalRanking(5);
                    log(`✅ Rankings obtenidos: ${rankings.length} usuarios`);
                    rankings.forEach((ranking, index) => {
                        log(`  ${index + 1}. ${ranking.userName}: ${ranking.averageScore} puntos`);
                    });
                } catch (rankingError: any) {
                    log(`❌ Error en rankings: ${rankingError.message}`);
                    if (rankingError.message.includes('index')) {
                        log('💡 Se requiere crear un índice en Firestore');
                        log('💡 Usar el enlace proporcionado en el error original');
                    }
                }

            } else {
                log('⚠️ No hay usuario autenticado');
                log('🔄 Intentando autenticación de prueba...');

                try {
                    const provider = new GoogleAuthProvider();
                    provider.setCustomParameters({ prompt: 'select_account' });

                    const result = await signInWithPopup(auth, provider);
                    log(`✅ Autenticación exitosa: ${result.user.email}`);

                    // Repetir tests con usuario autenticado
                    await runDiagnostic();
                    return;

                } catch (authError: any) {
                    log(`❌ Error de autenticación: ${authError.code} - ${authError.message}`);

                    if (authError.code === 'auth/popup-blocked') {
                        log('💡 Solución: Permitir popups para este sitio');
                    } else if (authError.message.includes('Cross-Origin')) {
                        log('💡 Solución: Problema de CORS detectado');
                    }
                }
            }

            log('🏁 Diagnóstico completado');

        } catch (error) {
            log(`❌ Error general: ${error}`);
        } finally {
            setTesting(false);
        }
    };

    const clearResults = () => {
        setResults([]);
    };

    // Solo mostrar en desarrollo
    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'white',
            border: '2px solid #333',
            borderRadius: '8px',
            padding: '16px',
            maxWidth: '400px',
            maxHeight: '400px',
            overflow: 'auto',
            zIndex: 9999,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
                🔧 Firebase Diagnostic
            </h3>

            <div style={{ marginBottom: '10px' }}>
                <button
                    onClick={runDiagnostic}
                    disabled={testing}
                    style={{
                        background: testing ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: testing ? 'not-allowed' : 'pointer',
                        marginRight: '8px'
                    }}
                >
                    {testing ? 'Ejecutando...' : 'Ejecutar Test'}
                </button>

                <button
                    onClick={clearResults}
                    style={{
                        background: '#6c757d',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Limpiar
                </button>
            </div>

            <div style={{
                background: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                padding: '8px',
                fontSize: '12px',
                fontFamily: 'monospace',
                maxHeight: '250px',
                overflow: 'auto'
            }}>
                {results.length === 0 ? (
                    <div style={{ color: '#6c757d' }}>
                        Haz clic en &quot;Ejecutar Test&quot; para verificar Firebase
                    </div>
                ) : (
                    results.map((result, index) => (
                        <div key={index} style={{
                            marginBottom: '4px',
                            color: result.includes('❌') ? '#dc3545' :
                                result.includes('⚠️') ? '#ffc107' :
                                    result.includes('✅') ? '#28a745' : '#333'
                        }}>
                            {result}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
