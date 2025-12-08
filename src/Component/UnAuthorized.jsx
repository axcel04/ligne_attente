import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-md text-center">
        <Lock className="mx-auto mb-4 text-red-600 w-16 h-16" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You do not have the necessary permissions to view this page. 
          This section is restricted to authorized users only.
        </p>
        <p className="text-gray-500 mb-6">
          If you believe this is an error, please contact your administrator or support team.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;