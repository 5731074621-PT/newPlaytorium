<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title') v2.4</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/bootstrap-datepicker.css') }}">
  </head>
  <body>
    @include('include.nav')
    @yield('content')
    <script src="{{ asset('js/app.js') }}"></script>
    @yield('script')
  </body>
</html>
