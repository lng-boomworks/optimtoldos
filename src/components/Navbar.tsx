import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import { ChevronDown, Images, MapPin, Menu, Newspaper, Users, X } from "lucide-react";
import { Button } from "./Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { url, localizedUrl } from "../utils/paths";
import { t, type Locale } from "../i18n/index";
import { slugMap, type PageId } from "../i18n/slugs";

interface NavbarProps {
  locale?: Locale;
}

type IconType = ComponentType<SVGProps<SVGSVGElement>>;
type NavLink = { name: string; path: string; icon?: IconType; description?: string };
type NavGroup = { name: string; children: NavLink[] };
type NavItem = NavLink | NavGroup;

function isGroup(item: NavItem): item is NavGroup {
  return (item as NavGroup).children !== undefined;
}

function navPath(pageId: PageId, locale: Locale): string {
  const slug = slugMap[pageId][locale];
  return localizedUrl(slug ? `/${slug}` : '/', locale);
}

export function Navbar({ locale = 'es' }: NavbarProps) {
  const [location, setLocation] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const desktopNavRef = useRef<HTMLElement | null>(null);

  const navItems: NavItem[] = [
    { name: t(locale, 'nav.awnings'), path: navPath('awnings', locale) },
    { name: t(locale, 'nav.pergolas'), path: navPath('pergolas', locale) },
    { name: t(locale, 'nav.curtains_short'), path: navPath('glass-curtains', locale) },
    { name: t(locale, 'nav.sails'), path: navPath('shade-sails', locale) },
    { name: t(locale, 'nav.windows_short'), path: navPath('pvc-windows', locale) },
    {
      name: t(locale, 'nav.more'),
      children: [
        { name: t(locale, 'nav.gallery'), path: navPath('gallery', locale), icon: Images, description: t(locale, 'nav.gallery_desc') },
        { name: t(locale, 'nav.service_areas'), path: navPath('service-areas', locale), icon: MapPin, description: t(locale, 'nav.service_areas_desc') },
        { name: t(locale, 'nav.about'), path: navPath('about-us', locale), icon: Users, description: t(locale, 'nav.about_desc') },
        { name: t(locale, 'nav.blog'), path: navPath('blog', locale), icon: Newspaper, description: t(locale, 'nav.blog_desc') },
      ],
    },
    { name: t(locale, 'nav.contact'), path: navPath('contact', locale) },
  ];

  useEffect(() => {
    setLocation(window.location.pathname);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!openGroup) return;
    const handleClick = (e: MouseEvent) => {
      if (!desktopNavRef.current?.contains(e.target as Node)) setOpenGroup(null);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenGroup(null);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [openGroup]);

  const isLinkActive = (path: string) => location === path;
  const isGroupActive = (group: NavGroup) => group.children.some((c) => isLinkActive(c.path));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-warm-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href={localizedUrl("/", locale)} className="flex items-center group">
          <img
            src={isScrolled ? url("/images/logos/logo-sticky.png") : url("/images/logos/logo-2x.png")}
            alt="OptimToldos"
            width="276"
            height="124"
            className="h-10 w-auto transition-all duration-300"
          />
        </a>

        {/* Desktop nav */}
        <nav ref={desktopNavRef} className="hidden lg:flex items-center gap-6 ml-8">
          <ul className="flex items-center gap-5">
            {navItems.map((item) => {
              if (isGroup(item)) {
                const active = isGroupActive(item);
                const open = openGroup === item.name;
                return (
                  <li key={item.name} className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenGroup(open ? null : item.name)}
                      aria-haspopup="menu"
                      aria-expanded={open ? "true" : "false"}
                      className={`relative inline-flex items-center gap-1 text-[15px] font-medium transition-colors pb-0.5 ${
                        active
                          ? "text-terracotta"
                          : isScrolled
                            ? "text-text-muted hover:text-navy"
                            : "text-white/90 hover:text-white"
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
                      {active && (
                        <span className="absolute left-0 right-5 -bottom-0.5 h-[2px] bg-terracotta rounded-full" />
                      )}
                    </button>
                    {open && (
                      <ul
                        role="menu"
                        className="absolute right-0 top-full mt-3 w-[320px] bg-warm-white border border-border/60 rounded-xl shadow-xl ring-1 ring-black/5 p-2"
                      >
                        {item.children.map((child) => {
                          const childActive = isLinkActive(child.path);
                          const Icon = child.icon;
                          return (
                            <li key={child.path} role="none">
                              <a
                                role="menuitem"
                                href={child.path}
                                onClick={() => setOpenGroup(null)}
                                className={`group/item flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                                  childActive
                                    ? "bg-terracotta/10"
                                    : "hover:bg-navy/5"
                                }`}
                              >
                                {Icon && (
                                  <span
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                      childActive
                                        ? "bg-terracotta text-white"
                                        : "bg-navy/5 text-navy group-hover/item:bg-terracotta group-hover/item:text-white"
                                    }`}
                                  >
                                    <Icon className="w-4 h-4" />
                                  </span>
                                )}
                                <span className="flex flex-col min-w-0">
                                  <span className={`text-[15px] font-semibold leading-tight ${childActive ? "text-terracotta" : "text-navy"}`}>
                                    {child.name}
                                  </span>
                                  {child.description && (
                                    <span className="text-xs text-text-muted leading-snug mt-0.5">
                                      {child.description}
                                    </span>
                                  )}
                                </span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              const active = isLinkActive(item.path);
              return (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className={`relative text-[15px] font-medium transition-colors pb-0.5 ${
                      active
                        ? "text-terracotta"
                        : isScrolled
                          ? "text-text-muted hover:text-navy"
                          : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item.name}
                    {active && (
                      <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-terracotta rounded-full" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          <Button variant="gold" href={navPath('quote', locale)}>
            {t(locale, 'nav.quote')}
          </Button>
          <LanguageSwitcher
            currentLocale={locale}
            className={isScrolled ? "text-text-muted hover:text-navy" : "text-white/90 hover:text-white"}
          />
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`lg:hidden p-2 transition-colors ${isScrolled ? "text-navy" : "text-white"}`}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={t(locale, 'nav.menu_open')}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute top-[72px] left-0 right-0 bg-warm-white/98 backdrop-blur-xl border-b border-border transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 flex flex-col gap-6">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => {
              if (isGroup(item)) {
                const open = openMobileGroup === item.name;
                const active = isGroupActive(item);
                return (
                  <li key={item.name}>
                    <button
                      type="button"
                      onClick={() => setOpenMobileGroup(open ? null : item.name)}
                      aria-expanded={open ? "true" : "false"}
                      className={`w-full flex items-center justify-between text-lg font-medium transition-colors ${
                        active ? "text-terracotta" : "text-text-muted hover:text-navy"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && (
                      <ul className="mt-3 ml-4 flex flex-col gap-1 border-l border-border pl-4">
                        {item.children.map((child) => {
                          const childActive = isLinkActive(child.path);
                          const Icon = child.icon;
                          return (
                            <li key={child.path}>
                              <a
                                href={child.path}
                                className={`flex items-center gap-3 py-2 text-base font-medium transition-colors ${
                                  childActive ? "text-terracotta" : "text-text-muted hover:text-navy"
                                }`}
                              >
                                {Icon && (
                                  <span
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                      childActive ? "bg-terracotta text-white" : "bg-navy/5 text-navy"
                                    }`}
                                  >
                                    <Icon className="w-4 h-4" />
                                  </span>
                                )}
                                <span>{child.name}</span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }
              const active = isLinkActive(item.path);
              return (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className={`block text-lg font-medium transition-colors ${
                      active ? "text-terracotta" : "text-text-muted hover:text-navy"
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="pt-4 border-t border-border flex flex-col gap-4">
            <Button variant="gold" href={navPath('quote', locale)} className="w-full">
              {t(locale, 'nav.quote')}
            </Button>
            <LanguageSwitcher
              currentLocale={locale}
              className="text-text-muted hover:text-navy justify-center"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
