import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ERole } from "@/lib/models/User";
export type Role = (typeof ERole)[keyof typeof ERole];
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
    typeof role === "string" && Object.values(ERole).includes(role as Role)
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
    className={`p-4 cursor-pointer transition-all relative border-2 ${isSelected ? "border-green-600" : "border-border"
      }`}
    onClick={() => onSelect(role)}
  >
    <CardHeader className="items-start">{icon}</CardHeader>
    <CardContent>
      <h2 className="text-lg font-normal leading-tight tracking-[-0.02em]">
        {title}
      </h2>
    </CardContent>
    <div className="absolute top-8 right-4">
      <div
        className={`h-4 w-4 rounded-full border-2 ${isSelected ? "bg-green-700 border-green-700" : "border-gray-300"
          }`}
      />
    </div>
  </Card>
);
