import { Heart, Phone, AlertCircle } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-foreground text-background mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-medical-green flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <p className="font-display font-semibold text-background">
                Sanjivni Hospital
              </p>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              Your Health, Our Priority. Providing quality healthcare services
              to the community.
            </p>
          </div>

          {/* OPD Info */}
          <div>
            <h4 className="font-semibold text-background mb-3 text-sm uppercase tracking-wider">
              OPD Services
            </h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>Monday – Saturday: 8:00 AM – 8:00 PM</li>
              <li>Sunday: 9:00 AM – 2:00 PM</li>
              <li>Emergency: 24×7</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-background mb-3 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-background/70">
                <Phone className="w-4 h-4 shrink-0 text-medical-green-light" />
                <span>Patient Support: 8757188299</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-background/80 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>For Emergencies: 8757188299</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/50">
          <p>
            © {year} Sanjivni Hospital – OPD Services. All rights reserved.
          </p>
          <p>
            Built with{" "}
            <Heart className="w-3 h-3 inline fill-red-400 text-red-400 mx-0.5" />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-background/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
