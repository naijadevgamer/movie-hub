import { Home, Star, Calendar, X, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useEffect, useState } from "react";

const links = [
  { name: "Home", icon: Home, category: "now_playing", isHome: true },
  { name: "Popular", icon: TrendingUp, category: "popular" },
  { name: "Top Rated", icon: Star, category: "top_rated" },
  { name: "Upcoming", icon: Calendar, category: "upcoming" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCategoryChange?: (category: string) => void;
  activeCategory?: string;
}

const Sidebar = ({
  isOpen,
  onClose,
  onCategoryChange,
  activeCategory,
}: SidebarProps) => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Trigger animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before removing from DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleLinkClick = (link: (typeof links)[0]) => {
    if (link.isHome) {
      onCategoryChange?.("now_playing");
      navigate("/");
    } else if (link.category) {
      onCategoryChange?.(link.category);
      navigate("/");
    }
    onClose?.();
  };

  const isActive = (link: (typeof links)[0]) => {
    if (link.isHome) {
      return activeCategory === "now_playing" || !activeCategory;
    }
    return activeCategory === link.category;
  };

  const sidebarContent = (
    <div className="bg-background">
      <div className="px-5 py-8 flex items-center justify-between">
        <Logo />
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={20} className="text-slate-600" />
          </button>
        )}
      </div>

      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = isActive(link);

            return (
              <li key={link.name}>
                <button
                  onClick={() => handleLinkClick(link)}
                  className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 text-left ${
                    active
                      ? "bg-linear-to-br from-blue-800 to-blue-500 text-white"
                      : "text-muted hover:bg-background hover:text-foreground"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{link.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block border-r border-slate-200 bg-white w-65 fixed h-screen overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {shouldRender && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              isAnimating ? "opacity-100" : "opacity-0"
            }`}
            onClick={onClose}
          />
          <aside
            className={`absolute left-0 top-0 h-full w-70 bg-white shadow-2xl transition-transform duration-300 ease-out ${
              isAnimating ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
