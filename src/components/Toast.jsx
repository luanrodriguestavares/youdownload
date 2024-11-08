import React, { useEffect, useState } from 'react';

const Toast = ({ message, type }) => {
    const [isVisible, setIsVisible] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 3000);
        return () => clearTimeout(timer);
    }, []);
    
    const colorClasses = {
        success: 'bg-emerald-700 text-white',
        danger: 'bg-rose-700 text-white',
    };

    return (
        isVisible && (
            <div
                className={`fixed top-4 left-4 w-full max-w-xs p-4 mb-4 rounded-lg shadow ${colorClasses[type]} transition-opacity duration-300 opacity-100`}
            >
                <div className="flex items-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            {type === 'success' ? (
                                <path d="M13.707 8.207l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            ) : (
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                            )}
                        </svg>
                    </div>
                    <div className="ml-3">
                        <span className="text-sm font-normal">{message}</span>
                    </div>
                </div>
            </div>
        )
    );
};

export default Toast;
