<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        // Base rules for name and email are now also 'sometimes' required.
        // This allows separate forms to update the user and profile data via the same endpoint.
        $rules = [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
        ];

        // If the user is a job seeker, merge in the profile validation rules.
        if ($this->user() && $this->user()->isJobSeeker()) {
            $profileRules = [
                'headline' => ['sometimes', 'nullable', 'string', 'max:255'],
                'summary' => ['sometimes', 'nullable', 'string'],
                'skills' => ['sometimes', 'nullable', 'string'],
                'experience' => ['sometimes', 'nullable', 'array'],
                'education' => ['sometimes', 'nullable', 'array'],
            ];
            $rules = array_merge($rules, $profileRules);
        }

        return $rules;
    }
}
