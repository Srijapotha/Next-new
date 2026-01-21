"use client";

import React from 'react';
import { useFormContext } from '../../components/FormContext';
import { personalDetailsSchema } from '../../lib/schemas';
import styles from '../form.module.css';

export default function Step1Personal() {
    const { formData, updateFields, nextStep } = useFormContext();
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFields({ [e.target.name]: e.target.value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors(prev => ({ ...prev, [e.target.name]: '' }));
        }
    };

    const handleNext = () => {
        const result = personalDetailsSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            const formattedErrors: Record<string, string> = {};
            Object.keys(fieldErrors).forEach((key) => {
                const errors = fieldErrors[key as keyof typeof fieldErrors];
                if (errors && errors.length > 0) {
                    formattedErrors[key] = errors[0];
                }
            });
            setErrors(formattedErrors);
        } else {
            nextStep();
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Step 1: Personal Details</h2>

            <div className={styles.formGroup}>
                <label className={styles.label}>Full Name</label>
                <input
                    name="fullName"
                    value={formData.fullName || ''}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="John Doe"
                />
                {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input
                    name="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="john@example.com"
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <input
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="1234567890"
                />
                {errors.phone && <p className={styles.error}>{errors.phone}</p>}
            </div>

            <div className={styles.buttonGroup}>
                <div></div> {/* Spacer for alignment */}
                <button onClick={handleNext} className={`${styles.button} ${styles.buttonPrimary}`}>
                    Next
                </button>
            </div>
        </div>
    );
}
