import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
//   '/dashboard'
])


export default clerkMiddleware((auth,req)=>{
  // if(isProtectedRoute(req)) {
  //   return auth().protect()
  // }
  console.log("middleware running")
  if(isProtectedRoute(req)) {
    auth().protect()
  }
},{
  signInUrl:"/auth/login",
  signUpUrl:"/auth/register",
  
});



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // "/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)",
    // Always run for API routes
    // '/(api|trpc)(.*)',
  ],
};


