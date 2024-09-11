import { Link } from "react-router-dom";

export default function AdmissionLandingPage() {
  const heroimage =
    "https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.30808-6/440988146_779378060964246_7236889778989263618_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHpeNGxJXZJ7tRHxkZ_nhYKXXXMm7J1YclddcybsnVhyZ8tIzjAeqklhnpecG_A81cGsoQyoOdrybzAmMgDCN0k&_nc_ohc=X9Z0I7cu_aIQ7kNvgGY8LK9&_nc_ht=scontent.fcgy1-1.fna&_nc_gid=ALjDvxnowxV-7ZDCiVJsz7_&oh=00_AYBQdZg41m9YLOSZjbE35scP3q7oeEVIhfCJWQLLIPqGdA&oe=66E7845E";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section
        className="text-white h-[70vh] flex flex-col justify-center items-center text-center bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.389), rgba(0, 0, 0, 0.573)), url(${heroimage})`,
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

      {/* Options Section */}
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
              to="/request/admission?no=2"
              className="bg-red-950 text-white px-4 py-2 rounded-lg inline-block font-semibold"
            >
              Admission 2
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
              to="/request/admission?no=1"
              className="bg-red-950 text-white px-4 py-2 rounded-lg inline-block font-semibold"
            >
              Admission 1
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
