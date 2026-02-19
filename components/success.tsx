"use client";
import {motion, Variants, HTMLMotionProps} from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Задержка между появлением детей
            delayChildren: 0.3
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export function SuccessView({ email }: { email: string }) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center space-y-6 p-8 bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/20"
        >
            {/* Иконка галочки с анимацией рисования */}
            <motion.div variants={itemVariants} className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"
                    />
                </svg>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-3xl font-bold text-[#1D1D1F] tracking-tight">
                Добро пожаловать!
            </motion.h1>

            <motion.p variants={itemVariants} className="text-[#86868B] text-lg">
                Вы вошли как <span className="text-[#0066CC] font-medium">{email}</span>
            </motion.p>

            <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-[#1D1D1F] text-white rounded-full font-medium transition-colors hover:bg-[#323235]"
            >
                Перейти в настройки
            </motion.button>
        </motion.div>
    );
}