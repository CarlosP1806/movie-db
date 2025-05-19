"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Award, Film, Heart, Star, Menu, X } from "lucide-react";

const links = [
  { href: "/popular", label: "Popular", icon: <Star size={16} /> },
  { href: "/now-playing", label: "Now Playing", icon: <Film size={16} /> },
  { href: "/top-rated", label: "Top Rated", icon: <Award size={16} /> },
  { href: "/my-favorites", label: "Favorites", icon: <Heart size={16} /> },
];

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="w-full bg-zinc-900 text-white shadow-md border-b border-zinc-800">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide text-white transition-colors"
        >
          <span className="text-blue-500">Movies</span>DB
        </Link>

        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden md:flex gap-6">
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
                pathname === href
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              )}
            >
              {icon}
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-zinc-900 border-t border-zinc-800 px-6 pb-4">
          <div className="flex flex-col gap-3">
            {links.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
                  pathname === href
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                )}
              >
                {icon}
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
