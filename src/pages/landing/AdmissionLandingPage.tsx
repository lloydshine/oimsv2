import { Link } from "react-router-dom";

export default function AdmissionLandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <section
        className="text-white h-[70vh] flex flex-col justify-center items-center text-center bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.389), rgba(0, 0, 0, 0.873)), url("/3.jpg")`,
        }}
      >
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Admission Portal
          </h1>
          <p className="text-xl mb-6">
            Choose the appropriate form to proceed with your admission process.
          </p>
        </div>
      </section>
      <section className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-semibold text-red-950 mb-4">
              New Students
            </h2>
            <p className="text-gray-700 mb-4">
              If you are a new student joining our institution for the first
              time, please use this form.
            </p>
            <Link
              to="/request/admission?no=1"
              className="bg-red-950 text-white px-4 py-2 rounded-lg inline-block font-semibold"
            >
              Admission 1
            </Link>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-semibold text-red-950 mb-4">
              Old/Returnee Students
            </h2>
            <p className="text-gray-700 mb-4">
              If you are an old or returnee student, please use this form to
              continue your admission process.
            </p>
            <Link
              to="/request/admission?no=2"
              className="bg-red-950 text-white px-4 py-2 rounded-lg inline-block font-semibold"
            >
              Admission 2
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
