import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
export const ROLES = {
  CANDIDATE: "candidate",
  SUPPLIER: "supplier",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
export type SelectedRole = Role | null;

interface RoleCardProps {
  role: Role;
  icon: React.ReactNode;
  title: string;
  isSelected: boolean;
  onSelect: (role: Role) => void;
}
export const isValidRole = (role: unknown): role is Role => {
  return (
    typeof role === "string" && Object.values(ROLES).includes(role as Role)
  );
};
export const RoleCard: React.FC<RoleCardProps> = ({
  role,
  icon,
  title,
  isSelected,
  onSelect,
}) => (
  <Card
    className={`p-3 cursor-pointer border-2 transition-all relative ${
      isSelected ? "border-green-600" : "border-gray-200"
    }`}
    onClick={() => onSelect(role)}
  >
    <CardHeader className="items-start">{icon}</CardHeader>
    <CardContent>
      <h2 className="text-[22px] font-normal leading-tight tracking-[-0.02em]">
        {title}
      </h2>
    </CardContent>
    <div className="absolute top-8 right-4">
      <div
        className={`h-4 w-4 rounded-full border-2 ${
          isSelected ? "bg-green-600 border-green-600" : "border-gray-300"
        }`}
      />
    </div>
  </Card>
);
