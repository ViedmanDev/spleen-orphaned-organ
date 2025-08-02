import React, { useState } from 'react';
import { SimpleAuth } from '../../auth/SimpleAuth';
import { Quiz3DScene } from './Quiz3DScene';

export function QuizApp() {
    const [user, setUser] = useState<{ userId: string; userName: string; userEmail: string } | null>(null);

    const handleAuth = (userId: string, userName: string, userEmail: string) => {
        setUser({ userId, userName, userEmail });
    };

    if (!user) {
        return <SimpleAuth onAuth={handleAuth} />;
    }

    return <Quiz3DScene userId={user.userId} userName={user.userName} />;
}
