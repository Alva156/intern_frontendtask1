import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaBookOpen, FaTimes } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const storiesData = [
  {
    id: 1,
    title: "Overcoming Challenges in Tech",
    content:
      "My journey in tech started with countless challenges, from debugging nightmares to imposter syndrome. Hard work, patience, and continuous learning helped me grow into a confident developer.",
    author: "John Doe",
    date: "January 15, 2024",
  },
  {
    id: 2,
    title: "First Internship Experience",
    content:
      "Starting my first internship was nerve-wracking, but it turned out to be a great learning experience. I worked on real projects, collaborated with a team, and improved my coding skills.",
    author: "Jane Smith",
    date: "February 10, 2024",
  },
  {
    id: 3,
    title: "How I Built My First App",
    content:
      "Building my first app was an exciting journey, filled with late-night coding and endless debugging. Seeing people use something I created was incredibly fulfilling.",
    author: "Alex Johnson",
    date: "March 5, 2024",
  },
  {
    id: 4,
    title: "The Power of Networking",
    content:
      "Networking helped me land my first job. Attending events and reaching out to professionals made all the difference in securing valuable opportunities.",
    author: "Emily Brown",
    date: "April 22, 2024",
  },
  {
    id: 5,
    title: "From Student to Software Engineer",
    content:
      "Transitioning from a student to a full-time software engineer was a rollercoaster ride. Learning to work under pressure and adapting to a professional environment were key milestones.",
    author: "Michael Lee",
    date: "May 30, 2024",
  },
  {
    id: 6,
    title: "Lessons from a Failed Startup",
    content:
      "Starting a startup was exciting but ended in failure. However, the lessons I learned about teamwork, business strategy, and resilience were invaluable for my career.",
    author: "Sarah Williams",
    date: "June 12, 2024",
  },
  {
    id: 7,
    title: "Breaking Into Cybersecurity",
    content:
      "Cybersecurity always fascinated me. After months of self-study and certifications, I landed my first job securing networks and preventing cyber threats.",
    author: "Daniel Green",
    date: "July 25, 2024",
  },
  {
    id: 8,
    title: "My Experience as a Remote Developer",
    content:
      "Working remotely has its challenges but also offers great flexibility. Managing time effectively and staying self-motivated were crucial to my success.",
    author: "Sophia Martinez",
    date: "August 18, 2024",
  },
  {
    id: 9,
    title: "The Importance of Open Source Contributions",
    content:
      "Contributing to open source projects not only improved my coding skills but also connected me with amazing developers worldwide.",
    author: "Kevin Roberts",
    date: "September 10, 2024",
  },
  {
    id: 10,
    title: "Why Soft Skills Matter in Tech",
    content:
      "Beyond coding, communication and teamwork are essential in tech. Developing these skills helped me collaborate better and grow in my career.",
    author: "Laura Wilson",
    date: "October 5, 2024",
  },
  {
    id: 11,
    title: "Balancing Work and Personal Life in Tech",
    content:
      "Burnout is real in tech. Setting boundaries and prioritizing self-care helped me stay productive and happy.",
    author: "David Clark",
    date: "November 22, 2024",
  },
  {
    id: 12,
    title: "The Future of AI and My Journey in ML",
    content:
      "Machine learning is shaping the future. Diving into AI projects and learning new algorithms has been an exciting and rewarding experience.",
    author: "Emma Taylor",
    date: "December 14, 2024",
  },
];

const ITEMS_PER_PAGE = 6;

function Stories() {
  const { id } = useParams();
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const modalRef = useRef(null);
  useEffect(() => {
    if (id) {
      const story = storiesData.find((c) => c.id === parseInt(id));
      if (story) {
        setSelectedStory(story);
      }
    }
  }, [id]);

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentStories = storiesData.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(storiesData.length / ITEMS_PER_PAGE);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedStory(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Inspiring Stories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentStories.map((story) => (
          <div
            key={story.id}
            className="p-6 shadow-md hover:shadow-lg cursor-pointer bg-white rounded-lg text-center"
            onClick={() => setSelectedStory(story)}
          >
            <FaBookOpen className="text-[#284A93] text-4xl mb-4 mx-auto" />
            <h2 className="text-lg font-semibold">{story.title}</h2>
            <p className="text-sm text-gray-600">by {story.author}</p>
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

      {selectedStory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white mx-5 p-6 rounded-lg shadow-lg max-w-md w-full text-center relative"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedStory(null)}
            >
              <FaTimes className="text-xl" />
            </button>
            <FaBookOpen className="text-4xl mx-auto text-[#284A93] mb-4" />
            <h2 className="text-xl font-bold mb-2">{selectedStory.title}</h2>
            <p className="text-gray-600 text-sm mb-2">
              by {selectedStory.author} | {selectedStory.date}
            </p>
            <p className="text-gray-700">{selectedStory.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stories;
