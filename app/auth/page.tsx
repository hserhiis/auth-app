"use client"

import React from 'react';
import {AnimatedForm} from "@/components/animated-form";

export default function AuthPage() {
    const [step, setStep] = React.useState<'login' | 'signup'>('login');

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#F5F5F7] flex items-center justify-center p-6">
            <AnimatedForm step={step} setStep={setStep} />
        </div>
    );
}

