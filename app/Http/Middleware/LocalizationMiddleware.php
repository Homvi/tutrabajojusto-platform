<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;

class LocalizationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if user has chosen a language in session first
        $locale = $request->session()->get('locale');

        // If no locale in session, fall back to browser language
        if (! $locale) {
            $browserLocale = substr($request->server('HTTP_ACCEPT_LANGUAGE') ?? '', 0, 2);
            $locale = ($browserLocale === 'es') ? 'es' : 'en';
        }

        // Ensure locale is valid
        $locale = in_array($locale, ['en', 'es']) ? $locale : 'en';

        App::setLocale($locale);

        // Debug logging
        Log::info('Locale middleware - URL: '.$request->url().', Session: '.($request->session()->get('locale') ?? '').', Final: '.$locale);

        return $next($request);
    }
}
