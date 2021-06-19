<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\submitted_users;

class checkSubmitUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = submitted_users::where('student_number',$request->student_number)->get();
        if( ! $user->isEmpty()){
            return redirect('/');
        }
        return $next($request);
    }
}
