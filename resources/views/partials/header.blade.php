@if (Auth::check())
@livewire('navigation-menu')
@else
<header class="bg-white dark:bg-gray-800 shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="w-full flex justify-between">
            <h1>
                <x-application-brand/>
            </h1>
            <ul class="flex flex-end space-x-4">
                <li class="inline-flex">
                    <x-nav-link route="login">
                        @lang('Login')
                    </x-nav-link>
                </li>
                <li class="inline-flex">
                    <x-nav-link route="register">
                        @lang('Register')
                    </x-nav-link>
                </li>
            </ul>
        </div>
    </div>
</header>
@endif
