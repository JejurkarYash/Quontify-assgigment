"use client";

import React, { useState } from 'react'

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors lg:hidden"
                aria-label="Toggle menu"
            >
                <svg
                    className="w-6 h-6 text-zinc-100"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    {isOpen ? (
                        <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-40 h-screen
          w-64 bg-black border-r border-zinc-800
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo/Title */}
                    <div className="p-6 border-b border-zinc-800">
                        <h1 className="text-xl font-semibold text-zinc-100">
                            Stock Watchlist
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4">
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-zinc-900 text-zinc-100 hover:bg-zinc-800 transition-colors group"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <span className="font-medium">Watchlist</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* Footer (optional) */}
                    <div className="p-4 border-t border-zinc-800">
                        <p className="text-xs text-zinc-500 text-center">
                            © 2025 Watchlist
                        </p>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default SideBar