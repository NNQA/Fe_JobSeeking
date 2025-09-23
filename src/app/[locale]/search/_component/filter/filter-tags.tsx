"use client"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface FilterTagsProps {
    label: string
    onRemove: () => void
}

export function FilterTags({ label, onRemove }: FilterTagsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 0.2,
            }}
            whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.95 }}
            className="group"
        >
            <Badge
                variant="default"
                className="py-1 flex gap-2 items-center justify-center"
                onClick={onRemove}
            >
                <span className="truncate max-w-[200px] text-xs font-normal tracking-normal">{label}</span>
                <span className="text-sm">X</span>
            </Badge>
        </motion.div>
    )
}
