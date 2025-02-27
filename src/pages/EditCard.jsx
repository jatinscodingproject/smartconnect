import React, { useState, useRef } from "react";
import logo from "../assets/logo 1.svg";
import logoText from "../assets/Smart Connections.svg";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import {
  ChevronLeft,
  Cloud,
  Palette,
  PencilRuler,
  QrCode,
  TypeOutline,
  Image,
  X,
  Circle,
  Square,
  Plus,
  Trash2,
  Eye,
} from "lucide-react";
import { useSingleEffect } from "react-haiku";
import { Tooltip, Modal as AntdModal } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { Stage, Layer, Rect, Text, Transformer } from "react-konva";
import { Image as KonvaImage } from "react-konva";
import { SketchPicker } from "react-color";
import useImage from "use-image";
import img from "../assets/image 3.svg";
import { linkToQRCode } from "../utils/linkToQRCode";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import { getCardByCardId } from "../services/Card.Services";
import { getItem } from "../utils/getItem";
import { getImage } from "../utils/getImage";
import useCardByCategoryStore from "../store/cardByCategoryStore";
import { v4 as uuidv4 } from "uuid";
import CardPreview from "../components/Preview/PreviewCOmponent";
import { createOrder, updateOrder } from "../services/Order.Services";

function EditCard() {
  const {
    card,
    setCard,
    resetCard,
    selectedVariantFromStore,
    setSelectedVariantFromStore,
  } = useCardByCategoryStore();
  const params = useParams();
  const cardId = params.id;
  const [editOption, setEditOption] = useState("");
  const [cardSide, setCardSide] = useState("front");
  const previousCardSideRef = useRef(cardSide);
  const stageRef = useRef();
  const rectRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  // useEffect(() => {
  //   if (!getItem("token")) {
  //     setIsOpen(true);
  //   }
  // }, [getItem("token")]);
  // const update = useUrgentUpdate();
  const [selectedVariant, setSelectedVariant] = useState({
    colorName: "white",
    colorCode: "#f5f5f5",
    frontImageUrl: "",
    backImageUrl: "",
    editedBackImage: "",
    editedFrontImage: "",
    frontElements: [],
    backElements: [],
    image: "",
    _id: "",
  });
  const [previewFrontViewUrl, setPreviewFrontViewUrl] = useState("");
  const [previewBackViewUrl, setPreviewBackViewUrl] = useState("");
  const [frontElements, setFrontElements] = useState(
    localStorage.getItem("frontElements") &&
      localStorage.getItem("frontElements") != undefined
      ? JSON.parse(localStorage.getItem("frontElements"))
      : []
  );
  const [backElements, setBackElements] = useState(
    localStorage.getItem("backElements") &&
      localStorage.getItem("backElements") != undefined
      ? JSON.parse(localStorage.getItem("backElements"))
      : []
  );
  const elements = cardSide === "front" ? frontElements : backElements;
  const setElements = cardSide === "front" ? setFrontElements : setBackElements;

  const [selectedElement, setSelectedElement] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [selectedMainElement, setSelectedMainElement] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [fontSize, setFontSize] = useState(20);
  const [variantsDataFromApi, setVariantsDataFromApi] = useState([]);
  const [cardData, setCardData] = useState(null);
  const [bgImage, setBgImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { times, setTimes } = useCardByCategoryStore();
  const nfcIconOnCorner = {
    id: "image-2",
    type: "image",
    src: "data:image/png;base64,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",
    x: 630.3781144668037,
    y: 40.90361750792613,
    width: 512,
    height: 512,
    scaleX: 0.07185067211505598,
    scaleY: 0.07185067211505607,
    rotation: 0,
  };
  const navigate = useNavigate();
  async function getCardDetailsBySlug(cardIdParam) {
    try {
      const response = await getCardByCardId(cardIdParam);
      setCardData(response.data.card);
      console.log("✌️response.data --->", response.data);
      localStorage.setItem(
        "currentCard",
        JSON.stringify({
          card: response.data.card,
          shippingCharges: response.data.shippingCharges,
        })
      );
      setCard(response.data.card);
      setVariantsDataFromApi(response?.data?.card?.variants);
      setSelectedVariant(response?.data?.card?.variants[0]);
      localStorage.setItem(
        "frontElements",
        JSON.stringify(response?.data?.card?.variants[0].frontElements)
      );
      localStorage.setItem(
        "backElements",
        JSON.stringify(response?.data?.card?.variants[0].backElements)
      );
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("This is the error for get card by card id--> " + error);
    }
  }
  useEffect(() => {
    getCardDetailsBySlug(cardId);
  }, [cardId]);

  useEffect(() => {
    if (cardData?.variants) {
      if (cardSide == "front") {
        localStorage.setItem(
          "frontElements",
          JSON.stringify(selectedVariant?.frontElements)
        );
      } else if (cardSide == "back") {
        localStorage.setItem(
          "backElements",
          JSON.stringify(selectedVariant?.backElements)
        );
        // if (!localStorage.getItem(times)) {
        //   window.location.reload();
        // } else {
        //   localStorage.setItem(times, 1);
        // }
      }
    }
  }, [cardSide, cardData]);

  useEffect(() => {
    if (cardData?.variants) {
      if (cardSide == "front") {
        localStorage.removeItem("frontElements");
        setElements(selectedVariant?.frontElements);
        localStorage.setItem(
          "frontElements",
          JSON.stringify(selectedVariant?.frontElements)
        );
        // location.reload();
      } else if (cardSide == "back") {
        localStorage.removeItem("backElements");
        setElements(selectedVariant?.backElements);
        localStorage.setItem(
          "backElements",
          JSON.stringify(selectedVariant?.backElements)
        );
      }
    }
  }, [selectedVariant]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [imageUrl] = useImage(uploadedImage);

  // Ensure the NFC icon is always present
  useEffect(() => {
    // Check if nfcIconOnCorner is already in the elements array
    const isNfcIconAlreadyPresent = elements.some(
      (element) => element._id === nfcIconOnCorner._id
    );

    // If not present, add it
    if (!isNfcIconAlreadyPresent) {
      setElements((prevElements) => [...prevElements, nfcIconOnCorner]);
    }

    return () => {
      localStorage.removeItem("elements");
      localStorage.removeItem("frontElements");
    };
  }, []); // Empty dependency array ensures it runs only once

  const [canvasBgColor, setCanvasBgColor] = useState("#ffffff");

  const [qrcodeValue, setQrcodeValue] = useState("");
  const fileInputRef = useRef(null);
  const transformerRef = useRef();

  const getRandomPosition = () => ({
    x: Math.random() * (500 - 50) + 50,
    y: Math.random() * (300 - 50) + 50,
  });

  const handleAddText = () => {
    const position = getRandomPosition();
    setElements([
      ...elements,
      {
        _id: `text-${elements.length}`,
        type: "text",
        text: "Edit Me",
        x: position.x,
        y: position.y,
        fontSize: 20,
        fill: "#000",
        scaleX: 1,
        scaleY: 1,
        width: 100,
        height: 100,
        rotation: 0,
      },
    ]);
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const position = getRandomPosition();
      setUploadedImage(reader.result);
      setElements([
        ...elements,
        {
          _id: `image-${elements.length}`,
          type: "image",
          src: reader.result,
          x: position.x,
          y: position.y,
          width: 100,
          height: 100,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
        },
      ]);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSelectElement = (id) => {
    const selected = elements.find((el) => el._id == id);
    setSelectedElement(selected);
    if (selected.type === "text") {
      setTextValue(selected.text);
    }
  };

  const handleTextChange = (e) => {
    const updatedElements = elements.map((el) =>
      el._id === selectedElement._id ? { ...el, text: e.target.value } : el
    );
    setElements(updatedElements);
    setTextValue(e.target.value);
  };

  const URLImage = ({ src, x, y, el, scaleX, scaleY, rotation }) => {
    const [image, status] = useImage(src);

    if (status === "loaded") {
      return (
        <KonvaImage
          image={image}
          scaleX={scaleX}
          scaleY={scaleY}
          rotation={rotation}
          x={x}
          y={y}
          draggable
          onDragEnd={(e) => {
            const { x, y } = e.target.position();
            const updatedElements = elements.map((item) =>
              item._id === el._id ? { ...item, x, y } : item
            );

            setElements(updatedElements);
            localStorage.setItem(
              `${cardSide}Elements`,
              JSON.stringify(updatedElements)
            );
          }}
          ref={(node) => {
            if (
              node &&
              selectedMainElement?._id == el?._id &&
              transformerRef.current
            ) {
              transformerRef.current.nodes([node]);
              transformerRef.current.getLayer().batchDraw();
            }
          }}
          onClick={() => {
            handleSelectElement(el._id);
            const selectedElem = elements.find((elem) => elem._id === el._id);
            setSelectedMainElement(selectedElem);
          }}
          onTransformEnd={(e) => {
            const node = e.target;
            const updatedElements = elements.map((item) =>
              item._id === el._id
                ? {
                  ...item,
                  x: node.x(),
                  y: node.y(),
                  width: node.width(),
                  height: node.height(),
                  scaleX: node.scaleX(),
                  scaleY: node.scaleY(),
                  rotation: node.rotation(),
                }
                : item
            );
            setElements(updatedElements);
            localStorage.setItem(
              `${cardSide}Elements`,
              JSON.stringify(updatedElements)
            );
          }}
        />
      );
    } else if (status === "failed") {
      console.error("Image failed to load:", src);
    }
    return null;
  };

  const handleGenerateQRAndAddToElements = async () => {
    const isValidUrlFormat = new RegExp(
      /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
    ).test(qrcodeValue);
    if (!isValidUrlFormat) {
      toast.error("Please enter a valid URL to generate QR code.");
      return;
    }
    const position = getRandomPosition();
    const qrLink = await linkToQRCode(qrcodeValue);

    const qrImage = new window.Image();
    qrImage.src = qrLink;

    qrImage.onload = () => {
      const updatedElements = [
        ...elements,
        {
          _id: `image-${elements.length}`,
          type: "image",
          src: qrLink,
          x: position.x,
          y: position.y,
          width: 100,
          height: 100,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
        },
      ];
      setElements(updatedElements);
    };

    qrImage.onerror = (error) => {
      console.error("Error loading QR code image:", error);
    };
  };

  const handleFontFamilyChange = (e) => {
    console.log(e.target.value);
    const updatedElements = elements.map((el) =>
      el._id === selectedMainElement._id
        ? { ...el, fontFamily: e.target.value }
        : el
    );
    setElements(updatedElements);
  };

  const handleFontSizeChange = (e) => {
    const updatedElements = elements.map((el) =>
      el._id === selectedMainElement._id
        ? { ...el, fontSize: parseInt(e.target.value) }
        : el
    );
    setElements(updatedElements);
  };

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src =
      cardSide === "front"
        ? selectedVariant.frontImageUrl
        : selectedVariant.backImageUrl;
    img.style =
      "width: 100%; height: 100%, object-fit: cover, border-radius: 10px";
    img.onload = () => {
      setBgImage(img);
    };
  }, [cardData, selectedVariant, cardSide]);

  useEffect(() => {
    if (bgImage && rectRef.current) {
      const rect = rectRef.current;
      const { width, height } = rect.getSize();

      const imageAspectRatio = bgImage.width / bgImage.height;
      const rectAspectRatio = width / height;

      let scaleX = 1;
      let scaleY = 1;
      let offsetX = 0;
      let offsetY = 0;

      // Cover effect
      if (imageAspectRatio > rectAspectRatio) {
        scaleY = height / bgImage.height;
        scaleX = scaleY;
        offsetX = (width - bgImage.width * scaleX) / 2;
      } else {
        scaleX = width / bgImage.width;
        scaleY = scaleX;
        offsetY = (height - bgImage.height * scaleY) / 2;
      }

      rect.fillPatternScale({ x: scaleX, y: scaleY });
      rect.fillPatternOffset({ x: -offsetX, y: -offsetY });
      rect.getLayer().batchDraw();
    }
  }, [bgImage]);

  const handleTextColorChange = (color) => {
    const updatedElements = elements.map((el) =>
      el._id === selectedMainElement._id ? { ...el, fill: color.hex } : el
    );
    setElements(updatedElements);
  };

  const handleCanvasBgColorChange = (color) => {
    setCanvasBgColor(color.hex);
  };

  useEffect(() => {
    if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [cardSide]);

  const handleCaptureBothSides = async (type) => {
    setCardSide("front");
    if (transformerRef.current) {
      transformerRef.current.hide();
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
    const frontSnapshot = stageRef.current.toDataURL();
    setPreviewFrontViewUrl(frontSnapshot);
    localStorage.setItem("frontSnapshot", frontSnapshot);

    setCardSide("back");
    if (transformerRef.current) {
      transformerRef.current.hide();
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
    const backSnapshot = stageRef.current.toDataURL();
    if (transformerRef.current) {
      transformerRef.current.show();
    }
    localStorage.setItem("backSnapshot", backSnapshot);
    setPreviewBackViewUrl(backSnapshot);
    if (type === "checkout") {
      const obj = {};
      obj.cardId = localStorage.getItem("cardMongoId");
      obj.selectedVariant = selectedVariant;
      obj.frontImage = frontSnapshot;
      obj.backImage = backSnapshot;
      if (localStorage.getItem("orderId")) {
        obj.orderId = localStorage.getItem("orderId");
        const response = await updateOrder(
          localStorage.getItem("orderId"),
          obj
        );
        if (response.statusCode === 200 || response.statusCode == 201) {
          navigate("/checkout");
        }
      } else {
        const response = await createOrder(obj);
        if (response.statusCode === 200 || response.statusCode == 201) {
          localStorage.setItem("orderId", response.data._id);
          navigate("/checkout");
        }
      }
    }
  };


  return (
    <div className="px-4 lg:px-14 py-1 font-dmSans space-y-4">
      <div className="flex justify-between gap-20 items-center ">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <img src={logoText} alt="logo-text" className="" />
        </div>
        <AntdModal
          okText={"Looks Amazing"}
          cancelText={"Go To Edit"}
          title="Preview your Amazing Card"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <CardPreview
              frontImage={previewFrontViewUrl}
              backImage={previewBackViewUrl}
            />
          </div>
        </AntdModal>
        <div className="w-full flex justify-between items-center">
          <div className="flex">
            <span className="underline text-sm mr-6">
              Standard Visiting Cards
            </span>
            <Cloud fill="#aeaeae" strokeWidth={0} />
          </div>
          <div className="flex justify-center items-center gap-4">
            <Tooltip title="Preview">
              <Eye
                onClick={async () => {
                  await handleCaptureBothSides("preview");
                  setIsModalOpen(true);
                }}
                className="cursor-pointer"
              />
            </Tooltip>
            <button
              onClick={() => {
                if (getItem("token")) {
                  handleCaptureBothSides("checkout");
                } else {
                  setIsOpen(true);
                }
              }}
              className="text-sm text-white bg-[#4364EF] px-4 py-1 rounded-lg"
            >
              Next
            </button>
            <Modal
              isOpen={isOpen}
              onClose={() => {
                setIsOpen(false);
                toast.dismiss();
                toast.error("Please Login to Continue");
                navigate("/");
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex text-sm">
        <div className="w-[15%]">
          <Link to="/shop">
            <ChevronLeft size={20} />
          </Link>
        </div>
        <div className="w-[70%] flex items-center gap-8">
          {selectedMainElement && selectedMainElement.type == "text" && (
            <div className="space-x-5">
              <label className="font-semibold">Font Family</label>
              <select
                name="fonts"
                id="fonts"
                className="bg-gray-100 w-40 p-1 outline-none"
                onChange={handleFontFamilyChange}
              >
                <option value="Roboto">Roboto</option>
                <option value="DM Sans">DM Sans</option>
                <option value="Poppins">Poppins</option>
                <option value="Inter">Inter</option>
              </select>
            </div>
          )}
          <div className="space-x-5">
            {selectedMainElement && selectedMainElement.type == "text" && (
              <>
                <label className="font-semibold">Font Size</label>
                <select
                  onChange={handleFontSizeChange}
                  name="size"
                  id="size"
                  className="bg-gray-100 w-40 p-1 outline-none"
                >
                  <option value={25}>xl</option>
                  <option value={30}>2xl</option>
                  <option value={35}>3xl</option>
                  <option value={40}>4xl</option>
                </select>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleAddImage}
            style={{ display: "none" }}
          />
          {selectedMainElement && selectedMainElement.type == "text" && (
            <div className="space-x-5 flex items-center gap-4">
              <label className="font-semibold">Colors</label>
              <div className="flex gap-2">
                <div
                  onClick={() => handleTextColorChange({ hex: "#134B70" })}
                  className="w-6 h-6 rounded-full border-2 border-[#0B3149] bg-[#134B70]"
                ></div>
                <div
                  onClick={() => handleTextColorChange({ hex: "#EA4335" })}
                  className="w-6 h-6 rounded-full border-2 border-[#8B2A22] bg-[#EA4335]"
                ></div>
                <div
                  onClick={() => handleTextColorChange({ hex: "#34A853" })}
                  className="w-6 h-6 rounded-full border-2 border-[#1D8037] bg-[#34A853]"
                ></div>
                <div
                  onClick={() => handleTextColorChange({ hex: "#0866FF" })}
                  className="w-6 h-6 rounded-full border-2 border-[#2D5699] bg-[#0866FF]"
                ></div>
                <div
                  onClick={() => handleTextColorChange({ hex: "#F8960C" })}
                  className="w-6 h-6 rounded-full border-2 border-[#8C6227] bg-[#F8960C]"
                ></div>
                <div className="relative">
                  <div
                    onClick={() =>
                      document.getElementById("colorPicker").click()
                    }
                    className="w-6 h-6 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center cursor-pointer"
                  >
                    <span className="text-sm text-gray-700">+</span>
                  </div>
                  <input
                    type="color"
                    id="colorPicker"
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    onChange={(e) =>
                      handleTextColorChange({ hex: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-[15%]"></div>
      </div>
      <div className="w-full h-[80vh] flex flex-col justify-center items-center relative">
        <Stage
          className="border-2 border-red-900 rounded-xl"
          width={705}
          ref={stageRef}
          height={418}
          onClick={() => setSelectedElement(null)}
          style={{ overflow: "hidden" }}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              ref={rectRef}
              width={705}
              height={418}
              stroke="gray"
              strokeWidth={2}
              dash={[8, 18]}
              lineCap="round"
              fillPatternRepeat="no-repeat"
              fillPatternImage={bgImage}
            />
            <Rect
              x={30} // Gap on the left
              y={30} // Gap on the top
              width={705 - 2 * 30} // 705 - 60 = 645
              height={418 - 2 * 30} // 418 - 60 = 358
              stroke="gray"
              strokeWidth={2}
              dash={[8, 18]}
              lineCap="round"
            />

            {/* Render Elements */}
            {elements?.map((el) => (
              <React.Fragment key={el._id}>
                {el.type === "text" ? (
                  <Text
                    text={el.text}
                    x={el.x}
                    y={el.y}
                    scaleX={el.scaleX}
                    scaleY={el.scaleY}
                    rotation={el.rotation}
                    draggable
                    fontSize={el.fontSize}
                    fontFamily={el.fontFamily}
                    fill={el.fill}
                    onClick={() => {
                      handleSelectElement(el._id);
                      const selectedElem = elements.find(
                        (elem) => elem._id === el._id
                      );
                      setSelectedMainElement(selectedElem);
                    }}
                    onDragEnd={(e) => {
                      const { x, y } = e.target.position();
                      console.log("✌️{ x, y } --->", { x, y });
                      const updatedElements = elements.map((item) => {
                        console.log("✌️item._id --->", item._id == el._id);
                        console.log("✌️el._id --->", el._id);
                        return item._id === el._id ? { ...item, x, y } : item;
                      });
                      console.log("✌️updatedElements --->", updatedElements);
                      setElements(updatedElements);
                      localStorage.setItem(
                        `${cardSide}Elements`,
                        JSON.stringify(updatedElements)
                      );
                    }}
                    ref={(node) => {
                      if (
                        node &&
                        selectedMainElement?._id === el._id &&
                        transformerRef.current
                      ) {
                        transformerRef.current.nodes([node]);
                        transformerRef.current.getLayer().batchDraw();
                      }
                    }}
                    onTransformEnd={(e) => {
                      const node = e.target;
                      const updatedElements = elements.map((item) =>
                        item._id === el._id
                          ? {
                            ...item,
                            x: node.x(),
                            y: node.y(),
                            fontSize: node.fontSize(),
                            width: node.width(),
                            height: node.height(),
                            scaleX: node.scaleX(),
                            scaleY: node.scaleY(),
                            rotation: node.rotation(),
                          }
                          : item
                      );
                      setElements(updatedElements);
                    }}
                  />
                ) : (
                  el.type === "image" && (
                    <URLImage
                      key={el._id}
                      src={el?.src}
                      x={el?.x}
                      y={el?.y}
                      el={el}
                      scaleX={el?.scaleX}
                      scaleY={el?.scaleY}
                      rotation={el?.rotation}
                    />
                  )
                )}
              </React.Fragment>
            ))}

            {/* Transformer Component */}
            {selectedMainElement && (
              <Transformer
                ref={transformerRef}
                boundBoxFunc={(oldBox, newBox) => {
                  return newBox;
                }}
              />
            )}
          </Layer>
        </Stage>

        <div className="btn-grad p-1 rounded-full mt-5">
          <button
            className={`text-sm px-4 font-medium py-1 rounded-full ${cardSide === "front" ? "bg-[white] text-black" : "text-white"
              }`}
            onClick={() => setCardSide("front")}
          >
            Front
          </button>
          <button
            className={`text-sm px-4 font-medium py-1 rounded-full ${cardSide === "back" ? "bg-[white] text-black" : "text-white"
              }`}
            onClick={() => {
              setCardSide("back");
              if (!localStorage.getItem(times)) window.location.reload();
              localStorage.setItem(times, 1);
              setSelectedVariant(selectedVariant);
            }}
          >
            Back
          </button>
        </div>

        <div className="bg-white custom-shadow2 rounded-full w-20 h-96 absolute left-10 flex flex-col justify-evenly items-center ">
          <div
            className="flex flex-col items-center cursor-pointer relative"
            onClick={() => setEditOption("text")}
          >
            <TypeOutline color={editOption === "text" ? "#4364EF" : "#000"} />
            <span className="text-sm">Text</span>
            {editOption === "text" && (
              <div className="w-60 bg-white rounded-[28px] custom-shadow2 pt-4 pb-10 px-6 absolute left-20">
                <button className="w-4 h-4 bg-black rounded-full flex justify-center items-center text-white absolute right-4">
                  <X
                    size={"100%"}
                    strokeWidth={3}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditOption("");
                    }}
                  />
                </button>
                <h6 className="text-base font-semibold">Text</h6>
                <p className="mt-1 text-xs font-semibold">
                  Edit your text below, or click on the field you'd like to
                  edit directly on your design.
                </p>
                <div className="mt-4 space-y-3 w-full">
                  {elements &&
                    elements
                      .filter((item) => item.type === "text")
                      .map((item, index) => (
                        <div
                          key={item._id}
                          className="flex justify-center items-center gap-2"
                        >
                          <input
                            value={item.text}
                            type="text"
                            className="border outline-none text-sm px-3 py-1 rounded-full w-full"
                            placeholder="type here"
                            onChange={(e) => {
                              const updatedElements = elements.map((el) =>
                                el._id === item._id
                                  ? { ...el, text: e.target.value }
                                  : el
                              );
                              setElements(updatedElements);
                            }}
                          />
                          <Trash2
                            color="red"
                            onClick={(e) => {
                              e.stopPropagation();
                              const updatedElements = elements.filter(
                                (el) => el._id !== item._id
                              );
                              setElements(updatedElements);
                            }}
                          />
                        </div>
                      ))}
                  <button
                    className="bg-[#4364EF] text-white px-3 py-1 rounded-full w-full"
                    onClick={handleAddText}
                  >
                    Add Field
                  </button>
                </div>
              </div>
            )}
          </div>
          <div
            className="flex flex-col items-center cursor-pointer relative"
            onClick={() => setEditOption("qr")}
          >
            <QrCode color={editOption === "qr" ? "#4364EF" : "#000"} />
            <span className="text-sm">QR Code</span>
            {editOption === "qr" && (
              <div className="w-60 bg-white rounded-[28px] custom-shadow2 py-4 px-6 absolute left-20">
                <button className="w-4 h-4 bg-black rounded-full flex justify-center items-center text-white absolute right-4">
                  <X
                    size={"100%"}
                    strokeWidth={3}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditOption("");
                    }}
                  />
                </button>
                <h6 className="text-base font-semibold">QR Code</h6>
                <p className="mt-1 text-xs font-semibold">
                  Enter a valid URL and click the 'Add' button.
                </p>
                <div className="mt-4 space-y-3 w-full">
                  <input
                    value={qrcodeValue}
                    type="text"
                    className="border outline-none text-sm px-3 py-1 rounded-full w-full"
                    placeholder="type here"
                    onChange={(e) => {
                      setQrcodeValue(e.target.value);
                    }}
                  />
                  <button
                    className="bg-[#4364EF] text-white px-3 py-1 rounded-full w-full"
                    onClick={handleGenerateQRAndAddToElements}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
          <div
            className="flex flex-col items-center cursor-pointer relative"
            onClick={() => setEditOption("design")}
          >
            <PencilRuler
              color={editOption === "design" ? "#4364EF" : "#000"}
            />
            <span className="text-sm">Design</span>
            {editOption === "design" && (
              <div className="w-60 bg-white rounded-[28px] custom-shadow2 py-4 px-6 absolute left-20">
                <button className="w-4 h-4 bg-black rounded-full flex justify-center items-center text-white absolute right-4">
                  <X
                    size={"100%"}
                    strokeWidth={3}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditOption("");
                    }}
                  />
                </button>
                <h6 className="text-base font-semibold">Design</h6>
                <div>
                  <span className="text-sm font-semibold">Shapes</span>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div className="bg-gray-200 rounded-md flex items-center justify-center h-10">
                        <Circle fill="#000" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-semibold">Icons</span>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div className="bg-gray-200 rounded-md flex items-center justify-center h-10">
                        <Palette />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className="flex flex-col items-center cursor-pointer relative"
            onClick={() => setEditOption("color")}
          >
            <Palette color={editOption === "color" ? "#4364EF" : "#000"} />
            <span className="text-sm text-center">Design Color</span>
            {editOption === "color" && (
              <div className="w-60 bg-white rounded-[28px] custom-shadow2 py-4 px-6 absolute -right-64">
                <button className="w-4 h-4 bg-black rounded-full flex justify-center items-center text-white absolute right-4">
                  <X
                    size={"100%"}
                    strokeWidth={3}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditOption("");
                    }}
                  />
                </button>
                <h6 className="text-base font-semibold">Design Color</h6>
                <div className="flex mt-4" style={{ gap: "5px" }}>
                  {cardData &&
                    cardData.variants.map((item, index) => (
                      <div
                        className={`w-8 h-8 rounded-full border-2 border-[#0B3149]`}
                        style={{ backgroundColor: item?.colorCode }}
                        onClick={() => {
                          console.log("✌️item --->", item);
                          setSelectedVariant(item);
                        }}
                      ></div>
                    ))}
                </div>
              </div>
            )}
          </div>
          <div
            className="flex flex-col items-center cursor-pointer relative"
            onClick={() => setEditOption("image")}
          >
            <Image color={editOption === "image" ? "#4364EF" : "#000"} />
            <span className="text-sm text-center">Image</span>
            {editOption === "image" && (
              <div className="w-60 bg-white rounded-[28px] custom-shadow2 py-4 px-6 absolute left-20">
                <button className="w-4 h-4 bg-black rounded-full flex justify-center items-center text-white absolute right-4">
                  <X
                    size={"100%"}
                    strokeWidth={3}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditOption("");
                    }}
                  />
                </button>
                <h6 className="text-base font-semibold">Image</h6>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {elements &&
                    elements
                      .filter((item) => item.type == "image")
                      .map((item, index) => (
                        <div
                          key={index}
                          className="relative bg-gray-200 rounded-md flex items-center justify-center h-10"
                        >
                          <img src={item.src} alt={index} />
                          <Trash2
                            // color="white"
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              cursor: "pointer",
                              backgroundColor: "red",
                              borderRadius: "50%",
                              height: 15,
                              width: 15,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              const updatedElements = elements.filter(
                                (el) => el._id !== item._id
                              );
                              setElements(updatedElements);
                            }}
                          />
                        </div>
                      ))}
                  <div
                    onClick={() => fileInputRef.current.click()}
                    className="bg-gray-200 rounded-md flex items-center justify-center h-10"
                  >
                    <Plus />
                  </div>
                </div>
                <button
                  onClick={() => {
                    fileInputRef.current.click();
                  }}
                  className="mt-10 bg-[#4364EF] text-white px-3 py-1 rounded-full w-full"
                >
                  Add Image
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );

}

export default EditCard;
