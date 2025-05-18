"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Award, Film, Heart, Star } from "lucide-react";

const links = [
  { href: "/popular", label: "Popular", icon: <Star size={16} /> },
  { href: "/now-playing", label: "Now Playing", icon: <Film size={16} /> },
  { href: "/top-rated", label: "Top Rated", icon: <Award size={16} /> },
  { href: "/my-favorites", label: "Favorites", icon: <Heart size={16} /> },
];

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="w-full bg-zinc-900 text-white shadow-md border-b border-zinc-800">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide text-white transition-colors"
        >
          <span className="text-blue-500">Movies</span>DB
        </Link>
        <nav className="flex gap-6">
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
    </header>
  );
};

export default Header;
