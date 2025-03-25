import React from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from 'next/link';
interface CommonAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: "success" | "error";
  title: string;
  description: string;
  titleClassName?: string;
  cancelText?: string;
  actionText?: string;
  actionLink?: string;
}
const CommonAlertDialog: React.FC<CommonAlertDialogProps> = ({
  open,
  onOpenChange,
  variant,
  title,
  description,
  titleClassName,
  cancelText,
  actionText,
  actionLink,
}) => {

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader className={variant === "success" ? "p-4" : undefined}>
          <AlertDialogTitle className={titleClassName}>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        {variant === "error" && (cancelText || actionText) && (
          <AlertDialogFooter>
            {cancelText && <AlertDialogCancel>{cancelText}</AlertDialogCancel>}
            {actionText && actionLink && (
              <AlertDialogAction>
                <Link href={actionLink} className='no-underline text-secondary'>{actionText}</Link>
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CommonAlertDialog