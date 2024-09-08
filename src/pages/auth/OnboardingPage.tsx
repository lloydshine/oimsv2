import { auth } from "../../lib/firebase";

export default function OnboardingPage() {
  return (
    <div>
      OnboardingPage
      <button
        onClick={() => auth.signOut()}
        className="bg-red-950 text-white rounded-lg px-4 py-2 border-2 mt-auto hover:bg-white hover:text-red-950 transition-colors"
      >
        Signout
      </button>
    </div>
  );
}
