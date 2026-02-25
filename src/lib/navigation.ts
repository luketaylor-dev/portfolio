import {
  Home,
  FolderOpen,
  FileText,
  User,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/icons/social-icons";

export type NavItem = {
  href: string;
  label: string;
  ariaLabel?: string;
  icon: LucideIcon;
  prefetch?: boolean;
};

/** Icon component that accepts className (avoids deprecated Lucide brand icons) */
export type SocialIconComponent = React.ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
}>;

export type SocialLink = {
  href: string;
  label: string;
  ariaLabel?: string;
  icon: SocialIconComponent;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home", ariaLabel: "Go to homepage", icon: Home },
  {
    href: "/projects",
    label: "Projects",
    ariaLabel: "View all projects",
    icon: FolderOpen,
    prefetch: true,
  },
  {
    href: "/blog",
    label: "Blog",
    ariaLabel: "Read blog posts",
    icon: FileText,
    prefetch: false,
  },
  {
    href: "/about",
    label: "About",
    ariaLabel: "Learn more about Luke Taylor",
    icon: User,
    prefetch: false,
  },
  {
    href: "/contact",
    label: "Contact",
    ariaLabel: "Get in touch with Luke Taylor",
    icon: Mail,
    prefetch: false,
  },
];

export const socialLinks: SocialLink[] = [
  {
    href: "https://www.linkedin.com/in/luke-taylor-ab5080166/",
    label: "LinkedIn",
    ariaLabel: "LinkedIn profile",
    icon: LinkedInIcon,
  },
  {
    href: "https://github.com/luketaylor-dev",
    label: "GitHub",
    ariaLabel: "GitHub profile",
    icon: GitHubIcon,
  },
];

/** Contact email (mailto links). Update when address changes. */
export const contactEmail = "me@luke-taylor.dev";

/** Footer quick links. Manchester Services and Web Development linked here, not main nav. */
export const footerLinks: { href: string; label: string }[] = [
  { href: "/projects", label: "View Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Me" },
  { href: "/contact", label: "Get in Touch" },
  { href: "/manchester-services", label: "Manchester Services" },
  { href: "/web-development", label: "Web Development" },
];
