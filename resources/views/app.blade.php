<!DOCTYPE html>
<html  lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Theme initialization script - prevents flash of incorrect theme -->
        <script>
            (function() {
                try {
                    var stored = localStorage.getItem('theme');
                    var prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    var theme = stored === 'light' || stored === 'dark' ? stored : prefers;
                    if (theme === 'dark') document.documentElement.classList.add('dark');
                } catch (e) {}
            })();
        </script>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
