"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Laptop, User } from "lucide-react";
import {
  isValidRole,
  Role,
  RoleCard,
  SelectedRole,
} from "./RoleCard";
import { useRouter } from "next/navigation";
import { ERole } from "@/lib/models/User";

const BUTTON_TEXT: Record<ERole, string> = {
  [ERole.ROLE_USER]: "Apply as a Candidate",
  [ERole.ROLE_SUPPLIER]: "Join as a Supplier",
  [ERole.ROLE_ADMIN]: "Admin Access",
};

const LINK_BUTTOn: Record<Role, string> = {
  [ERole.ROLE_USER]: "?role=CANDIDATE",
  [ERole.ROLE_SUPPLIER]: "?role=SUPPLIER",
  [ERole.ROLE_ADMIN]: "Admin Access",
};

function ChooseRoleUi() {
  const locale = useLocale();
  const [selectedRole, setSelectedRole] = useState<SelectedRole>(null);
  const router = useRouter();
  const handleRoleSelect = (role: Role) => {
    if (isValidRole(role)) {
      setSelectedRole(role);
    }
  };

  const handleRouter = () => {
    if (!selectedRole) return;
    router.push(`/${locale}/signup/${LINK_BUTTOn[selectedRole]}`);
  };
  const roleConfigs = [
    {
      role: ERole.ROLE_USER,
      icon: <User className="h-8 w-8" />,
      title: "I'm a candidate,\nlooking for work",
    },
    {
      role: ERole.ROLE_SUPPLIER,
      icon: <Laptop className="h-8 w-8" />,
      title: "I'm a supplier,\nhiring for a project",
    },
  ] as const;

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-normal text-center mb-8">
        Join as a client or supplier
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {roleConfigs.map(({ role, icon, title }) => (
          <RoleCard
            key={role}
            role={role}
            icon={icon}
            title={title}
            isSelected={selectedRole === role}
            onSelect={handleRoleSelect}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button
          className="w-48"
          disabled={!selectedRole}
          variant="default"
          onClick={handleRouter}
        >
          {selectedRole && BUTTON_TEXT[selectedRole]}
        </Button>
      </div>
    </div>
  );
}

export default ChooseRoleUi;
