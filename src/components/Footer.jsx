import { InstagramIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 md:px-12">
      <div className="flex flex-col gap-8 pt-10 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.25em] text-haze">Email</p>
          <a
            href="mailto:designlumenvalet@gmail.com"
            data-cursor
            className="text-sm text-paper hover:text-acid"
          >
            designlumenvalet@gmail.com
          </a>
        </div>

        <a
          href="https://www.instagram.com/lumen.design.fr/"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor
          className="group flex items-center gap-3 font-display text-xs uppercase tracking-[0.25em] text-haze transition-colors duration-300 hover:text-acid"
        >
          <InstagramIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          Instagram
        </a>

        <p className="text-xs uppercase tracking-[0.25em] text-haze">
          © {new Date().getFullYear()} Lumen Valet — Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
