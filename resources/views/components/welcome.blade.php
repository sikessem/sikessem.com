<div class="p-6 lg:p-8 bg-white dark:bg-gray-800 dark:bg-gradient-to-bl dark:from-gray-700/50 dark:via-transparent border-b border-gray-200 dark:border-gray-700">
    <x-application-logo class="block h-16 w-auto" />

    <h1 class="mt-8 text-2xl font-medium text-gray-900 dark:text-white">
        @lang('Your secure digital partner')
    </h1>

    <p class="mt-6 text-gray-500 dark:text-gray-400 leading-relaxed">
        @lang(':app is the reference for managing your business online with ready-to-use solutions and services.', ['app' => config('app.title') ])
    </p>
</div>

<div class="bg-gray-200 dark:bg-gray-800 bg-opacity-25 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 p-6 lg:p-8">
    <div>
        <sx-counter init="0" step="2">
            Init : 0
            Step : 2
        </sx-counter>
    </div>
</div>
