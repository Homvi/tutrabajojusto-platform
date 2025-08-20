import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { LogoProps } from '@/types';

// Corrected: Imports are now mapped to the correct files.
import LightVersionLogo from '../assets/logo-light.svg?react';
import DarkVersionLogo from '../assets/logo-dark.svg?react';

const Logo: React.FC<LogoProps> = ({ width, height, className }) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // useEffect only runs on the client, so we can safely show the logo
    // after mounting to prevent hydration mismatches.
    useEffect(() => {
        setMounted(true);
    }, []);

    // If not mounted yet, or theme is not resolved, you can return a placeholder
    // or null to avoid flashing the wrong logo during server-side rendering / initial load.
    if (!mounted) {
        return (
            <div
                style={{ width: width || 'auto', height: height || 'auto' }}
                className={className}
                aria-label="TuTrabajoJusto Logo Loading"
            />
        );
    }

    const CurrentLogoToDisplay =
        resolvedTheme === 'dark' ? LightVersionLogo : DarkVersionLogo;

    return (
        <CurrentLogoToDisplay
            width={width}
            height={height}
            className={className}
            aria-label="TuTrabajoJusto Logo"
        />
    );
};

export default Logo;
