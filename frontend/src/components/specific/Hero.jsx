export default function Hero() {
  return (
    <section
      className="relative w-full h-[500px] overflow-hidden border-8 border-red-500"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2400&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45 z-0 " ></div>

      {/* Warm spotlight overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-orange-500/20 to-black/50 z-0"></div>

      <div className="relative z-10 h-full max-w-[1600px] mx-auto px-[120px] pt-[70px]">
        
        {/* Content */}
        <div className="max-w-[760px]">
          <p className="uppercase text-orange-500 font-bold tracking-wide text-[18px] mb-6 ">
            Discover Live Experiences
          </p>

          <h1 className="text-white font-bold text-[64px] leading-[1.15] mb-6">
            Your next unforgettable
            <br />
            moment starts here.
          </h1>

          <p className="text-white text-[24px] font-medium mb-14">
            Thousands of events. One seamless ticket. Zero friction.
          </p>
        </div>

        {/* Search bar */}
        <div className="absolute bottom-[38px] right-[650px] left-[120px] ">
          <div className="bg-white rounded-full shadow-xl h-[68px] flex items-center px-6">
            {/* Search icon */}
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search events, venues, artists..."
              className="flex-1 px-5 text-[20px] outline-none text-gray-700"
            />

            <button className="bg-orange-500 hover:bg-orange-600 transition text-white font-semibold px-10 h-[52px] rounded-full text-xl">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

