/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import FirstHeaderSection from "./FirstHeaderSection";
import SecondSection from "./SecondSection";
import ThirdPartSection from "./ThirdPartSection";
//import FourfthPartSection from "./FourfthPartSection";
//import FifthPartSection from "./FifthPartSection";
import SixthPartSection from "./SixthPartSection";
import { usePathname } from "next/navigation";


// 1. Définition du type pour les props
interface AnimatedSectionsProps {
  data: any; // Remplace 'any' par l'interface réelle de tes données WordPress si possible
}

const AnimatedSections = ({ data }: AnimatedSectionsProps) => {
  const [, setVisibleSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathname = usePathname();
  const currentLang = pathname.startsWith("/en") ? "en" : "fr";
  // 2. Assure-toi que le tableau ne contient que des éléments React.ReactNode
  {/*
    <FirstHeaderSection key="first" sectionun={data.sectionun}/>,
    */}
    {/* <FourfthPartSection key="fourfth" sectionquatre={data.sectionquatre} lang={currentLang} />,     */}
    {/* <FifthPartSection key="fifth" sectioncinq={data.sectioncinq} lang={currentLang} />,*/}
  const sections: React.ReactNode[] = [            
    <FirstHeaderSection key="first" sectionun={data.sectionun} lang={currentLang} />,
    <SecondSection key="second" sectiondeux={data.sectiondeux} lang={currentLang}/>,
    <ThirdPartSection key="third" sectiontrois={data.sectiontrois}/>,        
    <SixthPartSection key="sixth" sectionsix={data.sectionsix} lang={currentLang}/>,
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleSections((prev) => {
              const updated = new Set(prev);
              updated.add(index);
              return updated;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    const currentRefs = sectionRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []); // Pas besoin de mettre sections.length ici car il est statique

  return (
    <>      
      {sections.map((section, i) => (
        <div
          key={i}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          data-index={i}          
        >
          {section}
        </div>
      ))}
    </>
  );
};

export default AnimatedSections;