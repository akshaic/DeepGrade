'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { useRouter } from "next/navigation";
import SignupFormDemo from './Signupform';

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Navigate to the student results page
  const goToResults = () => {
    router.push('/studentresults');
  };

  return (
    <div className="relative w-full flex justify-center items-center pt-14">
      {/* Button to toggle drawer */}
      <div className="flex justify-around w-[50vw]">
        <Button label="Join Now" func={setIsOpen} parameter="true" />
        {/* New Results Button */}
        <Button label="View Results" func={goToResults} />
      </div>

      {/* Animated Drawer */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: isOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', stiffness: 60, damping: 15 }}
        className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-lg p-6"
        style={{ height: '80vh' }}
      >
        <div className="relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-4 text-green-500 text-xl"
          >
            ✕
          </button>
          <SignupFormDemo />
          <div className="w-full h-16 rounded-b-full absolute -top-8"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Drawer;
