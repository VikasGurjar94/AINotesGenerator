import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentOrder, verifyPayment, getCurrentUser } from "../services/api";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function Pricing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const handlePayment = async (amount) => {
    setPaying(true);
    setPayingAmount(amount);

    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setPaying(false);
      setPayingAmount(null);
      return;
    }

    try {
      const result = await createPaymentOrder(amount);
      if (!result.success) {
        alert("Server error. Please try again.");
        setPaying(false);
        setPayingAmount(null);
        return;
      }

      const { amount: orderAmount, id: order_id, currency } = result.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: orderAmount.toString(),
        currency: currency,
        name: "ExamNotes AI",
        description: "Credit Purchase",
        order_id: order_id,
        handler: async function (response) {
          try {
            const verifyResult = await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amount: amount
            });
            if (verifyResult.success) {
              alert("Payment successful! Credits added.");
              getCurrentUser(dispatch); // Refresh user data
            }
          } catch (error) {
            console.error(error);
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: userData?.name || "",
          email: userData?.email || "",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
      paymentObject.on("payment.failed", function (response) {
        alert("Payment Failed");
        console.error(response.error);
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setPaying(false);
    setPayingAmount(null);
  };
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 relative">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
      >
        ⬅️ Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold">Buy Credits</h1>
        <p className="text-gray-600 mt-2">
          Choose a plan that fits your study needs
        </p>
      </motion.div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <PricingCard
          title="Starter"
          price="₹100"
          amount={100}
          credits="50 Credits"
          description="Perfect for quick revisions"
          features={[
            "Generate AI notes",
            "Exam-focused answers",
            "Diagram & charts support",
            "Fast generation",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePayment}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          popular
          title="Popular"
          price="₹200"
          amount={200}
          credits="120 Credits"
          description="Best value for students"
          features={[
            "All Starter features",
            "More credits per ₹",
            "Revision mode access",
            "Priority AI response",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePayment}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          title="Pro Learner"
          price="₹500"
          amount={500}
          credits="300 Credits"
          description="For serious exam preparation"
          features={[
            "Maximum credit value",
            "Unlimited revisions",
            "Charts & diagrams",
            "Ideal for full syllabus",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePayment}
          paying={paying}
          payingAmount={payingAmount}
        />
      </div>
    </div>
  );
}

function PricingCard({
  title,
  price,
  amount,
  credits,
  description,
  features,
  popular,
  selectedPrice,
  setSelectedPrice,
  onBuy,
  paying,
  payingAmount,
}) {
  const isSelected = selectedPrice === amount;
  const isPayingThisCard = paying && payingAmount === amount;
  return (
    <motion.div
      onClick={() => setSelectedPrice(amount)}
      whileHover={{ y: -4 }}
      className={`
        relative cursor-pointer 
        rounded-xl p-6 bg-white 
        border transition 
        ${
          isSelected
            ? "border-black"
            : popular
              ? "border-indigo-500"
              : "border-gray-200"
        }
    `}
    >
      {popular && !isSelected && (
        <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded bg-indigo-600 text-white">
          Popular
        </span>
      )}

      {isSelected && (
        <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded bg-black text-white">
          Selected
        </span>
      )}

      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{description}</p>

      <div className="mt-4">
        <p className="text-3xl font-bold">{price}</p>
        <p className="text-sm text-indigo-600">{credits}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onBuy(amount);
        }}
        disabled={isPayingThisCard}
        className={`
w-full mt-5 py-2 rounded-lg font-medium transition
${
  isPayingThisCard
    ? "bg-gray-300 cursor-not-allowed"
    : isSelected
      ? "bg-black text-white"
      : "bg-indigo-600 text-white hover:bg-indigo-700"
}
`}
      >
        {isPayingThisCard ? "Redirecting . . ." : "Buy Now"}
      </button>
      <ul className="mt-5 space-y-2 text-sm text-gray-600">
        {features.map((f, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-green-600">✓</span>
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default Pricing;
