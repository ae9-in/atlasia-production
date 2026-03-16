import { useEffect } from 'react';

/**
 * Redirects students to the external portal.
 * Replace 'https://PLACEHOLDER_URL_HERE' with the actual URL when available.
 */
export default function StudentPortal() {
    useEffect(() => {
        // Replace the string below with your target URL
        window.location.href = 'https://atlasia-portal-frontend.vercel.app/';
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-ivory">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mx-auto mb-4"></div>
                <h2 className="text-xl font-display font-bold text-mocha">Redirecting to Student Portal...</h2>
                <p className="text-taupe mt-2">Please wait a moment.</p>
            </div>
        </div>
    );
}
