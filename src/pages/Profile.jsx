import React, { useEffect, useState } from "react";
import avatar from "../assets/Shape.png";
import sIcon from "../assets/Social Icons.png";
import sIcon1 from "../assets/Social Icons 1.png";
import sIcon2 from "../assets/Social Icons 2.png";
import sIcon3 from "../assets/Social Icons 3.png";
import sIcon4 from "../assets/Social Icons 4.png";
import rectangle from "../assets/Rectangle 95.png";
import icon from "../assets/image 5.png";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByUsername } from "../services/Profile.Services";
import { getImage } from "../utils/getImage";
import { Contact } from 'lucide-react'
function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  async function getUser() {
    const user = await getUserByUsername(username);
    setUserData(user.data.data);
  }

  useEffect(() => {
    if (username) {
      getUser();
    }
  }, [username]);


  const saveContact = async () => {
    if ('contacts' in navigator && 'ContactsManager' in window) {
      try {
        const newContact = {
          name: userData?.name,
          tel: userData?.phone,
          email: userData?.email
        };

        await navigator.contacts.save(newContact);
        alert('Contact saved successfully!');
      } catch (error) {
        console.error('Error saving contact:', error);
      }
    } else {
      alert("This browser doesn't support the Contacts API.");
    }
  };

  const generateVCard = (name, email, phone) => {
    const vCardData = `
    BEGIN:VCARD
    VERSION:2.0
    FN:${name}
    EMAIL:${email}
    TEL;TYPE=CELL:${phone}
    END:VCARD
`;
    downloadVCard(vCardData, name);
  };

  const downloadVCard = (data, name) => {
    const blob = new Blob([data], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.vcf`;

    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen w-full bg-[#4364EF] relative">
      <div className="h-[30vh] w-full flex justify-center items-center fixed top-0">
        <img src={rectangle} alt="rectangle-img" />
        <img src={icon} alt="icon-img" className="absolute" />
      </div>
      <div className="absolute -bottom-[20vh] w-full h-[90vh] text-[#4364EF] rounded-t-[52px] bg-white flex flex-col items-center pt-2 p-8">
        <hr className="border-y-[3.5px] rounded-full w-[45%] border-black mb-4" />
        {userData?.logo && (
          <div className="bg-[#4364EF] w-28 h-28 rounded-full flex justify-center items-center mb-4">
            <img
              src={getImage(userData?.logo)}
              alt="avatar"
              className="w-24 h-24 rounded-full "
            />
          </div>
        )}
        <div className="flex gap-4 items-center">
          <h3 className="font-bold text-2xl">{userData?.name}</h3>
          {userData?.name && <Contact onClick={() => {
            generateVCard(userData.name, userData.email, userData.phone)
          }} />}
        </div>
        <h5 className="font-semibold text-xl">{userData?.designation}</h5>
        <span className="text-lg">{userData?.companyName}</span>

        <div className="my-4 space-y-3 w-full">
          {userData && userData.url1 && <button
            onClick={() => window.open(userData.url1, "_blank")}
            className="p-3 w-full rounded-full text-xl text-white bg-[#4364EF]"
          >
            {userData?.urlName1}
          </button>}
          {userData && userData.url2 && <button
            onClick={() => window.open(userData.url2, "_blank")}
            className="p-3 w-full rounded-full text-xl text-white bg-[#4364EF]"
          >
            {userData?.urlName2}
          </button>}
          {userData && userData.url3 && <button
            onClick={() => window.open(userData.url3, "_blank")}
            className="p-3 w-full rounded-full text-xl text-white bg-[#4364EF]"
          >
            {userData?.urlName3}
          </button>}
          {userData?.fields?.length > 0 &&
            userData?.fields?.map((item, idex) => {
              return (
                <button
                  onClick={() => window.open(item?.link, "_blank")}
                  className="p-3 w-full rounded-full text-xl text-white bg-[#4364EF]"
                >
                  {item?.name}
                </button>
              );
            })}
        </div>
        <div style={{ cursor: 'pointer' }} className="flex justify-between w-full ">
          {userData?.linkedin && (
            <div className="w-14 h-14 bg-[#4364EF] rounded-full flex justify-center items-center">
              <img src={sIcon} alt="social-icon" className="w-7 h-7" />
            </div>
          )}

          {userData?.messanger && (
            <div style={{ cursor: 'pointer' }} className="w-14 h-14 bg-[#4364EF] rounded-full flex justify-center items-center" onClick={() => {
              window.open(userData.messanger, "_blank")
            }}>
              <img src={sIcon1} alt="social-icon" className="w-7 h-7" />
            </div>
          )}
          {userData?.twitter && (
            <div style={{ cursor: 'pointer' }} className="w-14 h-14 bg-[#4364EF] rounded-full flex justify-center items-center" onClick={() => {
              window.open(userData.twitter, "_blank")
            }}>
              <img src={sIcon2} alt="social-icon" className="w-7 h-7" />
            </div>
          )}
          {userData?.instagram && (
            <div style={{ cursor: 'pointer' }} className="w-14 h-14 bg-[#4364EF] rounded-full flex justify-center items-center" onClick={() => {
              window.open(userData.instagram, "_blank")
            }}>
              <img src={sIcon3} alt="social-icon" className="w-7 h-7" />
            </div>
          )}
          {userData?.facebook && (
            <div style={{ cursor: 'pointer' }} className="w-14 h-14 bg-[#4364EF] rounded-full flex justify-center items-center" onClick={() => {
              window.open(userData.facebook, "_blank")
            }}>
              <img src={sIcon4} alt="social-icon" className="w-7 h-7" />
            </div>
          )}
        </div>
        <button
          onClick={() => navigate("/shop")}
          className=" absolute bottom-8 w-[90%] p-3 rounded-full text-xl text-white bg-[#EF4368]"
        >
          Get your own card
        </button>
      </div>
    </div>
  );
}

export default Profile;
