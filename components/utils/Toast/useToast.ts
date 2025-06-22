import { useState, useCallback } from 'react';

export default function useToast(duration: number = 1500) {
    const [toast, setToast] = useState({ show: false, message: '' });

    const showToast = useCallback((message: string) => {
        setToast({ show: true, message });
        setTimeout(() => {
            setToast({ show: false, message: '' });
        }, duration);
    }, [duration]);

    return { toast, showToast };
}
