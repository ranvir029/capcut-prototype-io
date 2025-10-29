import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoMail } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";

const PublicProfile = () => {
  const { username } = useParams(); // from route /profile/:username
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  useEffect(() => {
    async function fetchProfile() {
      const res = await axios.get(`https://capncut-backend-1.onrender.com/profile/${username}`);
      setSocialMediaLinks(res.data.user.socialLinks || []);
      setProfile(res.data.user);
      setPosts(res.data.posts);
    }
    fetchProfile();
  }, [username]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a24] to-[#1a1a4b] text-white px-10 py-10">
      {profile ? (
        <>
          <div className="flex flex-col items-center mb-10">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold shadow-lg">
              {profile.userName.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-3xl font-bold mt-4 mb-2 flex gap-2">
              {profile.userName}</h1>
            <p className="text-gray-300 flex gap-2">
                <IoMail className="text-blue-400 mt-1" />
              {profile.email}</p>
          </div>
          {/* Social Media Links Section */}
          <div className="flex flex-col items-center mb-10">
            {socialMediaLinks.length === 0 ? (
              <div className="text-gray-400 text-sm italic">
                No Social Media Links Added Yet
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-medium">Social Media Links</h1>
                <div className="flex flex-wrap gap-4 justify-center mt-2">
                  {socialMediaLinks.map((item, index) => (
                    <a
                      key={index}
                      href={item}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500/20 border border-blue-400/30 flex gap-2 px-4 py-2 rounded-xl hover:bg-blue-600/30 transition-all duration-300 text-blue-300 font-medium shadow-md hover:shadow-blue-500/30"
                    >
                      <FiExternalLink className="mt-[2.3px]" />{item}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Posts Section */}
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Posts by {profile.userName}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length === 0 ? (
              <p className="text-gray-400 text-lg text-center col-span-full">
                No posts yet 😕
              </p>
            ) : (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white/10 hover:bg-white/20 transition-all duration-300 p-6 rounded-2xl border border-white/20 shadow-lg"
                >
                  <h3 className="text-2xl font-semibold text-blue-300 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-200 text-sm text-justify">
                    {post.Description}
                  </p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-xl mt-4 border border-white/20"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-300 text-center">Loading profile...</p>
      )}
    </div>
  );
};

export default PublicProfile;
