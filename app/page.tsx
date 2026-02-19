'use client';

import { useState } from 'react';
import AuthPage from "@/app/auth/page";

export default function Home() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            {/* Контейнер для формы */}
            <div className="w-full max-w-md">
                <AuthPage />
            </div>
        </div>
    );
}