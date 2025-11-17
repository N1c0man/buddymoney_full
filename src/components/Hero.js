import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-brand-50 via-brand-100 to-accent-100">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-900 leading-tight">
            Money Made Simple — For You and Your Buddies
          </h1>
          <p className="text-lg text-brand-800/80 max-w-prose">
            Start learning how to budget, save, and earn smarter — without the overwhelm.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/blog" className="px-6 py-3 rounded-xl bg-brand-700 text-white hover:bg-brand-800 shadow-soft">Start Learning</Link>
            <Link to="/tools" className="px-6 py-3 rounded-xl bg-white text-brand-800 border border-brand-200 hover:bg-brand-50 shadow-soft">Try Our Free Tools</Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center"
        >
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <img
              className="w-72 md:w-96"
              src="/icons/heroowl.png"
              alt="Finance illustration"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
