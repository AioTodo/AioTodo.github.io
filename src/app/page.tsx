import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-6 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to INBites
        </h1>
        <p className="text-xl text-muted-foreground">
          Order delicious meals from our carefully curated menu
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/sign-in"
            className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
          >
            Sign In
          </Link>
          <Link
            href="/menu"
            className="rounded-md bg-secondary px-6 py-3 text-sm font-semibold shadow-sm hover:bg-secondary/90"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    </div>
  );
} 