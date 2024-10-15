"use client";
import React from "react";

import { useTranslations } from "next-intl";
function Header() {
  const t = useTranslations();
  return <h4>{t("supplier.updateapply.h4")}</h4>;
}

export default Header;
