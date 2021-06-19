<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::filter('loginstatus', function()
{ 
    $result = (new AuthController)->logIn();
  if (! $result) {
     // do something
     return Redirect::to('/login');
   }
}); 
?>