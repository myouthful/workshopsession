import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [successData, setSuccessData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
    identityType: "",
    identityNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidNigerianPhone = (phone) => {
    const phoneRegex = /^(?:\+?234|0)[789][01]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    password: '',
  });

  const isAtLeast18 = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 18;
    }
    return age >= 18;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation errors when user starts typing
    setValidationErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    switch (name) {
      case "email":
        if (value && !isValidEmail(value)) {
          setValidationErrors((prev) => ({
            ...prev,
            email: "Please enter a valid email address",
          }));
        }
        break;

      case "phoneNumber":
        if (value && !isValidNigerianPhone(value)) {
          setValidationErrors((prev) => ({
            ...prev,
            phoneNumber: "Please enter a valid Nigerian phone number",
          }));
        }
        break;

      case "dateOfBirth":
        if (value && !isAtLeast18(value)) {
          setValidationErrors((prev) => ({
            ...prev,
            dateOfBirth: "You must be at least 18 years old",
          }));
        }
        break;

        case "password":
            if (value && !isValidPassword(value)) {
              setValidationErrors((prev) => ({
                ...prev,
                password: "Password must be at least 8 characters and include letters, numbers, and special characters",
              }));
            }
            break;
          default:
            break;
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://epaydatabase.onrender.com/account/create",
        formData,
        {
            headers: {
              "Content-Type": "application/json",
              "clientid": "67c2b220f06d9759783b3ce3", 
              "nonce": "67c2b220f06d9759783b3ce3", 
              "signature": "67c2b220f06d9759783b3ce3", 
            },
          }
      );

      if (response.data.status === 'success') {
        setSuccessData(response.data.data);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Add Success Card component
  const SuccessCard = () => (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 md:px-0">
    <div className="w-[280px] min-[650px]:w-[400px] bg-white p-4 md:p-8 rounded-lg shadow-lg text-center">
      <svg 
          className="w-16 h-16 text-green-500 mx-auto mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="text-xl md:text-2xl font-opensans font-semibold text-gray-800 mb-4">
        Account Creation Successful!
      </h2>
      <p className="text-gray-600 font-opensans text-[12px] md:text-[13px] font-thin mb-6">
        Please check your email inbox for account details and login info.
      </p>
        <div className="bg-gray-50 p-4 rounded-md text-left">
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium font-opensans ">Account Number:</span> {successData.account_number}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium  font-opensans ">Account Name:</span> {successData.account_name}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium font-opensans ">Account Type:</span> {successData.account_type}
          </p>
        </div>
      </div>
    </div>
  );

  const progressPercentage = ((step - 1) / 7) * 100;

  const StepHeader = ({ stepNumber }) => (
    <div className="w-[70px] mb-[30px] min-[650px]:mb-[60px]">
      <h2 className="text-[12px] min-[650px]:text-[14px] text-gray-600 font-semibold mb-2">
        Step {stepNumber} of 3
      </h2>
      <div className="w-full bg-gray-200 h-1 mb-4 min-[650px]:mb-8 rounded-full overflow-hidden">
        <div
          className="bg-button-blue h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );

  const inputBaseClass = "w-full md:w-[400px] border-b border-black pb-2 text-gray-600 focus:outline-none";

  const NavigationButtons = ({ disableNext, isLastStep }) => (
    <div className="flex justify-between w-[280px] min-[650px]:w-[400px] mt-[50px] min-[650px]:mt-[100px]">
    {step > 1 && (
        <button
          onClick={handlePrevious}
          type="button"
          className="px-4 min-[650px]:px-8 py-2 text-button-blue border border-button-blue rounded-md hover:bg-gray-50 transition-colors text-sm min-[650px]:text-base"
        >
          Previous
        </button>
      )}
      <button
        onClick={isLastStep ? handleSubmit : handleNext}
        type="button"
        className={`px-4 min-[650px]:px-8 py-2 bg-button-blue text-white rounded-md hover:bg-blue-600 transition-colors text-sm min-[650px]:text-base ${
          !step > 1 ? "ml-0" : "ml-auto"
        }`}
        disabled={disableNext}
      >
        {isLastStep ? loading ? "Creating Account..." : "Create Account" : "Next"}
      </button>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <StepHeader stepNumber={1} />
            <div className="mb-12">
              <label className="text-sm text-gray-500 mb-2 block">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={inputBaseClass}
                required
              />
            </div>
            <NavigationButtons disableNext={!formData.firstName} />
          </>
        );

      case 2:
        return (
          <>
            <StepHeader stepNumber={1} />
            <div className="mb-12">
              <label className="text-sm text-gray-500 mb-2 block">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={inputBaseClass}
                required
              />
            </div>
            <NavigationButtons disableNext={!formData.lastName} />
          </>
        );

      case 3:
        return (
          <>
            <StepHeader stepNumber={2} />
            <div className="mb-12">
              <label className="text-sm text-gray-500 mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputBaseClass} ${
                  validationErrors.email ? "border-red-500" : ""
                }`}
                required
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.email}
                </p>
              )}
            </div>
            <NavigationButtons disableNext={!formData.email || validationErrors.email} />
          </>
        );

      case 4:
        return (
          <>
            <StepHeader stepNumber={2} />
            <div className="mb-12">
              <label className="text-sm text-gray-500 mb-2 block">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g., 08012345678"
                className={`${inputBaseClass} ${
                  validationErrors.phoneNumber ? "border-red-500" : ""
                }`}
                required
              />
              {validationErrors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.phoneNumber}
                </p>
              )}
            </div>
            <NavigationButtons disableNext={!formData.phoneNumber || validationErrors.phoneNumber} />
          </>
        );

      case 5:
        return (
          <>
            <StepHeader stepNumber={2} />
            <div className="mb-12">
              <label className="text-sm text-gray-500 mb-2 block">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                max={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 18)
                  )
                    .toISOString()
                    .split("T")[0]
                }
                className={`${inputBaseClass} ${
                  validationErrors.dateOfBirth ? "border-red-500" : ""
                }`}
                required
              />
              {validationErrors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.dateOfBirth}
                </p>
              )}
            </div>
            <NavigationButtons disableNext={!formData.dateOfBirth || validationErrors.dateOfBirth} />
          </>
        );

      case 6:
        return (
          <>
            <StepHeader stepNumber={3} />
            <div className="mb-12">
              <label className="text-sm text-gray-500 mb-2 block">
                Residential Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={inputBaseClass}
                required
              />
            </div>
            <NavigationButtons disableNext={!formData.address} />
          </>
        );

        case 7:
            return (
              <>
                <StepHeader stepNumber={3} />
                <div className="space-y-8">
                  <div>
                    <label className="text-sm text-gray-500 mb-2 block">ID Type</label>
                    <select
                      name="identityType"
                      value={formData.identityType}
                      onChange={handleChange}
                      className={inputBaseClass}
                      required
                    >
                      <option value="">Select ID type</option>
                      <option value="passport">Passport</option>
                      <option value="driverLicense">Driver's License</option>
                      <option value="nationalId">National ID</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 mb-2 block">ID Number</label>
                    <input
                      type="text"
                      name="identityNumber"
                      value={formData.identityNumber}
                      onChange={handleChange}
                      className={inputBaseClass}
                      required
                    />
                  </div>
                </div>
                <NavigationButtons 
                  disableNext={!formData.identityType || !formData.identityNumber}
                />
              </>
            );

            case 8:
  return (
    <>
      <StepHeader stepNumber={3} />
      <div className="mb-12">
        <label className="text-sm text-gray-500 mb-2 block">
          Create Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`${inputBaseClass} ${
            validationErrors.password ? "border-red-500" : ""
          }`}
          required
        />
        {validationErrors.password && (
          <p className="text-red-500 text-sm mt-1">
            {validationErrors.password}
          </p>
        )}
      </div>
      <NavigationButtons
        disableNext={loading || !formData.password || validationErrors.password}
        isLastStep={true}
      />
    </>
  );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {successData ? (
        <SuccessCard />
      ) : (
        <div className="max-w-2xl mx-auto px-4 min-[650px]:px-4 py-8 min-[650px]:py-16">
          <div className="flex flex-col items-center">
            <p className="text-[14px] min-[300px]:mt-[70px] min-[300px]:ml-[11%] min-[900px]:ml-[110px] min-[650px]:text-[19px] self-start min-[650px]:ml-[120px] mt-[30px] min-[650px]:mt-[90px] mb-3 font-opensans font-medium px-2">
              Create Your Account in Three Easy Steps!
            </p>
            <div className="w-[280px] min-[650px]:w-[400px]">
              <form onSubmit={(e) => e.preventDefault()} className="px-0">
                {renderStep()}
                {error && (
                  <p className="text-red-600 text-center mt-4 text-sm">{error}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
