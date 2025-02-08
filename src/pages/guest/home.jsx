import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPenFancy, FaBookOpen, FaBuilding, FaBullseye } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import video from "../../assets/homepagevid.mp4";

const stories = [
  {
    id: 1,
    title: "Internship Success Story",
    author: "John Doe",
    date: "Feb 2025",
    summary: "Discover how this intern secured a top internship...",
  },
  {
    id: 2,
    title: "From Classroom to Office",
    author: "Jane Smith",
    date: "Jan 2025",
    summary: "A journey of learning and adapting in a corporate world...",
  },
  {
    id: 3,
    title: "Breaking Into Tech",
    author: "Alice Johnson",
    date: "Dec 2024",
    summary: "Insights on how to land your first tech internship...",
  },
];

const companies = [
  {
    id: 1,
    name: "Company A",
    description:
      "Company A is a leading software development firm specializing in AI-driven applications...",
  },
  {
    id: 2,
    name: "Company B",
    description:
      "Company B is a global tech company focusing on cybersecurity solutions...",
  },
  {
    id: 3,
    name: "Company C",
    description:
      "Company C is a fintech startup revolutionizing digital banking solutions...",
  },
];

const slideFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const Home = () => {
  const [isSingleColumn, setIsSingleColumn] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsSingleColumn(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-[22rem] md:h-[34rem]  flex items-center justify-center text-center text-white">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for better text visibility */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <Typewriter
              words={["Find Internships & Build Your Career"]}
              loop={1}
              cursor={false}
              typeSpeed={80}
            />
          </h1>
          <p className="text-lg md:text-xl mb-6">
            <Typewriter
              words={[
                "Explore opportunities, learn from experiences, and connect with companies.",
              ]}
              loop={1}
              cursor={false}
              typeSpeed={50}
            />
          </p>
        </div>
      </section>

      {/* Companies & Stories Section */}
      <section className="max-w-[90%] lg:max-w-[95%] mx-auto py-8 px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.01 }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 w-full"
        >
          {/* Companies */}
          <motion.div
            variants={isSingleColumn ? fadeUp : slideFromLeft}
            className="flex flex-col w-full"
          >
            <h2 className="text-3xl font-bold text-center mb-5 text-[#284A93]">
              Featured Companies
            </h2>
            <div className="grid gap-6 flex-1 mb-6 md:mb-0 w-full">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col h-full w-full"
                >
                  <FaBuilding className="text-[#284A93] text-4xl mx-auto mb-4" />
                  <h3 className="font-bold text-xl">{company.name}</h3>
                  <p className="text-gray-600 flex-grow">
                    {company.description}
                  </p>
                  <Link
                    to={`/companies/${company.id}`}
                    className="mt-4 bg-[#284A93] text-white px-4 py-2 rounded"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stories */}
          <motion.div
            variants={isSingleColumn ? fadeUp : slideFromRight}
            className="flex flex-col w-full"
          >
            <h2 className="text-3xl font-bold text-center mb-5 text-[#284A93]">
              Featured Stories
            </h2>
            <div className="grid gap-6 flex-1 w-full">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full w-full"
                >
                  <h3 className="font-bold text-xl mb-2">{story.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    By {story.author} - {story.date}
                  </p>
                  <p className="text-gray-600 flex-grow">{story.summary}</p>
                  <Link to="/stories"></Link>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About & Mission */}
      <section className="bg-[#284A93] text-white py-14 px-8 mt-8 text-center md:mt-20">
        <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
        <p className="text-lg max-w-3xl mx-auto">
          We empower interns by connecting them with top companies and valuable
          resources. Our vision is to create the largest internship ecosystem
          for aspiring professionals.
        </p>
      </section>
    </div>
  );
};

export default Home;
