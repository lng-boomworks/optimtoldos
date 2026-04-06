export function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-3 mb-6">
              <span className="font-serif text-[26px] font-medium text-white tracking-tight">Your Business</span>
            </a>
            <p className="text-[15px] leading-relaxed mb-6 max-w-sm">
              Your business tagline goes here.
            </p>
            <div className="flex flex-col gap-2 text-[14px]">
              <a href="tel:01234567890" className="hover:text-white transition-colors">01234 567890</a>
              <a href="mailto:hello@example.com" className="hover:text-white transition-colors">hello@example.com</a>
              <span>Your Town, County, Postcode</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-medium mb-6">Navigation</h4>
            <ul className="flex flex-col gap-3 text-[15px]">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-white font-medium mb-6">Legal & Contact</h4>
            <ul className="flex flex-col gap-3 text-[15px]">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Notice</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li className="pt-2">
                <a
                  href="/contact"
                  className="inline-block px-4 py-2 border border-white/20 rounded hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
                >
                  Book a Free Call
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm">&copy; {new Date().getFullYear()} Your Business. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Professional", "Experienced", "Insured", "Free initial consultation"].map((badge) => (
              <div key={badge} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
