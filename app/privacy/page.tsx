import Link from "next/link";

export default function Privacy() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-20">
      <h1 className="text-4xl font-semibold tracking-tight">Privacy</h1>
      <p className="mt-6 text-base text-slate-600">
        The sign-up form collects one email address. The client names you type stay in your browser and are never sent to the server. The email is used to tell you when per-client isolation is ready to install and nothing else. It is not sold or shared.
      </p>
      <Link href="/" className="mt-8 inline-block cursor-pointer text-base underline">
        Back
      </Link>
    </main>
  );
}
