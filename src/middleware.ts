import withAuth from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(

    //req process kro
    function middleware(req){

        const url = req.nextUrl;
        const isAuthPage = url.pathname === "/login" || url.pathname === "/signup";

        // If user is authenticated and on login/signup, redirect them away
        if (req.nextauth.token && isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url)); // redirect to home or dashboard
        }

        return NextResponse.next();
    },
    {
        callbacks : {
            authorized : ({token, req}) => {
                
                const isAuth = !!token

                const { pathname } = req.nextUrl

                // if((pathname.startsWith("/api/auth") || pathname === "/login" || pathname === "/signup") && isAuth){
                //     NextResponse.redirect('/')
                // }

                if(
                    (pathname.startsWith("/api/auth") || pathname === "/login" || pathname === "/signup")
                ){
                    return true
                }
            
                if(pathname === '/'){
                    return true
                }

                // !! make it boolean
                return isAuth
            }
        }
    }
)

// kha kha middleware run hona chahiye

export const config = {
    matcher: [
        "/home","/upload","/login","/signup","/contribute"
    ],
};