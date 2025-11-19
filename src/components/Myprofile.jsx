import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiExternalLink } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { SiSocialblade } from "react-icons/si";
import { FaSignsPost } from "react-icons/fa6";
const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newSocialLinks, setNewSocialLinks] = useState([]);
  const [linkInput, setLinkInput] = useState("");
  const [posts, setPosts] = useState([]);

  const backendUrl = `https://capncut-backend-1.onrender.com`;
  const token = localStorage.getItem("token");

  // normalize socialLinks into array
  const normalizeLinks = (links) => {
    if (!links) return [];
    if (Array.isArray(links)) return links;
    return links.split(",").map((l) => l.trim());
  };

  // ensure link has https:// or http://
  const formatLink = (link) => {
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      return  link;
    }
    return link;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        toast.error("Please log in");
        return;
      }
      try {
        const res = await axios.get(`${backendUrl}/myprofileData`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const normalizedLinks = normalizeLinks(res.data.socialLinks).map(formatLink);

        setProfile({ ...res.data, socialLinks: normalizedLinks });
        setNewUsername(res.data.userName);
        setNewSocialLinks(normalizedLinks);

        const postsRes = await axios.get(`${backendUrl}/myPosts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(postsRes.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, [backendUrl, token]);

  const handleUpdate = async () => {
    try {
      // format all links before sending to backend
      const formattedLinks = newSocialLinks.map(formatLink);

      const res = await axios.put(
        `${backendUrl}/updateProfile`,
        { userName: newUsername, socialLinks: formattedLinks },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedLinks = normalizeLinks(res.data.user.socialLinks).map(formatLink);
      setProfile({ ...res.data.user, socialLinks: updatedLinks });
      setNewSocialLinks(updatedLinks);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  const handleAddLink = () => {
    if (linkInput.trim() === "") return;
    setNewSocialLinks([...newSocialLinks, formatLink(linkInput)]);
    setLinkInput("");
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-200 text-white flex flex-col lg:flex-row px-6 sm:px-10 lg:px-20 gap-10 py-16">
      {/* Profile Card */}
      <div className="profile-card w-full lg:w-[28vw] bg-[#1b1b57] backdrop-blur-md border border-white/20 rounded-3xl flex flex-col items-center justify-center p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20">
        {profile ? (
          <div className="flex flex-col items-center w-full text-center gap-5">
            
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-5xl font-bold shadow-2xl">
              {profile.userName?.charAt(0).toUpperCase()}
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-3 bg-white/10 px-4 py-2 rounded-md border border-white/20 text-gray-300 flex gap-2 items-center hover:bg-white/20 transition"
            >
              <MdOutlineModeEdit size={18} /> Edit Profile
            </button>

            {isEditing ? (
              <>
                <p className="text-zinc-300 font-semibold text-[17px] mt-6">Username</p>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter new username"
                  className="px-4 py-2 w-[85%] rounded-lg bg-[#1b1b3a] text-white border border-blue-400 focus:ring-2 focus:ring-blue-500 transition"
                />

                {/* Social Links Input */}
                <div className="flex flex-col items-center w-full gap-2 mt-4">
                  <label className="text-gray-300 font-medium">
                    Add Social Media Links
                  </label>
                  <div className="flex gap-2 w-[85%]">
                    <input
                      type="text"
                      value={linkInput}
                      onChange={(e) => setLinkInput(e.target.value)}
                      placeholder="Enter a link"
                      className="px-4 py-2 w-full rounded-lg bg-[#1b1b3a] text-white border border-blue-400 focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <button
                      type="button"
                      onClick={handleAddLink}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-medium transition"
                    >
                      Add
                    </button>
                  </div>

                  {/* Display added links with delete option */}
                  <div className="flex flex-wrap gap-2 mt-3 w-[85%] justify-center">
                    {newSocialLinks.map((link, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-md border border-white/20"
                      >
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline text-sm break-all"
                        >
                          {link}
                        </a>
                        <button
                          type="button"
                          onClick={() =>
                            setNewSocialLinks(newSocialLinks.filter((_, index) => index !== i))
                          }
                          className="text-red-400 font-bold text-sm hover:text-red-600 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setNewUsername(profile.userName);
                      setNewSocialLinks(profile.socialLinks || []);
                    }}
                    className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md font-medium transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold mt-4">{profile.userName}</h1>
                <div className="flex items-center gap-2 border border-zinc-500 rounded-lg px-3 py-2 mt-1">
                  <IoMail className="text-blue-400" />
                  <p className="text-gray-300 font-medium text-[15px] break-all">{profile.email}</p>
                </div>

                <p className="text-[22px] font-semibold mt-6 mb-2 flex gap-2">
                  <SiSocialblade className="mt-2"/> Social Media Links
                  </p>

                {profile.socialLinks?.length === 0 && (
                  <div className="text-gray-500 font-medium">
                    No Social Media Links Added Yet  
                  </div>
                )}

                {profile.socialLinks?.length > 0 && (
                  <div className="mt-2 flex flex-col items-center gap-3">
                    {profile.socialLinks.map((link, i) => (
                      <div
                        key={i}
                        className="border border-zinc-500 rounded-lg px-4 py-2  hover:bg-white/10 transition"
                      >
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline flex items-center justify-center gap-2 font-medium text-[16px] break-all"
                        >
                          <FiExternalLink size={18} /> {link}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>

      {/* Posts Section */}
      <div className="flex-1 w-full">
        <h2 className="text-3xl sm:text-4xl mb-6 font-medium text-center lg:text-left text-zinc-800 flex gap-2">
          <FaSignsPost className="mt-1"/> My Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-400 text-center lg:text-left">Loading Posts...</p>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-[#10142e] p-6 rounded-2xl border border-white/20 shadow-md hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
              <h3 className="text-2xl text-blue-300 mb-2 font-semibold">{post.title}</h3>
                <p className="text-gray-200 line-clamp-3 text-[16px] font-medium">{post.Description}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="mt-4 rounded-xl w-full h-48 object-cover border border-white/10"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
