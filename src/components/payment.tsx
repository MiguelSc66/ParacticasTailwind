import React, { useState, FormEvent } from "react";

const Payment = () => {
  const [formValues, setFormValues] = useState({
    mortgageAmount: "",
    mortgageTerm: "",
    interestRate: "",
    mortgageType: "repayment",
  });

  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalRepayment, setTotalRepayment] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleClear = () => {
    setFormValues({
      mortgageAmount: "",
      mortgageTerm: "",
      interestRate: "",
      mortgageType: "repayment",
    });
    setMonthlyPayment(null);
    setTotalRepayment(null);
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const principal = parseFloat(formValues.mortgageAmount);
    const termInMonths = parseFloat(formValues.mortgageTerm) * 12;
    const monthlyInterestRate = parseFloat(formValues.interestRate) / 100 / 12;

    if (formValues.mortgageType === "repayment") {
      const monthlyPayment =
        (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -termInMonths));
      const totalRepayment = monthlyPayment * termInMonths;
      setMonthlyPayment(monthlyPayment);
      setTotalRepayment(totalRepayment);
    } else if (formValues.mortgageType === "interest-only") {
      const monthlyPayment = principal * monthlyInterestRate;
      const totalRepayment = monthlyPayment * termInMonths;
      setMonthlyPayment(monthlyPayment);
      setTotalRepayment(totalRepayment);
    }
  };

  return (
    <div className="flex items-center justify-center bg-slate-400 w-screen h-screen">
      <div className="bg-white rounded-3xl shadow-lg h-[64%] w-[60%] sm:w-[80%] md:w-[85%] lg:w-[60%] flex xs:flex-col xs:h-full xs:w-full xs:rounded-none">
        <div className="w-1/2 p-10 xs:w-full">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-8 xs:flex-col xs:text-left ">
              <h1 className="text-2xl font-bold">Mortgage Calculator</h1>
              <button
                type="button"
                className="underline text-gray-500 xs:text-left xs:mt-4"
                onClick={handleClear}
              >
                Clear All
              </button>
            </div>
            <div className="space-y-4 mt-[12%]">
              <label className="block text-gray-600 mb-2 text-lg">
                Mortgage Amount
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg hover:border-lime-600 hover:bg-lime-600/20 transition-colors duration-300 group">
                <span className="bg-blue-100 text-gray-500 p-4 text-lg rounded-l-md group-hover:bg-lime-600 group-hover:text-white transition-colors duration-300">
                  £
                </span>
                <input
                  type="text"
                  className="w-full rounded-r-lg focus:outline-none text-lg bg-transparent "
                  name="mortgageAmount"
                  value={formValues.mortgageAmount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex space-x-4 xs:flex-col xs:space-x-0">
                <div className="flex-1">
                  <label className="block text-gray-600 mb-2">
                    Mortgage Term
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg hover:border-lime-600 hover:bg-lime-600/20 transition-colors duration-300 group">
                    <input
                      type="text"
                      className="p-4 w-full rounded-l-lg focus:outline-none text-lg h-12 bg-transparent"
                      name="mortgageTerm"
                      value={formValues.mortgageTerm}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="bg-blue-100 text-gray-500 p-3 text-lg rounded-r-md group-hover:bg-lime-600 group-hover:text-white">
                      years
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-600 mb-2">
                    Interest Rate
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg hover:border-lime-600 hover:bg-lime-600/20 transition-colors duration-300 group">
                    <input
                      type="text"
                      className="p-4 w-full rounded-l-lg focus:outline-none text-lg h-12 bg-transparent"
                      name="interestRate"
                      value={formValues.interestRate}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="bg-blue-100 text-gray-500 p-3 text-lg rounded-r-md group-hover:bg-lime-600 group-hover:text-white">
                      %
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-2">
                  Mortgage Type
                </label>
                <div className="space-y-2">
                  <div className="flex items-center border border-gray-300 rounded-lg hover:border-lime-600 hover:bg-lime-600/20 transition-colors duration-300">
                    <input
                      type="radio"
                      name="mortgageType"
                      id="repayment"
                      className="ml-4 cursor-pointer focus:ring-0"
                      checked={formValues.mortgageType === "repayment"}
                      onChange={handleInputChange}
                      value="repayment"
                    />
                    <label
                      htmlFor="repayment"
                      className="ml-2 p-3 text-gray-600"
                    >
                      Repayment
                    </label>
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-lg hover:border-lime-600 hover:bg-lime-600/20 transition-colors duration-300">
                    <input
                      type="radio"
                      name="mortgageType"
                      id="interest-only"
                      className="ml-4 cursor-pointer focus:ring-0"
                      checked={formValues.mortgageType === "interest-only"}
                      onChange={handleInputChange}
                      value="interest-only"
                    />
                    <label
                      htmlFor="interest-only"
                      className="ml-2 p-3 text-gray-600"
                    >
                      Interest Only
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className=" bg-lime-600 text-white py-2 px-4 rounded-3xl w-[65%] xs:w-full"
              >
                Calculate Repayments
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/2 bg-slate-800 h-full p-8 rounded-tr-3xl rounded-br-3xl rounded-tl-none rounded-bl-[6rem] xs:rounded-none xs:w-full xs:p-6">
          {monthlyPayment === null ? (
            <div className=" flex flex-col p-8 items-center justify-center mt-20">
              <img
                src="https://res.cloudinary.com/duclhjrri/image/upload/v1723578704/ilustracion-dinero-aislada_23-2151568536-removebg-preview_qedb8u.png"
                alt="money"
                className="w-auto h-auto  lg:xl:w-[60%] lg:xl:h-[60%] mb-6"
              />
              <span className="text-white text-center">
                Here, the results of the calculations will be displayed.
              </span>
            </div>
          ) : (
            <div className="text-white p-3 rounded-lg w-full">
              <h1 className="text-2xl font-bold mb-4">Your results</h1>
              <p className="text-md text-gray-400 mb-4">
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click
                "calculate repayments" again.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg mt-10 h-auto border-t-4 border-lime-400">
                <div className="ml-4">
                  <p className="text-sm text-gray-400 mt-4">
                    Your monthly repayments
                  </p>
                  <p className="text-3xl font-bold mb-4 mt-3 text-lime-400">
                    £{monthlyPayment.toFixed(2)}
                  </p>
                  <hr className="border-gray-600 mt-8" />
                  <p className="text-sm text-gray-400 mt-6">
                    Total you'll repay over the term
                  </p>
                  <p className="text-xl font-bold text-white mt-3">
                    £{totalRepayment?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
