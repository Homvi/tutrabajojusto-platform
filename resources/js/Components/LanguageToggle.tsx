import { Globe } from 'lucide-react';

import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { router } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';

export function LanguageToggle() {

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
    ];

    const { locale } = useTranslation();

    const setLocale = (newLocale: string) => {
        router.post('/language/switch', { locale: newLocale }, { preserveScroll: true });
      };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Change language"
                    data-testid="language-toggle"
                >
                    <Globe className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => setLocale(language.code)}
                        data-testid={`language-${language.code}`}
                        className={`flex items-center gap-2 cursor-pointer ${
                            language.code === locale
                                ? 'bg-accent text-accent-foreground'
                                : ''
                        }`}
                    >
                        <span className="text-lg">{language.flag}</span>
                        <span className="flex-1">{language.name}</span>
                     
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}