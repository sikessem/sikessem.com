<x-app-layout>
    <div class="text-center p-6 lg:p-8 bg-white dark:bg-gray-800 dark:bg-gradient-to-bl dark:from-gray-700/50 dark:via-transparent border-b border-gray-200 dark:border-gray-700">
        <h1 class="mt-8 text-2xl lg:text-4xl font-medium text-gray-900 dark:text-white">
            @lang('Your secure digital partner')
        </h1>
    
        <p class="mt-6 lg:text-2xl text-gray-500 dark:text-gray-400 leading-relaxed">
            @lang(':app is the reference for managing your business online with ready-to-use solutions and services.', ['app' => config('app.title') ])
        </p>
    </div>    
</x-app-layout>
