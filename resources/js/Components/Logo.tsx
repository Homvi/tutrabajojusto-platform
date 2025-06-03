// File: resources/js/Components/Logo.tsx

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import LightVersionLogo from "../assets/logo-dark.svg?react";
import DarkVersionLogo from "../assets/logo-light.svg?react";

interface LogoProps {
    width?: number | string;
    height?: number | string;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ width, height, className }) => {
    console.log("Type of LightVersionLogo:", typeof LightVersionLogo);
    console.log("Value of LightVersionLogo:", LightVersionLogo);

     // If it's not a function, it's not a React component
  if (typeof LightVersionLogo !== 'function') {
    return (
      <div style={{ color: 'red', border: '1px solid red', padding: '10px' }}>
        Error: LightVersionLogo is not a React component! It's a '{typeof LightVersionLogo}'. Value: {String(LightVersionLogo)}
      </div>
    );
  }
  
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
        // Option 1: Render nothing or a placeholder to avoid flash
        // return null;
        // Option 2: Render a generic div that takes up space
        return (
            <div
                style={{ width: width || "auto", height: height || "auto" }}
                className={className}
                aria-label="TuTrabajoJusto Logo Loading"
            />
        );
        // Option 3: Default to one version (e.g., light) - might cause a flash on dark theme
        // return <LightVersionLogo width={width} height={height} className={className} aria-label="TuTrabajoJusto Logo" />;
    }

    const CurrentLogoToDisplay =
        resolvedTheme === "dark" ? DarkVersionLogo : LightVersionLogo;

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
