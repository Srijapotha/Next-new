"use client";

import React from 'react';
import { FormProvider, useFormContext } from '../../components/FormContext';
import Step1Personal from './Step1Personal';
import Step2Details from './Step2Details';
import Step3Review from './Step3Review';
import styles from '../form.module.css';

function SubmitFormContent() {
    const { step, saveDraft, isLoaded } = useFormContext();

    if (!isLoaded) {
        return <div className={styles.container}>Loading...</div>;
    }

    const renderStep = () => {
        switch (step) {
            case 1: return <Step1Personal />;
            case 2: return <Step2Details />;
            case 3: return <Step3Review />;
            default: return <Step1Personal />;
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto 1rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={saveDraft} className={`${styles.button} ${styles.buttonDraft}`}>
                    Save Draft
                </button>
            </div>

            {renderStep()}

            <div style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
                Step {step} of 3
            </div>
        </div>
    );
}

export default function SubmitPage() {
    return (
        <FormProvider>
            <SubmitFormContent />
        </FormProvider>
    );
}
