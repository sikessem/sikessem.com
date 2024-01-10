@props([
    'title' => null,
    'meta_tags' => [],
    'doc_id' => 'ske-doc',
    'header' => false,
    'footer' => false,
])

<!DOCTYPE html>
<html id="{{ $doc_id }}" lang="{{ $locale = str_replace('_', '-', $locale ?? app()->getLocale()) }}">
    <head>
    @section('head')
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta name="csrf-token" content="{{ csrf_token() }}"/>
        <title>{{ config('app.title') ?: config('app.name', 'Sikessem') }} @isset($title) | {{ $title }} @else @hasSection('title') | @yield('title') @endif @endisset</title>

        @isset($meta_tags)
        @foreach($meta_tags as $meta_tag)
        <meta name="{{ $meta_tag['name'] }}" content="{{ $meta_tag['content'] }}"/>
        @endforeach
        @endisset

        @vite('resources/designs/app.tsx')

        @livewireStyles
    @show
    </head>

    <body id="{{ $appId ??= 'app' }}"@yield('body_attr') {{ $attributes->class('font-sans antialiased') }}>
        @section('body')
            @yield('wrapper')

            @includeWhen($header, is_string($header) ? "partials.headers.$header" : 'partials.header')
            {{ $slot }}
            @includeWhen($footer, is_string($footer) ? "partials.footers.$footer" : 'partials.footer')

            @livewireScriptConfig
        @show
    </body>
</html>
