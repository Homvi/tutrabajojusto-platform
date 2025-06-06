<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming job seeker registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function storeJobSeeker(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Using a database transaction to ensure data integrity.
        // If creating the profile fails, the user creation will be rolled back.
        $user = DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'job_seeker',
            ]);

            // Create the associated profile
            $user->jobSeekerProfile()->create([]); // Initially empty, can be filled out later

            return $user;
        });

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }

    /**
     * Handle an incoming company registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function storeCompany(Request $request): RedirectResponse
    {
        $request->validate([
            // Validation for the company form (we will create this form next)
            'company_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Using a database transaction for data integrity.
        $user = DB::transaction(function () use ($request) {
            // For the user record, we can use the company name as the 'name'
            $user = User::create([
                'name' => $request->company_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'company',
            ]);

            // Create the associated profile
            $user->companyProfile()->create([
                'company_name' => $request->company_name,
            ]);

            return $user;
        });

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
