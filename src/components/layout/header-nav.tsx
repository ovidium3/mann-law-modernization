"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavItem } from "@/lib/site";

type HeaderNavProps = {
  navigation: NavItem[];
};

export function HeaderNav({ navigation }: HeaderNavProps) {
  const pathname = usePathname();

  return (
    <>
      {navigation.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`border-b-2 pb-0.5 font-medium transition ${
              active
                ? "border-[#1a3a52] text-[#1a3a52]"
                : "border-transparent text-slate-700 hover:text-[#1a3a52]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
