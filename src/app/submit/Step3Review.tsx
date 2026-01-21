"use client";

import React, { useState } from 'react';
import { useFormContext } from '../../components/FormContext';
import { submitGrievance } from '../../actions/submitGrievance';
import styles from '../form.module.css';
import { useRouter } from 'next/navigation';

export default function Step3Review() {
    const { formData, prevStep, clearDraft } = useFormContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitError(null);

        const result = await submitGrievance(formData);

        if (result.success) {
            clearDraft();
            // In a real app we might redirect to a success page or show a modal
            alert(`Success! ID: ${result.id}`);
            router.push('/');
        } else {
            setSubmitError(result.message || "Unknown error occurred");
            if (result.errors) {
                // In a real app, mapping these back to fields in previous steps would be ideal
                console.error(result.errors);
            }
        }
        setIsSubmitting(false);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Step 3: Review & Submit</h2>

            <div className={styles.reviewItem}>
                <div className={styles.reviewLabel}>Full Name</div>
                <div className={styles.reviewValue}>{formData.fullName}</div>
            </div>
            <div className={styles.reviewItem}>
                <div className={styles.reviewLabel}>Email</div>
                <div className={styles.reviewValue}>{formData.email}</div>
            </div>
            <div className={styles.reviewItem}>
                <div className={styles.reviewLabel}>Phone</div>
                <div className={styles.reviewValue}>{formData.phone}</div>
            </div>

            <div className={styles.reviewItem}>
                <div className={styles.reviewLabel}>Issue Title</div>
                <div className={styles.reviewValue}>{formData.title}</div>
            </div>
            <div className={styles.reviewItem}>
                <div className={styles.reviewLabel}>Category</div>
                <div className={styles.reviewValue}>{formData.category}</div>
            </div>
            <div className={styles.reviewItem}>
                <div className={styles.reviewLabel}>Description</div>
                <div className={styles.reviewValue}>{formData.description}</div>
            </div>

            {submitError && (
                <div className={styles.error} style={{ marginBottom: '1rem' }}>
                    Error: {submitError}
                </div>
            )}

            <div className={styles.buttonGroup}>
                <button
                    onClick={prevStep}
                    className={`${styles.button} ${styles.buttonSecondary}`}
                    disabled={isSubmitting}
                >
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    className={`${styles.button} ${styles.buttonPrimary}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
                </button>
            </div>
        </div>
    );
}
