<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        <script src="https://js.pusher.com/7.0/pusher.min.js"></script>
        
        <meta name="csrf-token" content="{{ csrf_token() }}"/>
        <title>Laravel</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="./js/app.js"></script>
    </body>
</html>
