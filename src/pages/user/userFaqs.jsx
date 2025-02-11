import { useState } from "react";
import ReactPaginate from "react-paginate";
//faqs array of data
const faqData = [
  {
    id: 1,
    question: "What is this platform about?",
    answer: "This platform connects alumni and provides useful insights.",
  },
  {
    id: 2,
    question: "How do I register?",
    answer: "Click on the Sign Up button and follow the instructions.",
  },
  {
    id: 3,
    question: "Is my data secure?",
    answer: "Yes, we implement security measures to protect your data.",
  },
  {
    id: 4,
    question: "Can I update my profile?",
    answer: "Yes, you can edit your profile information anytime.",
  },
  {
    id: 5,
    question: "How do I reset my password?",
    answer: "Go to the login page and click 'Forgot Password'.",
  },
  {
    id: 6,
    question: "Can I delete my account?",
    answer: "Yes, go to settings and choose the delete account option.",
  },
  {
    id: 7,
    question: "Is there a mobile app?",
    answer: "Currently, we only offer a web platform.",
  },
  {
    id: 8,
    question: "How can I contact support?",
    answer: "You can reach us through our Contact Us page.",
  },
  {
    id: 9,
    question: "Are there any membership fees?",
    answer: "No, the platform is free for all alumni.",
  },
  {
    id: 10,
    question: "Can I network with other alumni?",
    answer: "Yes, you can connect and communicate with fellow alumni.",
  },
  {
    id: 11,
    question: "How do I report an issue?",
    answer: "You can submit a support ticket through our help center.",
  },
  {
    id: 12,
    question: "Can I share my success story?",
    answer: "Yes, we encourage alumni to share their experiences.",
  },
];
//6 caqs per page
const ITEMS_PER_PAGE = 6;

function FAQS() {
  //Initialization
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentFAQs = faqData.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(faqData.length / ITEMS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h1>
      {/* faqs interface */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentFAQs.map((faq) => (
          <div key={faq.id} className="p-6 shadow-md bg-white rounded-lg">
            <h2 className="text-lg font-semibold mb-2">{faq.question}</h2>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName="flex justify-center space-x-2 mt-6"
        pageClassName="px-3 py-1 border rounded-md hover:bg-gray-200"
        activeClassName="bg-[#284A93] text-white"
      />
    </div>
  );
}

export default FAQS;
