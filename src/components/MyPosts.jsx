import React, { useEffect, useState } from "react";
import axios from "axios";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  const backendUrl = `https://capncut-backend-1.onrender.com`;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/myPosts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col p-5 md:p-10 bg-[#101034]">
      <h1 className="text-white text-4xl md:text-5xl font-semibold mb-4 text-center md:text-left">
        My Posts
      </h1>
      <div className="border-b border-zinc-500 mb-8 w-full"></div>

      {posts.length === 0 ? (
        <h2 className="text-white text-xl text-center mt-10">No posts yet.</h2>
      ) : (
        <div className="flex flex-col items-center gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col w-full md:w-[70%] gap-4"
            >
              <div className="bg-blue-700 p-6 md:p-8 rounded-lg shadow-lg text-white hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-semibold text-2xl md:text-3xl mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-200 text-justify md:text-lg">
                  {post.Description}
                </p>
              </div>

              {post.image && (
                <div className="w-full overflow-hidden rounded-lg shadow-md">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full max-h-96 object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
