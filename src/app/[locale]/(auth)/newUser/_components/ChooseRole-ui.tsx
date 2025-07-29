"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLocale, useTranslations } from "next-intl"
import { Laptop, User, ArrowRight, CheckCircle, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

enum ERole {
  ROLE_USER = "ROLE_USER",
  ROLE_SUPPLIER = "ROLE_SUPPLIER",
  ROLE_ADMIN = "ROLE_ADMIN",
}

type Role = ERole.ROLE_USER | ERole.ROLE_SUPPLIER | ERole.ROLE_ADMIN
type SelectedRole = Role | null

const isValidRole = (role: any): role is Role => {
  return Object.values(ERole).includes(role)
}

const LINK_BUTTON: Record<Role, string> = {
  [ERole.ROLE_USER]: "?role=CANDIDATE",
  [ERole.ROLE_SUPPLIER]: "?role=SUPPLIER",
  [ERole.ROLE_ADMIN]: "Admin Access",
}

interface RoleCardProps {
  role: Role
  icon: React.ReactNode
  title: string
  description: string
  isSelected: boolean
  onSelect: (role: Role) => void
}

function RoleCard({ role, icon, title, description, isSelected, onSelect }: RoleCardProps) {
  return (
    <Card
      className={cn(
        "relative cursor-pointer transition-all rounded duration-300 hover:scale-[1.02] group border-2",
        isSelected
          ? "pb-0 border-b-0 border-primary bg-primary/5 shadow-lg shadow-primary/20"
          : "hover:pb-0 hover:border-b-0 order-border hover:border-primary/50 hover:shadow-md",
      )}
      onClick={() => onSelect(role)}
    >
      <CardContent className="p-6">
        <div className="absolute top-4 right-4">
          <div
            className={cn(
              "w-5 h-5 rounded-full border-2 transition-all duration-200",
              isSelected ? "border-primary bg-primary" : "border-muted-foreground/30 group-hover:border-primary/50",
            )}
          >
            {isSelected && <Check className="w-4 h-4 text-primary-foreground absolute top-0.5 left-0.5" />}
          </div>
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-200",
            isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary group-hover:bg-primary/20",
          )}
        >
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground leading-tight">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
        <div
          className={cn(
            "absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 rounded-b-xl",
            isSelected ? "w-full" : "w-0 group-hover:w-full",
          )}
        />
      </CardContent>
    </Card>
  )
}

function ChooseRoleUi() {
  const locale = useLocale()
  const [selectedRole, setSelectedRole] = useState<SelectedRole>(null)
  const router = useRouter()
  const t = useTranslations("newUser");
  const BUTTON_TEXT: Record<ERole, string> = {
    [ERole.ROLE_USER]: t("buttonText.user"),
    [ERole.ROLE_SUPPLIER]: t("buttonText.supplier"),
    [ERole.ROLE_ADMIN]: "Admin Access",
  }
  const handleRoleSelect = (role: Role) => {
    if (isValidRole(role)) {
      setSelectedRole(role)
    }
  }

  const handleRouter = () => {
    if (!selectedRole) return
    router.push(`/${locale}/signup/${LINK_BUTTON[selectedRole]}`)
  }

  const roleConfigs = [
    {
      role: ERole.ROLE_USER,
      icon: <User className="h-6 w-6" />,
      title: t("lookingForWork"),
      description: t("lookingForWorkDescription"),
    },
    {
      role: ERole.ROLE_SUPPLIER,
      icon: <Laptop className="h-6 w-6" />,
      title: t("hiringTalent"),
      description: t("hiringTalentDescription"),
    },
  ] as const

  return (
    <div className="w-full space-y-8 px-4">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          {t("gettingStarted")}
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3 leading-tight">{t("chooseYourPath")}</h1>
        <p className="text-muted-foreground leading-relaxed">
          {t("chooseYourPathDescription")}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {roleConfigs.map(({ role, icon, title, description }) => (
          <RoleCard
            key={role}
            role={role}
            icon={icon}
            title={title}
            description={t("selectRole")}
            isSelected={selectedRole === role}
            onSelect={handleRoleSelect}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          size="lg"
          disabled={!selectedRole}
          onClick={handleRouter}
          className={cn(
            "w-full px-8 py-4 text-base font-semibold rounded-xl transition-all duration-200",
            selectedRole
              ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]"
              : "bg-muted text-muted-foreground cursor-not-allowed",
          )}
        >
          {selectedRole ? (
            <div className="flex items-center justify-center gap-2">
              <span>{BUTTON_TEXT[selectedRole]}</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          ) : (
            <span>{t("buttonText.select")}</span>
          )}
        </Button>
      </div>
    </div>
  )
}

export default ChooseRoleUi
