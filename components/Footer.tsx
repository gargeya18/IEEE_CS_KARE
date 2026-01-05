import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { ASSETS } from '../data';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0D0D0D] text-[#9CA3AF] py-16 border-t border-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* Left: Brand */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <div className="bg-white p-3 rounded-xl inline-block shadow-lg">
               <img src={ASSETS.IEEE_CS_LOGO} alt="IEEE CS Logo" className="h-10 w-auto" />
            </div>
            <p className="text-sm italic text-gray-400">
              "Empowering the future of Computing"
            </p>
            <div className="text-sm font-semibold text-white">
              Kalasalingam Academy of Research and Education
            </div>
          </div>

          {/* Middle: Explore */}
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-lg text-white mb-6 uppercase tracking-widest">Explore Our Club</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-[#FFC83C] transition-colors">IEEE Global</a></li>
              <li><a href="#" className="hover:text-[#FFC83C] transition-colors">IEEE India</a></li>
              <li><a href="#" className="hover:text-[#FFC83C] transition-colors">IEEE Kalasalingam</a></li>
            </ul>
          </div>

          {/* Right: Contact */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-bold text-lg text-white mb-6 uppercase tracking-widest">Contact</h3>
            <div className="space-y-2 text-sm text-right">
              <p>Open for collaborations and project ideas.</p>
              <a href="#" className="text-[#FFB347] hover:underline">Reach out to us.</a>
              <div className="pt-4 text-gray-400">
                <p>Kalasalingam Academy of</p>
                <p>Research and Education</p>
                <p>Krishnankoil, Tamil Nadu</p>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-8">
              <a href="#" className="text-white hover:text-[#FFC83C] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-white hover:text-[#FFC83C] transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-white hover:text-[#FFC83C] transition-colors"><Github size={20} /></a>
              <a href="#" className="text-white hover:text-[#FFC83C] transition-colors"><Mail size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-900 text-center text-xs text-gray-600">
           &copy; Copyright 2025 IEEE - all rights reserved. Use of this website signifies your agreement to the IEEE Terms and Conditions.
           <br/> A public charity, IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.
        </div>
      </div>
    </footer>
  );
};

export default Footer;