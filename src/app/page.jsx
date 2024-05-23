'use client';

import React, { useState } from 'react';
import Navbar from "./components/Navbar";
import MapComponent from "./components/Map";
import Link from "next/link";
import Footer from "./components/Footer";
import Stupidgame from "./components/Stupidgame";
import { Switch, FormControlLabel } from '@mui/material';

export default function Home() {
  const [showGame, setShowGame] = useState(false);

  const handleToggle = (event) => {
    setShowGame(event.target.checked);
  };

  return (
    <main>
      <section className="bg-gray-200 py-20" id="home">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-800">Tester.js</h1>
          <p className="text-gray-600 mt-4">Testing is important for you</p>
          <FormControlLabel
            control={
              <Switch
                checked={showGame}
                onChange={handleToggle}
                name="toggleGame"
                color="primary"
              />
            }
            label={showGame ? "Hide Game" : "Show Game"}
            className="mt-6"
          />
        </div>
      </section>

      {showGame && <Stupidgame onClose={() => setShowGame(false)} />}

      <section className="py-20" id="about">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
          <p className="text-gray-600 mt-4 p-12">At our company, we are dedicated to creating an environment where aspiring and experienced Testers can hone their skills. Our team is composed of industry professionals who are passionate about testing and quality assurance, ensuring that our clients receive the highest standard of service. We believe that a thorough understanding and practice of testing principles are crucial for delivering reliable and efficient software products.

            We specialize in JavaScript (JS) testing, recognizing its significance in the modern web development landscape. Our comprehensive training programs and resources focus on various aspects of JS testing, from unit testing to end-to-end testing. By integrating best practices and the latest tools, we empower our Testers to excel in their roles and contribute to the development of robust, error-free applications.</p>
        </div>
      </section>

      <section className="bg-gray-200 py-20" id="services">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
          <div className="flex flex-wrap mt-8">
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800">Service One</h3>
                <p className="text-gray-600 mt-4">Description of service one.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800">Service Two</h3>
                <p className="text-gray-600 mt-4">Description of service two.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800">Service Three</h3>
                <p className="text-gray-600 mt-4">Description of service three.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 flex" id="contact">
        <div className="flex-col container mx-auto px-6 text-center justify-center">
          <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
          <hr className="my-6" />
          <div className="flex flex-col justify-center items-center">
            <img src="/images/icons/location.png" className="w-28" />
          </div>

          <p className="text-gray-400 my-2">
            <Link className="text-xs" href="https://maps.app.goo.gl/pbFEqXcWwhDRCg119">
              <span className="font-extrabold text-gray-500 hover:text-sky-600 text-xl">
                King Mongkut's Institute of Technology Ladkrabang
                <br />
              </span>
              1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520
            </Link>
          </p>
          <MapComponent />

          <div className="flex flex-col items-center my-6 gap-4">
            <div className="flex justify-between w-full max-w-sm">
              <img src="https://www.iconpacks.net/icons/1/free-smartphone-icon-695-thumb.png" className="w-10" />
              <div className="text-gray-600 mt-2">+66997122060</div>
            </div>
            <div className="flex justify-between w-full max-w-sm">
              <img src="https://www.pngmart.com/files/23/Github-Logo-PNG-Free-Download.png" className="w-10" />
              <div className="text-gray-600 mt-2">chollsak</div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
