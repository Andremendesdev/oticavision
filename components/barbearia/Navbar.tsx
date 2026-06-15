"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { M } from "./safe-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <M.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/50 backdrop-blur-md" : "bg-transparent bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-3 items-center h-16 text-white">
          {/* Esquerda: menu mobile / links desktop */}
          <div className="flex items-center justify-start">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors md:hidden"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden md:flex gap-8 font-medium text-sm uppercase tracking-wide">
              <button
                type="button"
                className="hover:text-amber-400 transition-colors cursor-pointer"
                onClick={() => {
                  document
                    .getElementById("gallery")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Coleção
              </button>

              <button
                type="button"
                className="hover:text-amber-400 transition-colors cursor-pointer"
                onClick={() => {
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Produtos
              </button>

              <button
                type="button"
                className="hover:text-amber-400 transition-colors cursor-pointer"
                onClick={() => {
                  document
                    .getElementById("mapsection")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Localização
              </button>
            </div>
          </div>

          {/* Centro: nome */}
          <div className="flex items-center justify-center">
            <span
              className="font-sans font-light text-base sm:text-lg leading-none text-[#FF2020] uppercase tracking-[0.25em] text-center"
            >
              Ótica Vision
            </span>
          </div>

          {/* Direita: espaço para balancear o grid */}
          <div aria-hidden="true" />
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <M.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/95 text-white border-t border-zinc-800"
        >
          <div className="flex flex-col p-6 gap-6 text-center text-lg">
            <button
              type="button"
              className="cursor-pointer hover:text-amber-400 transition-colors"
              onClick={() => {
                document
                  .getElementById("gallery")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
              }}
            >
              Coleção
            </button>

            <button
              type="button"
              className="cursor-pointer hover:text-amber-400 transition-colors"
              onClick={() => {
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
              }}
            >
              Produtos
            </button>

            <button
              type="button"
              className="cursor-pointer hover:text-amber-400 transition-colors"
              onClick={() => {
                document
                  .getElementById("mapsection")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
              }}
            >
              Localização
            </button>
          </div>
        </M.div>
      )}
    </M.nav>
  );
}
