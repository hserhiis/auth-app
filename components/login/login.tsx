'use client';
import { useState } from 'react';

// Добавляем интерфейс для пропсов
interface LoginProps {
    onSuccess: (user: any) => void;
}

export default function LoginForm({ onSuccess }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            // ПРОВЕРКА: если это не JSON, мы не упадем на .json()
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Сервер вернул странный ответ (не JSON). Проверь роут API!");
            }

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Ошибка входа');
            }

            onSuccess(data);
        } catch (err: any) {
            // Теперь тут будет вменяемое сообщение, а не крэш приложения
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {error && (
                <div id="error" className="rounded-2xl bg-red-50 p-4 text-sm text-red-600 border border-red-100 animate-shake text-center">
                    {error}
                </div>
            )}

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F5F5F7] border-transparent focus:bg-white focus:ring-2 focus:ring-[#0066CC] rounded-2xl px-5 py-4 text-[17px] outline-none transition-all duration-300 placeholder:text-gray-400 border border-gray-100 text-[#1D1D1F]"
                required
                placeholder="Email"
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F5F5F7] border-transparent focus:bg-white focus:ring-2 focus:ring-[#0066CC] rounded-2xl px-5 py-4 text-[17px] outline-none transition-all duration-300 placeholder:text-gray-400 border border-gray-100 text-[#1D1D1F]"
                required
                placeholder="Password"
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1D1D1F] text-white rounded-2xl py-4 text-[17px] font-semibold hover:bg-[#323235] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-black/10 mt-6 disabled:opacity-50"
            >
                {loading ? 'loading...' : 'Login'}
            </button>
        </form>
    );
}