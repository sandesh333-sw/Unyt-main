import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/api/listings",  // Allow GET requests
]);

const isProtectedApiRoute = createRouteMatcher([
  "/api/listings",  // Will protect POST/PUT/DELETE
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect POST/PUT/DELETE on API routes
  if (isProtectedApiRoute(req) && req.method !== 'GET') {
    await auth.protect();
  }
  
  // Protect other non-public routes
  if (!isPublicRoute(req) && !isProtectedApiRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};