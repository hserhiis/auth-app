'use client';

import { AnimatePresence, motion } from "framer-motion";
import * as React from 'react';
import LoginForm from '@/components/login/login';
import SignupPage from '@/components/signup';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import { useRouter } from "next/navigation";

// Используем четкие типы для шагов
type AuthStep = 'login' | 'signup';

interface Props {
    className?: string;
    step: AuthStep;
    setStep: (step: AuthStep) => void;
}

export const AnimatedForm: React.FC<Props> = ({ step, setStep }) => {
    const router = useRouter();

    const handleSignupSuccess = () => {
        router.push('/dashboard');
        setStep('login');
    };

    return (
        <>
            {/* Анимированные градиентные сферы (Apple Aura) */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-blue-200/40 to-purple-200/40 blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-pink-200/30 to-orange-100/30 blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 w-full max-w-[480px]">
                <motion.div
                    layout
                    className="bg-white/70 backdrop-blur-3xl rounded-[38px] p-10 border border-white/40 shadow-[0_32px_80px_rgba(0,0,0,0.08)]"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: step === 'login' ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: step === 'login' ? 20 : -20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <h2 className="text-4xl font-bold tracking-tight mb-2 text-center text-[#1D1D1F]">
                                {step === 'login' ? 'Войти.' : 'Создать ID.'}
                            </h2>
                            <p className="text-gray-500 text-center mb-8 font-medium">
                                {step === 'login' ? 'Добро пожаловать в будущее.' : 'Начните свой путь с нами.'}
                            </p>

                            {step === 'login' ? (
                                <LoginForm onSuccess={() => router.push('/dashboard')} />
                            ) : (
                                <SignupPage onSuccess={handleSignupSuccess} />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Социальный блок */}
                    <div className="mt-10">
                        <div className="relative flex items-center py-4">
                            <div className="flex-grow border-t border-gray-200/60"></div>
                            <span className="flex-shrink mx-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Или войти через</span>
                            <div className="flex-grow border-t border-gray-200/60"></div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <SocialButton label="Google" iconColor="text-[#EA4335]" icon={<FaGoogle />} color="hover:bg-red-50" />
                            <SocialButton label="GitHub" iconColor="text-[#181717]" icon={<FaGithub />} color="hover:bg-gray-100" />
                            <SocialButton label="Facebook" iconColor="text-[#1877F2]" icon={<FaFacebook />} color="hover:bg-blue-50" />
                        </div>
                    </div>

                    <div className="text-center mt-10">
                        <button
                            onClick={() => setStep(step === 'login' ? 'signup' : 'login')}
                            className="text-[#0066CC] font-semibold hover:text-[#004499] transition-colors text-sm"
                        >
                            {step === 'login' ? "Нет аккаунта? Создать" : "Уже есть аккаунт? Войти"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

function SocialButton({ icon, color, iconColor, label }: { icon: React.ReactNode; color: string; iconColor: string; label: string }) {
    return (
        <motion.button
            aria-label={label}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-center py-4 rounded-2xl bg-white/50 border border-gray-100 transition-all duration-300 text-2xl ${iconColor} ${color} shadow-sm`}
        >
            {icon}
        </motion.button>
    );
}