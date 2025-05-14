"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { FormBasic } from "@/components/shared/forms/form-basic";

type PopUpFormsProps = {
  btnTitle: string;
  btnClassName?: string;
};

export default function DialogWrapperForm({
  btnTitle,
  btnClassName,
}: PopUpFormsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={cn("", btnClassName)}>{btnTitle}</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get a Quote</DialogTitle>
          <DialogDescription>
            Leave your details to be contacted by one of our specialists
          </DialogDescription>
        </DialogHeader>

        {/*Form component*/}
        <FormBasic />
      </DialogContent>
    </Dialog>
  );
}
