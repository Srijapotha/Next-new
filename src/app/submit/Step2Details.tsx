"use client";

import React from 'react';
import { useFormContext } from '../../components/FormContext';
import { grievanceDetailsSchema } from '../../lib/schemas';
import styles from '../form.module.css';

export default function Step2Details() {
    const { formData, updateFields, nextStep, prevStep } = useFormContext();
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        updateFields({ [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors(prev => ({ ...prev, [e.target.name]: '' }));
        }
    };

    const handleNext = () => {
        const result = grievanceDetailsSchema.safeParse(formData);
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
            <h2 className={styles.title}>Step 2: Grievance Details</h2>

            <div className={styles.formGroup}>
                <label className={styles.label}>Title</label>
                <input
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Brief title of your grievance"
                />
                {errors.title && <p className={styles.error}>{errors.title}</p>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Category</label>
                <select
                    name="category"
                    value={formData.category || ''}
                    onChange={handleChange}
                    className={styles.select}
                >
                    <option value="">Select a category</option>
                    <option value="service">Service Issue</option>
                    <option value="product">Product Defect</option>
                    <option value="support">Customer Support</option>
                    <option value="other">Other</option>
                </select>
                {errors.category && <p className={styles.error}>{errors.category}</p>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Description</label>
                <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Describe your issue in detail..."
                />
                {errors.description && <p className={styles.error}>{errors.description}</p>}
            </div>

            <div className={styles.buttonGroup}>
                <button onClick={prevStep} className={`${styles.button} ${styles.buttonSecondary}`}>
                    Back
                </button>
                <button onClick={handleNext} className={`${styles.button} ${styles.buttonPrimary}`}>
                    Next
                </button>
            </div>
        </div>
    );
}
