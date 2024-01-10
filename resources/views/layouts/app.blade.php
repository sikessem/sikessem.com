@props([
    'title' => null,
])

<x-base-layout :$title :header="true" :footer="true">
    <x-banner />

    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
        <main {{ $attributes }}>
        {{ $slot }}
        </main>
    </div>

    @stack('modals')
</x-base-layout>
