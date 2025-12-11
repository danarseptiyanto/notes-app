<!DOCTYPE html>
<html  lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" href="/img/favicon.png">
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <meta name="theme-color" content="#ffffff">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta name="apple-mobile-web-app-title" content="Notes">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">


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
