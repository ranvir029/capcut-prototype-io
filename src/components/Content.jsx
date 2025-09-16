import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { LuUpload } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// small subcomponent for comment input
const CommentInput = ({ onSubmit }) => {
  const [text, setText] = useState("");
  return (
    <div className="flex mt-2 gap-2">
      <input
        className="flex-1 border border-gray-300 rounded p-1 text-sm"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-3 rounded text-sm"
        onClick={() => {
          if (!text.trim()) return;
          onSubmit(text.trim());
          setText("");
        }}
      >
        Post
      </button>
    </div>
  );
};

const Content = ({ showModal, setShowModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    tool: "",
    platform: "",
    difficulty: "",
    tags: "",
    file: null,
  });

  // Dummy post always first
  const dummyPosts = [
  {
  id: 1,
  title: "Smooth Zoom Transition Effect",
  body: "Saw an amazing smooth zoom transition on Instagram Reels. How can I create this in Premiere Pro or After Effects?",
  tool: "Premiere Pro",
  platform: "Instagram Reels",
  difficulty: "Intermediate",
  tags: ["transition", "zoom", "effect"],
  file: "post.jpg",
  likes: 72,
  liked: false,
  comments: [
    "In Premiere Pro: Nest your clips, apply the 'Transform' effect, and keyframe the Scale & Position synced to the beat. Uncheck 'Use Composition's Shutter Angle' for smooth motion blur.",
    "After Effects: Parent your clip to a null object and keyframe the null's scale to zoom in/out. Turn on Motion Blur for a cinematic look."
  ]
},
   {
    id:2,
    title: "Interstellar Spinning Effect Tutorial",
  body: "How to make that space spinning effect like the movie",
  tool: "Premiere Pro",
  platform: "YouTube Shorts",
  difficulty: "Intermediate",
  tags: ["space", "transition", "cinematic", "rotation"],
  file: "2.jpg",
  likes: 56, // you can make this null or random if you want
  liked: false,
  comments: [
    "Use nested sequences and rotate your footage counter to the background rotation for a realistic spin.",
    "Add directional blur with keyframes to simulate motion blur. Works really well for space effects.",
    "If you want more control, do the rotation in After Effects and then import back into Premiere."
  ]
},
    {
  id: 3,
  title: "Seamless Glitch Transition Tutorial",
  body: "Learn to create a digital glitch/corruption effect between clips for Instagram Reels.",
  tool: "Premiere Pro",
  platform: "Instagram Reels",
  difficulty: "Intermediate",
  tags: ["glitch", "transition" , "rgb-split" , "vhs" ],
  file: "3.jpg",
  likes: 42, // you can keep null if you want random
  liked: false,
  comments: [
    "In Premiere Pro: Stack your clips, apply Wave Warp + Color Offset, keyframe parameters to spike at the cut for a realistic glitch.",
    "CapCut tip: Add its built-in 'Glitch' transition and sync to your beat — quick and easy!"
  ]
},

    {
  id: 4,
  title: "Clone Effect – Appear Multiple Times in One Shot",
  body: "Step-by-step guide to creating a clone effect where you appear multiple times in the same frame.",
  tool: "Premiere Pro",
  platform: "Instagram Reels",
  difficulty: "Intermediate",
  tags: ["clone", "masking", "composite", "multiple"],
  file: "4.jpg",
  likes: 63, // or null/random
  liked: false,
  comments: [
    "In Premiere Pro: Shoot on a tripod, record multiple takes in the same frame, stack them on the timeline and use opacity masks to reveal each version of yourself.",
    "After Effects: Use rotoscoping to cut yourself out in each take, then composite all layers together for more precise control."
  ]
},
    {
  id: 5,
  title: "Smooth Zoom Transition Synced to Beat Drop",
  body: "Create a seamless zoom-in/zoom-out effect perfectly timed with the music beat.",
  tool: "Premiere Pro",
  platform: "Instagram Reels",
  difficulty: "Intermediate",
  tags: ["zoom", "transition", "beat-sync", "effect"],
  file: "5.png",
  likes: 78, // or null/random
  liked: false,
  comments: [
    "In Premiere Pro: Cut clips on the beat, nest them, then apply the 'Transform' effect. Keyframe scale and position to zoom in/out and uncheck 'Use Composition's Shutter Angle' for smoother motion blur.",
    "After Effects: Parent your clip to a null object, keyframe its scale synced to the beat, and enable motion blur for cinematic smoothness."
  ]
},
    {
  id: 6,
  title: "Fun Face Replacement Effect",
  body: "Learn how to replace a face in your video with another face or image for comedy or creative edits.",
  tool: "Premiere Pro",
  platform: "Instagram Reels",
  difficulty: "Intermediate",
  tags: ["face-replacement", "masking", "tracking", "effect"],
  file: "6.jpg",
  likes: 54, // or null/random
  liked: false,
  comments: [
    "In Premiere Pro: Import the replacement face image, use the 'Mask' feature in the Opacity panel to cut it out, then keyframe position/scale to follow the subject.",
    "For more precision, After Effects' 'Motion Tracking' + 'Mocha AE' plugin can track facial movement and let you pin a replacement image to the tracked points."
  ]
},
    {
  id: 7,
  title: "Background Removal Without Green Screen",
  body: "How to remove a video's background even when you didn't film on a green screen.",
  tool: "CapCut", // since you’re talking about CapCut’s Remove BG
  platform: "Instagram Reels",
  difficulty: "Intermediate",
  tags: ["background-removal", "keying", "masking", "effect"],
  file: "7.png",
  likes: 39, // or null/random
  liked: false,
  comments: [
    "CapCut: Use the 'Remove Background' feature under Cutout to instantly isolate yourself. You can then add any background or animation behind.",
    "Premiere Pro: For more control, use the Ultra Key effect or the new AI-powered 'Background Removal' effect, then refine edges with masks and feathering."
  ]
},
  ];

  const [posts, setPosts] = useState(dummyPosts);

  useEffect(() => {
    const saved = localStorage.getItem("myPosts");
    if (saved) {
      setPosts([...dummyPosts, ...JSON.parse(saved)]);
    }
  }, []);

  const savePosts = (updatedPosts) => {
    const realPosts = updatedPosts.filter((p) => p.id !== 1);
    localStorage.setItem("myPosts", JSON.stringify(realPosts));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, file: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    const newPost = {
      id: Date.now(),
      title: formData.name,
      body: formData.message,
      tool: formData.tool,
      platform: formData.platform,
      difficulty: formData.difficulty,
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
      file: formData.file,
      likes: 0,
      liked: false,
      comments: [],
    };

    const updatedPosts = [dummyPosts[0], newPost, ...posts.slice(1)];
    setPosts(updatedPosts);
    savePosts(updatedPosts);

    toast.success("Your post has been created successfully!");
    setShowModal(false);
    setFormData({
      name: "",
      message: "",
      tool: "",
      platform: "",
      difficulty: "",
      tags: "",
      file: null,
    });
  };

  const handleLike = (id) => {
    const updatedPosts = posts.map((p) =>
      p.id === id
        ? p.liked
          ? p
          : { ...p, likes: p.likes + 1, liked: true }
        : p
    );
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  const handleAddComment = (id, comment) => {
    const updatedPosts = posts.map((p) =>
      p.id === id ? { ...p, comments: [...p.comments, comment] } : p
    );
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  // Top Cards
  const cards = [
    {
      img: "anime.jpg",
      tag: { text: "AI EFFECTS", color: "bg-blue-700" },
      title: "Anime AI transform",
      desc: (
        <>
          Give your favourite selfie an <span className="font-bold">AI</span>{" "}
          makeover
        </>
      ),
    },
    {
      img: "beatdrop.png",
      tag: { text: "Transitions", color: "bg-[#855aed]" },
      title: "Perfect Beat Drops",
      desc: "The must-try beat-sync hack making songs blow up online",
    },
    {
      img: "glitch.jpg",
      tag: { text: "Text Effects", color: "bg-[#dc5774]" },
      title: "Glitch Effects",
      desc: (
        <>
          Discover the secret behind the <br /> jaw-dropping cyberpunk glitch
          trend
        </>
      ),
    },
    {
      img: "colorpop.jpg",
      tag: { text: "Color effects", color: "bg-[#8e9a9f]" },
      title: "Color Pop",
      desc: "Master the dramatic colour-pop effect everyone's sharing right now.",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: i * 0.6 },
    }),
  };

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fdf2f8 0%, #faf5ff 50%, #ecfeff 100%)",
      }}
    >
      <ToastContainer />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center py-10 font-[monospace] px-4"
      >
        <h1 className="text-4xl sm:text-6xl font-medium">
          <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent font-semibold">
            TRENDING EFFECTS
          </span>
        </h1>
        <h2 className="text-center text-lg sm:text-2xl text-[darkgrey]">
          Popular effects people are loving right now
        </h2>
      </motion.div>

      {/* Cards */}
      <div className="contentBox grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-8 sm:px-6 md:px-20 gap-6 py-10 -mt-10">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="group relative bg-zinc-200 w-full min-h-[40vh] sm:min-h-[50vh] md:h-[65vh] rounded-[31px] shadow-md overflow-hidden
            transition-transform duration-300 ease-in-out hover:scale-102 cursor-pointer"
          >
            <img src={c.img} alt="" className="w-full h-full object-cover" />
            <div
              className="absolute inset-0 bg-gradient-to-t from-gray-800/70 to-transparent flex flex-col justify-between p-3
            transition-opacity duration-300 ease-in-out group-hover:opacity-80"
            >
              <div className="flex justify-between">
                <button
                  className={`${c.tag.color} text-white p-2 text-[11px] font-bold rounded-[7px]`}
                >
                  {c.tag.text}
                </button>
                <button className="bg-[#ff0404] text-white py-2 px-4 text-[14px] font-bold rounded-[7px] cursor-pointer">
                  Learn
                </button>
              </div>
              <div className="text-white">
                <h3 className="text-xl font-semibold">{c.title}</h3>
                <p className="text-sm font-normal">{c.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Center Button */}
      <motion.div
        className="flex justify-center mt-10 px-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: cards.length * 0.6, duration: 0.5 }}
      >
        <button
          className="bg-blue-600 text-white font-medium py-3 px-8 rounded-full shadow-md 
          transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
        >
          See all Trending effects
        </button>
      </motion.div>

      {/* How do i edit this */}
      <motion.div
        className="mt-16 mx-auto w-[95vw] sm:w-[80vw] h-auto sm:h-[65vh] mb-30 bg-[#ebebeb] rounded-2xl p-4 shadow-md border-t-2 border-t-gray-50"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="items-center flex flex-col mt-6 px-4 text-center">
          <h1 className="text-2xl lg:text-5xl md:text-5xl font-normal text-[#2896ab] ">
            How Do I Edit This?
          </h1>
          <h1 className="mt-7 text-xl sm:text-2xl lg:text-5xl md:text-5xl font-medium text-[#38448cc2]">
            🎬 Saw a sick TikTok effect? Instagram transition? YouTube edit?
          </h1>
          <p className="text-base sm:text-lg text-gray-500 font-normal mt-10 text-center">
            Drop the link, upload a screenshot, or describe what you saw.
            <br />
            Real editors will show you exactly how to recreate it! ✨
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="p-4 bg-[#4b51e4] mt-9 rounded-[20px] text-white text-[17px] font-medium shadow-xl cursor-pointer"
          >
            How do i edit this
          </button>
        </div>
      </motion.div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative z-10 bg-white w-[90%] sm:w-[50vw] max-w-2xl p-8 rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]"
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold text-blue-700">
                Ask for Editing Help
              </h1>
              <button onClick={() => setShowModal(false)}>
                <IoMdClose
                  size={26}
                  className="text-gray-700 cursor-pointer hover:text-red-500"
                />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="p-3 rounded-xl bg-gray-100 outline-none text-lg"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <textarea
                placeholder="Describe your question in detail..."
                className="p-3 rounded-xl bg-gray-100 outline-none text-lg resize-none h-28"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
              <div className="flex gap-3 flex-wrap">
                <select
                  className="p-2 rounded-xl bg-gray-100 outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, tool: e.target.value })
                  }
                >
                  <option value="">Tool</option>
                  <option value="Capcut">Capcut</option>
                  <option value="KineMaster">KineMaster</option>
                  <option value="Adobe Premier">Adobe Premier</option>
                  <option value="DaVinci Resolve">DaVinci Resolve</option>
                  <option value="AI tools">AI tools</option>
                  <option value="Instagram Reels">Instagram Reels</option>
                  <option value="Tik Tok Editor">Tik Tok Editor</option>
                  <option value="other">Other</option>
                </select>
                <select
                  className="p-2 rounded-xl bg-gray-100 outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, platform: e.target.value })
                  }
                >
                  <option value="">Platform</option>
                  <option value="Youtube">Youtube</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Other">Other</option>
                </select>
                <select
                  className="p-2 rounded-xl bg-gray-100 outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, difficulty: e.target.value })
                  }
                >
                  <option value="">Difficulty</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Medium">Medium</option>
                  <option value="Expert">Expert</option>
                </select>
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  className="p-2 rounded-xl bg-gray-100 flex-1 outline-none"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                >
                  <LuUpload /> Upload Image
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {formData.file && (
                  <span className="text-gray-500 text-sm">File selected</span>
                )}
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white p-3 rounded-xl font-medium mt-2 hover:bg-green-700 transition"
              >
                Submit Post
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Community Posts */}
      <div className="px-4 sm:px-8 mt-10 text-3xl sm:text-5xl text-shadow-blue-50 text-[#0087e2] font-bold text-center ">
        <h1>Community Posts</h1>
       </div>
     <div className="w-[95%] sm:w-[60%] mx-auto mt-10 flex flex-col gap-6 mb-20 px-4">
  {posts.map((p) => (
    <motion.div
      key={p.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-5 rounded-2xl shadow-lg bg-white border border-gray-100 mb-6"
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-800">
          {p.title}
        </h2>
        <button
          className={`px-3 py-1 rounded-xl flex items-center gap-2 font-medium transition-all duration-300 
            ${
              p.liked
                ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md scale-105"
                : "bg-gray-100 text-blue-700 hover:bg-blue-100 hover:scale-105"
            }`}
          onClick={() => {
            const updatedPosts = posts.map((post) =>
              post.id === p.id
                ? post.liked
                  ? { ...post, likes: post.likes - 1, liked: false }
                  : { ...post, likes: post.likes + 1, liked: true }
                : post
            );
            setPosts(updatedPosts);
            savePosts(updatedPosts);
          }}
        >
          <span className="text-sm sm:text-base font-semibold">{p.likes}</span>
          <span className="text-sm sm:text-base">{p.liked ? "Liked" : "Like"}</span>
        </button>
      </div>

      <p className="text-gray-700 text-base sm:text-[18px] leading-relaxed">{p.body}</p>

      {p.file && (
        <img
          src={p.file}
          className="mt-3 max-h-60 object-cover rounded-xl w-full shadow-sm"
        />
      )}

      {p.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-3">
          {p.tags.map((t, idx) => (
            <span
              key={idx}
              className="bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-full text-sm font-medium text-purple-700 shadow-sm hover:scale-105 transition-transform duration-200"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4">
        <CommentInput onSubmit={(c) => handleAddComment(p.id, c)} />
        {p.comments.length > 0 && (
          <div className="mt-3 flex flex-col gap-2">
            {p.comments.map((c, i) => (
              <div key={i} className="text-[#635b5d] text-[16px]">
                💬 {c}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  ))}
</div>
    </div>
  );
};

export default Content;
