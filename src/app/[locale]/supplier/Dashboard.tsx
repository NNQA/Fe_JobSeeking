"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ERole, User } from "@/lib/models/User";
import { SkeletonCard } from "@/components/SeletonCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface UserPageProps {
  userPromise: Promise<User | null>;
}

export default function Home({ userPromise }: UserPageProps) {
  const router = useRouter();
  const locale = useLocale();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    userPromise.then((userData) => {
      setUser(userData);
      if (
        userData &&
        !userData.authorities.some((e) => e.authority === ERole.ROLE_SUPPLIER)
      ) {
        router.replace(`/${locale}/upgradeaccount`);
      }
    });
  }, [userPromise, locale, router]);

  if (!user) {
    return <SkeletonCard />;
  }

  return <div>asdsad</div>;
}
