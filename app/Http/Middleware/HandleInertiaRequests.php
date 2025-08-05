<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        if ($user && $user->isCompany()) {
            $user->load('companyProfile');
        }

        return array_merge(parent::share($request), [
            // Share the authenticated user's data on every request
            'auth' => [
                // The 'user' will be the user object if logged in, or null if a guest.
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role,
                    'is_admin' => $request->user()->is_admin,
                    'companyProfile' => $user->companyProfile,
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'locale' => fn () => app()->getLocale(),
            'translations' => function () {
                $path = lang_path(app()->getLocale().'.json');
                $locale = app()->getLocale();

                return File::exists($path) ? json_decode(File::get($path), true) : [];
            },
        ]);
    }
}
