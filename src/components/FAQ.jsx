import React, { useState } from "react";

const AccordionItem = ({ title, children, isOpen, onClick }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center"
            >
                <span className="text-base font-medium">{title}</span>
                <div className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-lg">
                    {isOpen ? "−" : "+"}
                </div>
            </button>
            {isOpen && <div className="mt-2 text-gray-600">{children}</div>}
        </div>
    );
};

const AccordionContent = ({ children }) => {
    return <div>{children}</div>;
};

function FAQ({ data = [] }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 px-4">
            <h2 className="text-3xl font-semibold mb-4">FAQ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <AccordionItem
                            key={index}
                            title={item.question}
                            isOpen={activeIndex === index}
                            onClick={() => handleToggle(index)}
                        >
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    ))
                ) : (
                    <p className="text-gray-500 p-4">No FAQs available.</p>
                )}
            </div>
        </div>
    );
}

export default FAQ;
