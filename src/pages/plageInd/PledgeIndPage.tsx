import { useEffect, useState } from 'react';
import AppAsset from '@/core/AppAsset';

// Axios
import axios from "@/utils/axios";

const languages = [
  { title: "Personal Tree Planting ", title2:"Pledge Summary", pledgers: "Pledgers", trees: "Trees Pledged" },
  { title: "ዛፎችን ለመትከል ቃል የተገባው ", title2: "ማጠቃለያ", pledgers: "ቃል የገቡ ሰዎች ብዛት", trees: "ሰዎች ለመትከል ቃል የገቡት ዛፎች ብዛት" }
];

export default function PledgeIndPage() {
  const [currentLang, setCurrentLang] = useState(0);
  const [pledgeCount, setPledgeCount] = useState(0); // Example number
  const [treeCount, setTreeCount] = useState(5678);    // Example number

  const fetchPledgeStats = () =>{
    axios.get('/api/v1/reports/pledge/summary')
    .then((response)=>{
      const data = response.data;

      console.log(data);
      setPledgeCount(data.totalGuests??0);
      setTreeCount(data.numberOfTreesPledged ??0);
    })
  }

  
useEffect(()=>{
  fetchPledgeStats();
},[]);

    // Language rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLang((prev) => (prev + 1) % languages.length);
    }, 20000); // 20 seconds
    fetchPledgeStats();

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${AppAsset.Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        position: "relative",
      }}
      className="w-full h-screen font-Urbanist"
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {/* Top Section */}
        <div className="w-full p-8 pb-0">
          <div>
            {/* Logo */}
            <img
              src={AppAsset.Logo}
              alt="Logo"
              style={{
                width: '170px',
                height: '170px'
              }}
              className="object-contain"
            />
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center px-4 mt-1 pb-40">
          <h1 className="text-white text-5xl md:text-8xl font-bold">
            {languages[currentLang].title}
            <p>{languages[currentLang].title2}</p>
          </h1>
        </div>

        {/* Bottom Stats Section */}
        <div className="w-full flex justify-between items-center px-60 pb-40">
          {/* Pledgers Stats */}
          <div className="text-white flex items-start gap-8">
            {/* Icon */}
            <div className="w-60 h-full flex items-center">
              <img
                src={AppAsset.PledgersIcon}
                alt="Pledgers"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Stats Column */}
            <div className="flex flex-col items-start">
              {/* Legend Box */}
              <div className="bg-white/10 rounded-lg px-8 py-3 mb-6">
                <p className="text-2xl md:text-4xl whitespace-normal max-w-[300px]">
                  {languages[currentLang].pledgers}
                </p>
              </div>
              
              {/* Number */}
              <p className="text-5xl md:text-9xl font-bold">
                {pledgeCount.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Trees Stats */}
          <div className="text-white flex items-start gap-8">
            {/* Icon */}
            <div className="w-60 h-full flex items-center">
              <img
                src={AppAsset.TreesIcon}
                alt="Trees"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Stats Column */}
            <div className="flex flex-col items-start">
              {/* Legend Box */}
              <div className="bg-white/10 rounded-lg px-8 py-3 mb-6">
                <p className="text-2xl md:text-4xl whitespace-normal max-w-[300px]">
                  {languages[currentLang].trees}
                </p>
              </div>
              
              {/* Number */}
              <p className="text-5xl md:text-9xl font-bold">
                {treeCount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
