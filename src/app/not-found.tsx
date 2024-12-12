"use client";

// import Error from "next/error";
//
// // Render the default Next.js 404 page when a route
// // is requested that doesn't match the middleware and
// // therefore doesn't have a locale associated with it.
//

import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <main className="flex flex-col items-center justify-center gap-5 min-h-screen ">
        {/*<Error statusCode={404} />*/}
        <p className="text-4xl">Could not find requested resource</p>
        <Link className="hover:text-yellow-500 text-2xl" href="/">
          Return Home -&gt;
        </Link>
      </main>
    </html>
  );
}
