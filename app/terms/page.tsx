import Link from "next/link";

export default function Terms() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-20">
      <h1 className="text-4xl font-semibold tracking-tight">Terms</h1>
      <p className="mt-6 text-base text-slate-600">
        This is an early prototype. Nothing is installed on your machine by signing up, and the demo on the home page is a simulation. Signing up puts you on the list to be emailed when the tool is ready to install.
      </p>
      <Link href="/" className="mt-8 inline-block cursor-pointer text-base underline">
        Back
      </Link>
    </main>
  );
}
