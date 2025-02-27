import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ArtistFlair = () => {
  const cards = [
    {
      id: 1,
      title: "Card One",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      img: "https://media.istockphoto.com/id/1203764101/photo/stacked-credit-cards.jpg?s=612x612&w=0&k=20&c=xL2P-KdeeJKbMfOG_e61LBIeFoWPVFdKo1wDOqbZGXQ=",
    },
    {
      id: 2,
      title: "Card Two",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      img: "https://media.istockphoto.com/id/1203764101/photo/stacked-credit-cards.jpg?s=612x612&w=0&k=20&c=xL2P-KdeeJKbMfOG_e61LBIeFoWPVFdKo1wDOqbZGXQ=",
    },
    {
      id: 3,
      title: "Card Three",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      img: "https://media.istockphoto.com/id/1203764101/photo/stacked-credit-cards.jpg?s=612x612&w=0&k=20&c=xL2P-KdeeJKbMfOG_e61LBIeFoWPVFdKo1wDOqbZGXQ=",
    },
    {
      id: 4,
      title: "Card Four",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      img: "https://media.istockphoto.com/id/1203764101/photo/stacked-credit-cards.jpg?s=612x612&w=0&k=20&c=xL2P-KdeeJKbMfOG_e61LBIeFoWPVFdKo1wDOqbZGXQ=",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  // Handle responsive card visibility
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 840) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1184) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  // Handle previous slide
  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - visibleCards : prevIndex - 1
    );
  };

  // Handle next slide
  const nextSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex >= cards.length - visibleCards ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col items-center gap-10 p-7">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row items-stretch justify-center w-9/10 max-w-3/4 bg-white shadow-lg rounded-3xl overflow-hidden">
        {/* Left Profile Section */}
        <div className="bg-blue-600 text-white p-8 flex flex-col items-center w-full rounded-l-3xl">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Eva Henson"
            className="w-40 h-40 rounded-full border-4 border-white"
          />
          <h3 className="text-2xl font-semibold mt-4">Eva Henson</h3>
          <p className="text-md">Independent Artist</p>
          {/* Dots */}
          <div className="flex gap-2 mt-4">
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span className="w-3 h-3 bg-white opacity-50 rounded-full"></span>
            <span className="w-3 h-3 bg-white opacity-50 rounded-full"></span>
            <span className="w-3 h-3 bg-white opacity-50 rounded-full"></span>
          </div>
          {/* Contact Button */}
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md">
            Contact
          </button>
        </div>

        {/* Right Card Section - Responsive Carousel */}
        <div className="flex flex-col w-full p-8">
          {/* Cards Container */}
          <div className="flex gap-6 overflow-hidden w-full justify-center my-2">
            {cards.slice(startIndex, startIndex + visibleCards).map((card) => (
              <div key={card.id} className="bg-white shadow-xl rounded-xl p-6 w-64">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-36 rounded-lg"
                />
                <h4 className="text-xl font-semibold mt-4">{card.title}</h4>
                <p className="text-md text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-6 mt-2">
            <button
              onClick={prevSlide}
              className="p-3 bg-blue-500 rounded-full shadow-md hover:bg-blue-700"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={nextSlide}
              className="p-3 bg-blue-500 rounded-full shadow-md hover:bg-blue-700"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistFlair;
