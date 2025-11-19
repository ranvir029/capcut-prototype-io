import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline, IoLocationOutline } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
const Freelancer = () => {
  const [form, setForm] = useState(false);
  const [portfolioData, setportfolioData] = useState([]);

  const backendUrl = "http://localhost:3000";

  function handelPortfolio() {
    const checkUserToken = localStorage.getItem("token");
    if (!checkUserToken)
      return toast.error("Please Login To Add Your Credentials");
    setForm(true);
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    Profession: "",
    Bio: "",
    Skills: "",
    Location: "",
    Experience: "",
    Baseprice: "",
    Portfolio: "",
  });

  async function handelUserFreelancingDetails(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const userFreelancingDetails = await axios.post(
        `${backendUrl}/freelancer`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (userFreelancingDetails.status === 201) {
        setportfolioData((prev) => [...prev, userFreelancingDetails.data.data]);
        toast.success(userFreelancingDetails.data.message);
        setForm(false);
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Something went wrong");
    }
  }

  function handelFormData(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function getPortFolioData() {
    try {
      const getData = await axios.get(`${backendUrl}/freelancer`);
      if (getData.status === 200 && Array.isArray(getData.data.PortfolioData)) {
        setportfolioData(getData.data.PortfolioData);
      }
      setForm(false);
    } catch (e) {
      console.log(e);
      toast.error("Unable to load portfolio data");
    }
  }

  useEffect(() => {
    getPortFolioData();
  }, []);

  return (
    <div>
      {/* MAIN SECTION */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen overflow-y-auto no-scrollbar">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Unlock Your Potential with Freelancing
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Join a vibrant community of freelancers and clients to discover
              opportunities.
            </p>
          </div>
        </div>

        {/* FORM MODAL */}
        {form && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[92vw] sm:w-[70vw] lg:w-[50vw] max-h-[90vh] overflow-y-auto no-scrollbar">
              {/* HEADER */}
              <div className="font-semibold mb-3 flex justify-between items-center">
                <h1 className="text-[24px]">Add Your Details</h1>
                <button
                  className="text-red-600 hover:text-red-400 cursor-pointer"
                  onClick={() => setForm(false)}
                >
                  <IoCloseCircleOutline size={28} />
                </button>
              </div>

              <div className="border-b border-gray-300 mb-4"></div>

              {/* FORM */}
              <form
                className="flex flex-col gap-4"
                onSubmit={handelUserFreelancingDetails}
              >
                {/* NAME + EMAIL */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div className="flex flex-col w-full sm:w-[45%]">
                    <label>Name</label>
                    <input
                      type="text"
                      className="outline outline-gray-300 p-2 rounded-lg"
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handelFormData}
                      required
                    />
                  </div>

                  <div className="flex flex-col w-full sm:w-[45%]">
                    <label>Email</label>
                    <input
                      type="email"
                      className="outline outline-gray-300 p-2 rounded-lg"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handelFormData}
                      required
                    />
                  </div>
                </div>

                {/* Profession */}
                <label>Profession</label>
                <input
                  type="text"
                  className="outline outline-gray-300 p-2 rounded-lg"
                  placeholder="Add Your Profession"
                  name="Profession"
                  value={formData.Profession}
                  onChange={handelFormData}
                  required
                />

                {/* Bio */}
                <label>Bio</label>
                <textarea
                  className="outline outline-gray-300 p-2 rounded-lg h-[12vh] resize-none"
                  placeholder="Tell us about yourself…"
                  name="Bio"
                  value={formData.Bio}
                  onChange={handelFormData}
                  required
                />

                {/* Skills */}
                <label>Skills</label>
                <input
                  type="text"
                  className="outline outline-gray-300 p-2 rounded-lg"
                  placeholder="List your skills…"
                  name="Skills"
                  value={formData.Skills}
                  onChange={handelFormData}
                  required
                />

                {/* Location */}
                <label>Location</label>
                <input
                  type="text"
                  className="outline outline-gray-300 p-2 rounded-lg"
                  placeholder="Location"
                  name="Location"
                  value={formData.Location}
                  onChange={handelFormData}
                  required
                />

                {/* Experience */}
                <label>Experience</label>
                <input
                  type="text"
                  className="outline outline-gray-300 p-2 rounded-lg"
                  placeholder="Add your experience (optional)"
                  name="Experience"
                  value={formData.Experience}
                  onChange={handelFormData}
                />

                {/* Base Price */}
                <label>Base Price / Hourly</label>
                <input
                  type="number"
                  className="outline outline-gray-300 p-2 rounded-lg"
                  placeholder="Your hourly rate (₹)"
                  name="Baseprice"
                  value={formData.Baseprice}
                  onChange={handelFormData}
                  required
                />

                {/* Portfolio */}
                <label>Portfolio Link</label>
                <input
                  type="url"
                  className="outline outline-gray-300 p-2 rounded-lg"
                  placeholder="Add Your Portfolio Link"
                  name="Portfolio"
                  value={formData.Portfolio}
                  onChange={handelFormData}
                  required
                />

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ADD BUTTON */}
        <div className="flex justify-center items-center">
          <button
            className="bg-blue-600 text-white rounded-[10px] p-4 mb-4 text-[17px] font-medium cursor-pointer"
            onClick={handelPortfolio}
          >
            Add Your Portfolio
          </button>
        </div>

        {/* PORTFOLIO SECTION */}
        <div>
          {portfolioData.length === 0 && (
            <div className="text-black font-medium text-2xl text-center mt-3">
              <ClipLoader size={30} />
            </div>
          )}

          {portfolioData.length > 0 && (
            <>
              <div className="text-center mt-6 mb-8">
                <h1 className="text-blue-500 font-semibold text-3xl sm:text-4xl lg:text-5xl inline-block relative pb-2">
                  Discover Our Featured Freelancers
                  <span className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-[60%] h-[3px] bg-blue-500 rounded-full"></span>
                </h1>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 sm:px-8 py-12">
                {portfolioData.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white shadow-lg rounded-2xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-600 rounded-full w-20 h-20 flex items-center justify-center text-white text-2xl font-semibold shadow-md">
                          {item.name?.charAt(0)}
                        </div>

                        <div>
                          <h1 className="text-2xl md:text-xl   font-semibold text-gray-800">
                            {item.name}
                          </h1>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-2">
                        <p className="text-gray-500 text-sm font-medium flex items-center gap-2">
                          <BsPersonWorkspace className="text-lg" />
                          {item.Profession}
                        </p>

                        <p className="text-gray-500 text-sm font-medium flex items-center gap-2">
                          <MdEmail className="text-lg" />
                          {item.email}
                        </p>
                      </div>

                      <div className="mt-5">
                        <h2 className="text-blue-600 font-semibold text-lg">
                          Bio
                        </h2>
                        <p className="text-gray-700 mt-1 text-sm leading-relaxed text-justify ">
                          {item.Bio}
                        </p>
                      </div>

                      <div className="mt-4">
                        <h2 className="text-blue-600 font-semibold text-lg">
                          Experience
                        </h2>
                        <p className="text-gray-700 mt-1 text-sm">
                          {item.Experience || "No Experience Added"}
                        </p>
                      </div>

                      <div className="mt-4">
                        <h2 className="text-blue-600 font-semibold text-lg">
                          Skills
                        </h2>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.Skills && item.Skills.length > 0 ? (
                            item.Skills.split(",").map((skill, i) => (
                              <span
                                key={i}
                                className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-lg text-gray-700 text-sm font-medium shadow-sm hover:bg-blue-100 hover:border-blue-400 transition-all"
                              >
                                {skill.trim()}
                              </span>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm">
                              No skills listed
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-5 text-gray-700">
                        <IoLocationOutline
                          size={22}
                          className="text-blue-600"
                        />
                        <p className="text-[16px] font-medium">
                          {(item.Location || "").toUpperCase()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-4 text-gray-700">
                        <RiMoneyRupeeCircleFill
                          size={28}
                          className="text-green-600"
                        />
                        <p className="text-[16px] font-medium">
                          {item.Baseprice}/hourly
                        </p>
                      </div>
                    </div>

                    <button className="mt-6 p-4 bg-blue-600 hover:bg-blue-700 text-white w-full rounded-xl text-lg font-semibold shadow-md transition-all">
                      <a href={item.Portfolio} target="_blank" rel="noreferrer">
                        Visit Portfolio
                      </a>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Freelancer;
