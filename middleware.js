import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/api/listings(.*)", // allow GET /api/listings AND /api/listings/:id
]);

const isProtectedApiRoute = createRouteMatcher([
  "/api/listings(.*)", // protect POST/PUT/DELETE on all listings routes
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect write operations on listings
  if (isProtectedApiRoute(req) && req.method !== "GET") {
    await auth.protect();
  }

  // Protect everything else that isn't public
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




