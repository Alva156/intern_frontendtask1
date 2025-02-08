import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaBuilding, FaTimes } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const companiesData = [
  {
    id: 1,
    name: "Company A",
    details:
      "Company A is a leading software development firm specializing in AI-driven applications. They provide interns with hands-on experience working on real-world projects, offering mentorship from senior developers and opportunities to contribute to cutting-edge innovations.",
    roles: ["Software Developer", "Business Analyst", "Project Manager"],
  },
  {
    id: 2,
    name: "Company B",
    details:
      "Company B is a global tech company focusing on cybersecurity solutions. Interns gain exposure to security frameworks, encryption techniques, and penetration testing, preparing them for careers in the cybersecurity field.",
    roles: ["Cybersecurity Analyst", "Software Developer", "Project Manager"],
  },
  {
    id: 3,
    name: "Company C",
    details:
      "Company C is a fintech startup revolutionizing digital banking solutions. Interns collaborate on mobile payment applications, fraud detection algorithms, and financial analytics tools, gaining deep industry insights.",
    roles: ["Software Developer", "Business Analyst", "UI/UX Designer"],
  },
  {
    id: 4,
    name: "Company D",
    details:
      "Company D is a multinational IT consulting firm that helps businesses implement digital transformation strategies. Interns work on system integration, cloud computing, and enterprise application development.",
    roles: ["Software Developer", "Project Manager", "Data Analyst"],
  },
  {
    id: 5,
    name: "Company E",
    details:
      "Company E is a digital marketing agency leveraging AI and automation to optimize advertising campaigns. Interns learn about data-driven marketing, SEO optimization, and customer behavior analysis.",
    roles: ["Business Analyst", "Software Developer", "Project Manager"],
  },
  {
    id: 6,
    name: "Company F",
    details:
      "Company F is a game development studio known for creating immersive gaming experiences. Interns contribute to game design, animation, and AI-driven NPC behavior, enhancing their knowledge in game development.",
    roles: ["Game Developer", "Software Developer", "UI/UX Designer"],
  },
  {
    id: 7,
    name: "Company G",
    details:
      "Company G is a fast-growing AI research lab working on natural language processing and machine learning applications. Interns assist in model training, data preprocessing, and algorithm optimization.",
    roles: [
      "Machine Learning Engineer",
      "Software Developer",
      "Data Scientist",
    ],
  },
  {
    id: 8,
    name: "Company H",
    details:
      "Company H is a multinational e-commerce giant providing cloud-based retail solutions. Interns gain experience in backend systems, supply chain automation, and personalized recommendation algorithms.",
    roles: ["Software Developer", "Business Analyst", "Project Manager"],
  },
  {
    id: 9,
    name: "Company I",
    details:
      "Company I is a software firm specializing in healthcare technology. Interns work on electronic medical records, telemedicine platforms, and AI-based diagnostics, contributing to healthcare innovation.",
    roles: ["Software Developer", "Business Analyst", "Data Scientist"],
  },
  {
    id: 10,
    name: "Company J",
    details:
      "Company J is a blockchain startup focused on decentralized applications and cryptocurrency security. Interns explore blockchain architecture, smart contracts, and cryptographic protocols.",
    roles: ["Blockchain Developer", "Software Developer", "Project Manager"],
  },
  {
    id: 11,
    name: "Company K",
    details:
      "Company K is a multinational cloud computing company offering enterprise-level cloud solutions. Interns work on scalable infrastructure, containerization, and cloud security measures.",
    roles: ["Cloud Engineer", "Software Developer", "DevOps Engineer"],
  },
  {
    id: 12,
    name: "Company L",
    details:
      "Company L is an IoT-focused startup developing smart home automation systems. Interns participate in embedded systems programming, wireless communication protocols, and AI-powered automation.",
    roles: ["IoT Engineer", "Software Developer", "Hardware Engineer"],
  },
];

const ITEMS_PER_PAGE = 6;

function Companies() {
  const { id } = useParams();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const modalRef = useRef(null);
  useEffect(() => {
    if (id) {
      const company = companiesData.find((c) => c.id === parseInt(id));
      if (company) {
        setSelectedCompany(company);
      }
    }
  }, [id]);

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentCompanies = companiesData.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(companiesData.length / ITEMS_PER_PAGE);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedCompany(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleApplyClick = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Hiring Companies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCompanies.map((company) => (
          <div
            key={company.id}
            className="p-6 shadow-md hover:shadow-lg cursor-pointer bg-white rounded-lg text-center"
            onClick={() => setSelectedCompany(company)}
          >
            <FaBuilding className="text-[#284A93] text-4xl mb-4 mx-auto" />
            <h2 className="text-lg font-semibold">{company.name}</h2>
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
        activeClassName="bg-blue-500 text-white"
      />

      {selectedCompany && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center relative"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedCompany(null)}
            >
              <FaTimes className="text-xl" />
            </button>
            <FaBuilding className="text-4xl mx-auto text-[#284A93] mb-4" />
            <h2 className="text-xl font-bold mb-2">{selectedCompany.name}</h2>
            <p className="text-gray-600 mb-4">{selectedCompany.details}</p>
            <h3 className="text-lg font-semibold">Available Roles:</h3>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              {selectedCompany.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleApplyClick}
            >
              Apply Now
            </button>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg">
          You must log in first to apply.
        </div>
      )}
    </div>
  );
}

export default Companies;
