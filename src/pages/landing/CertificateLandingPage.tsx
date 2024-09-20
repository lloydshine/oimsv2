import { useNavigate } from "react-router-dom";

export default function CertificateLandingPage() {
  const navigate = useNavigate();

  const handleRequestCertificate = () => {
    navigate("/request/certificate");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-red-950">
        Request a Certificate
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        You can request different types of certificates by entering your
        details.
      </p>
      <button
        onClick={handleRequestCertificate}
        className="px-6 py-3 bg-red-950 text-white rounded-lg shadow-lg hover:bg-red-800 transition-colors"
      >
        Request Certificate
      </button>
    </div>
  );
}
