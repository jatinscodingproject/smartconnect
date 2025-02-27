import { AlignJustify, Info, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllCardsByCategory, getAllCardsForUser } from "../services/Card.Services";
import { getItem } from "../utils/getItem";
import { getImage } from "../utils/getImage";
import { Link } from "react-router-dom";
import Loader from '../components/LoaderNew'

import { clearCardItemsFromLocalStorage } from "../utils/clearCardItemsFromLocalStorage";

const AccordionItem = ({ title, children, isOpen, onClick }) => {
  useEffect(() => {
    clearCardItemsFromLocalStorage();
  }, [])
  return (
    <div className="border-b-2 last:border-none">
      <button
        onClick={onClick}
        className="w-full text-left p-4 flex justify-between items-center"
      >
        <span className="text-base font-semibold">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform transform ${isOpen ? "rotate-180" : "rotate-0"
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && <div className="p-4 ">{children}</div>}
    </div>
  );
};

const AccordionContent = ({ children }) => {
  return <div>{children}</div>;
};

// all cards component
function AllCards() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardByCategoryData, setCardByCategoryData] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    clearCardItemsFromLocalStorage();
  }, [])

  const navigate = useNavigate();
  const { id } = useParams();

  async function getCardDataBYCategory(id, token) {
    if (!id) {
      const response = await getAllCardsForUser()
      setCardByCategoryData(response.data);
      console.log('✌️response --->', response);
      return;
    }
    const response = await getAllCardsByCategory(id, token);
    setCardByCategoryData(response.data);
  }

  useEffect(() => {
    if (!id) {
      toast.dismiss();
      try {
        setLoading(true);
        getCardDataBYCategory(id, getItem("token"));
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
      // toast.error("Category Not Selected or Invalid Category Selected");
      // navigate("/shop");
    }
    if (id) {
      getCardDataBYCategory(id, getItem("token"));
    }
  }, [id, location.pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleToggle = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };
  return (
    <>
      <div className="px-4 py-10 md:px-16 font-dmSans mb-10">
        <h3 className="font-bold text-2xl">Standard Visiting Cards</h3>
        <div className="flex justify-end my-4 items-center md:hidden">
          <div className="flex items-center gap-1" onClick={toggleMenu}>
            <SlidersHorizontal
              className="md:hidden"
              size={18}
              color="#8441F1"
            />
            <span className="text-base font-semibold">Filters</span>
          </div>
        </div>
        {/* sliding menu */}
        <div
          className={`fixed top-0 right-0 w-[75vw] h-full bg-white shadow-lg z-50 transform transition-transform duration-300 flex justify-center ${menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="w-full">
            <AccordionItem
              title="Filter By"
              isOpen={activeIndex === 0}
              onClick={() => handleToggle(0)}
            >
              <AccordionContent>
                <div></div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              title="Design Color"
              isOpen={activeIndex === 1}
              onClick={() => handleToggle(1)}
            >
              <AccordionContent>
                <div className="flex gap-2 flex-wrap">
                  <div className="w-6 h-6 rounded-full border-2 border-[#0B3149] bg-[#134B70]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#8B2A22] bg-[#EA4335]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#1D8037] bg-[#34A853]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#2D5699] bg-[#0866FF]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#8C6227] bg-[#F8960C]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#0B3149] bg-[#134B70]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#8B2A22] bg-[#EA4335]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#1D8037] bg-[#34A853]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#2D5699] bg-[#0866FF]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#8C6227] bg-[#F8960C]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#0B3149] bg-[#134B70]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#8B2A22] bg-[#EA4335]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#1D8037] bg-[#34A853]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#2D5699] bg-[#0866FF]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#8C6227] bg-[#F8960C]"></div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              title="Corners"
              isOpen={activeIndex === 2}
              onClick={() => handleToggle(2)}
            >
              <AccordionContent>
                <div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="border-black h-3 w-3"
                    />{" "}
                    <span className="text-sm font-semibold">Standard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="border-black h-3 w-3"
                    />{" "}
                    <span className="text-sm font-semibold">Rounded</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              title="Industry"
              isOpen={activeIndex === 3}
              onClick={() => handleToggle(3)}
            >
              <AccordionContent>
                <div className="text-sm font-semibold space-y-2">
                  <p>Agriculture</p>
                  <p>Animal & Pet Care</p>
                  <p>Arts, Crafts and Design</p>
                  <p>Automotive & Transportation</p>
                  <p>Beauty and Spa</p>
                  <p>Show More</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              title="Styles & Themes"
              isOpen={activeIndex === 4}
              onClick={() => handleToggle(4)}
            >
              <AccordionContent>
                <div>
                  <p>Agriculture</p>
                  <p>Animal & Pet Care</p>
                  <p>Arts, Crafts and Design</p>
                  <p>Automotive & Transportation</p>
                  <p>Beauty and Spa</p>
                  <p>Show More</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              title="Logo / Photo Area"
              isOpen={activeIndex === 5}
              onClick={() => handleToggle(5)}
            >
              <AccordionContent>
                <div>
                  <p>Agriculture</p>
                  <p>Animal & Pet Care</p>
                  <p>Arts, Crafts and Design</p>
                  <p>Automotive & Transportation</p>
                  <p>Beauty and Spa</p>
                  <p>Show More</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
          <button
            className="absolute bottom-2 w-[90%] py-2 btn-grad text-white rounded-lg"
            onClick={toggleMenu}
          >
            Apply
          </button>
        </div>

        {/* background overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
          ></div>
        )}
        <div className="grid md:grid-cols-4 gap-8 h-screen mt-8">
          <div className="hidden md:block">
            <AccordionItem
              title="Filter By"
              isOpen={activeIndex === 0}
              onClick={() => handleToggle(0)}
            >
              <AccordionContent>
                <div></div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              title="Design Color"
              isOpen={activeIndex === 1}
              onClick={() => handleToggle(1)}
            >
              <AccordionContent>
                <div className="flex gap-2 flex-wrap">
                  <div className="w-6 h-6 rounded-full border-2 border-[#0B3149] bg-[#134B70]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#8B2A22] bg-[#EA4335]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#1D8037] bg-[#34A853]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#2D5699] bg-[#0866FF]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#8C6227] bg-[#F8960C]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#0B3149] bg-[#134B70]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#8B2A22] bg-[#EA4335]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#1D8037] bg-[#34A853]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#2D5699] bg-[#0866FF]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#8C6227] bg-[#F8960C]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#0B3149] bg-[#134B70]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#8B2A22] bg-[#EA4335]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#1D8037] bg-[#34A853]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#2D5699] bg-[#0866FF]"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#8C6227] bg-[#F8960C]"></div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              title="Corners"
              isOpen={activeIndex === 2}
              onClick={() => handleToggle(2)}
            >
              <AccordionContent>
                <div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="border-black h-3 w-3"
                    />{" "}
                    <span className="text-sm font-semibold">Standard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="border-black h-3 w-3"
                    />{" "}
                    <span className="text-sm font-semibold">Rounded</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              title="Industry"
              isOpen={activeIndex === 3}
              onClick={() => handleToggle(3)}
            >
              <AccordionContent>
                <div className="text-sm font-semibold space-y-2">
                  <p>Agriculture</p>
                  <p>Animal & Pet Care</p>
                  <p>Arts, Crafts and Design</p>
                  <p>Automotive & Transportation</p>
                  <p>Beauty and Spa</p>
                  <p>Show More</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              title="Styles & Themes"
              isOpen={activeIndex === 4}
              onClick={() => handleToggle(4)}
            >
              <AccordionContent>
                <div>
                  <p>Agriculture</p>
                  <p>Animal & Pet Care</p>
                  <p>Arts, Crafts and Design</p>
                  <p>Automotive & Transportation</p>
                  <p>Beauty and Spa</p>
                  <p>Show More</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              title="Logo / Photo Area"
              isOpen={activeIndex === 5}
              onClick={() => handleToggle(5)}
            >
              <AccordionContent>
                <div>
                  <p>Agriculture</p>
                  <p>Animal & Pet Care</p>
                  <p>Arts, Crafts and Design</p>
                  <p>Automotive & Transportation</p>
                  <p>Beauty and Spa</p>
                  <p>Show More</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="col-span-3 overflow-y-auto">
            {cardByCategoryData.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cardByCategoryData &&
                  cardByCategoryData.map((item, index) => {
                    const defaultImage =
                      item?.variants[selectedIndex]?.frontImageUrl;
                    const colorsArray = item?.variants?.map((colorData) => ({
                      code: colorData.colorCode,
                      frontImageUrl: colorData.frontImageUrl,
                      backImageUrl: colorData.backImageUrl,
                    }));
                    console.log("item?.variants", item?.variants)
                    return (
                      <div
                        className="w-full h-[255px] md::h-[235px] bg-[#8441F145] rounded-xl p-5 flex flex-col items-center"
                        key={item.productCustomUrl}
                      >
                        <img
                          className="w-[80%] h-[130px] md:h-[130px] rounded-xl cursor-pointer object-cover"
                          onClick={() => {
                            localStorage.setItem('cardMongoId', item._id);
                            navigate(`/edit-card/${item.productCustomUrl}`);
                          }}
                          src={defaultImage} // Use the selected image
                          alt={item.productTitle}
                        />
                        <div className="w-full mt-4">
                          <p className="text-xs font-semibold">
                            {item.productTitle}
                          </p>
                          <div className="mt-2 mb-4 flex gap-2">
                            {colorsArray?.length > 0 &&
                              colorsArray.map((colorData, index2) => {
                                return (
                                  <div
                                    key={colorData.code} // Use color code for uniqueness
                                    className={` rounded-full cursor-pointer ${selectedIndex == index2
                                      ? "border-2 border-[#b7a8d0] w-4 h-4" // Add black border if the color is selected
                                      : "w-4 h-4"
                                      }`}
                                    style={{ backgroundColor: colorData.code }} // Dynamically set the background color
                                    onClick={() => {
                                      setSelectedIndex(index2);
                                    }}
                                  ></div>
                                );
                              })}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs">
                              1 from ₹{parseInt(item.price).toFixed(2)}
                            </span>
                            {/* // backend issue is there so later onn will cahnge ot to item.proce */}
                            <Link to={"/card-details/" + item.productCustomUrl}>
                              <Info size={20} fill="#000" stroke="#fff" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="h-full w-full flex justify-center items-center">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

}

export default AllCards;
