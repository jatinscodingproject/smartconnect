// import React, { useState } from 'react';

// // TabTitle Component
// export const TabTitle = ({ title, onClick, isActive }) => {
//     return (
//         <button
//             onClick={onClick}
//             className={`p-2 border-b-2 focus:outline-none ${
//                 isActive ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600'
//             }`}
//         >
//             {title}
//         </button>
//     );
// };

// TabTitle.displayName = 'TabTitle';

// // TabContent Component
// export const TabContent = ({ children }) => {
//     return <div className="p-4">{children}</div>;
// };

// TabContent.displayName = 'TabContent';

// // Tabs Component
// export const Tabs = ({ children }) => {
//     const [activeTab, setActiveTab] = useState(0);

//     const handleTabClick = (index) => {
//         setActiveTab(index);
//     };

//     return (
//         <div>
//             {/* Render Tab Titles */}
//             <div className="flex space-x-4 border-b">
//                 {React.Children.map(children, (child, index) => {
//                     if (child.type.displayName === 'TabTitle') {
//                         return React.cloneElement(child, {
//                             onClick: () => handleTabClick(index),
//                             isActive: activeTab === index,
//                         });
//                     }
//                     return null;
//                 })}
//             </div>

//             {/* Render Tab Content */}
//             <div>
//                 {React.Children.map(children, (child, index) => {
//                     if (child.type.displayName === 'TabContent' && activeTab === index) {
//                         return <div>{child}</div>;
//                     }
//                     return null;
//                 })}
//             </div>
//         </div>
//     );
// };

import React, { useState } from 'react';

// Reusable Tabs Component
export const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label); // Set first tab as default active

    const handleTabClick = (label) => {
        setActiveTab(label);
    };

    return (
        <div className='w-full overflow-hidden'>
            {/* Tab Titles */}
            <div className='border-b-2 text-sm md:text-lg overflow-x-scroll w-[150vw]'>
                {children.map((child) => (
                    <button
                        key={child.props.label}
                        className={`px-2 md:px-4 py-2 ${activeTab === child.props.label ? 'border-b-2 border-blue-500 font-semibold' : 'border-b-2 border-transparent'}`}
                        onClick={() => handleTabClick(child.props.label)}
                    >
                        {child.props.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className='mt-4'>
                {children.map((child) => {
                    if (child.props.label === activeTab) {
                        return <div key={child.props.label}>{child.props.children}</div>;
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
};

export const Tab = ({ label, children }) => {
    return <div>{children}</div>;
};