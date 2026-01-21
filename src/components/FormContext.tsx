"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FormData, PersonalDetails, GrievanceDetails } from '../lib/schemas';

interface FormContextType {
    step: number;
    formData: Partial<FormData>;
    setFormData: (data: Partial<FormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
    updateFields: (fields: Partial<FormData>) => void;
    saveDraft: () => void;
    clearDraft: () => void;
    isLoaded: boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const INITIAL_DATA: Partial<FormData> = {
    fullName: '',
    email: '',
    phone: '',
    title: '',
    description: '',
    category: undefined,
};

export function FormProvider({ children }: { children: ReactNode }) {
    const [step, setStep] = useState(1);
    const [formData, setFormDataState] = useState<Partial<FormData>>(INITIAL_DATA);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem('grievance_form_draft');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setFormDataState(parsed.formData || INITIAL_DATA);
                setStep(parsed.step || 1);
            } catch (e) {
                console.error("Failed to restore draft", e);
            }
        }
        setIsLoaded(true);
    }, []);

    const updateFields = (fields: Partial<FormData>) => {
        setFormDataState(prev => ({ ...prev, ...fields }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const saveDraft = () => {
        localStorage.setItem('grievance_form_draft', JSON.stringify({ step, formData }));
        alert("Draft saved!");
    };

    const clearDraft = () => {
        localStorage.removeItem('grievance_form_draft');
        setFormDataState(INITIAL_DATA);
        setStep(1);
    };

    const value = {
        step,
        formData,
        setFormData: setFormDataState,
        nextStep,
        prevStep,
        updateFields,
        saveDraft,
        clearDraft,
        isLoaded
    };

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    );
}

export function useFormContext() {
    const context = useContext(FormContext);
    if (context === undefined) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
}
