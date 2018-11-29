<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Noto+Serif" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
        <!-- Gridlex -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/gridlex/2.7.1/gridlex.min.css">
        <title>{{ config('app.name', 'Laravel') }}</title>
         <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body>
        <div id="app">
          <!-- Render App.Vue -->
          <app></app>
        </div>
        <script type="text/javascript" src="js/app.js"></script>
    </body>
</html>