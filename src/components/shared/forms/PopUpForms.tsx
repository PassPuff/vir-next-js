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
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";

export default function PopUpForms() {
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();

  const SchemaForm = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number is required" }),
  });

  type FormData = z.infer<typeof SchemaForm>;

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "fixed right-0 z-20 bg-[var(--yellow)] p-3 -rotate-90 origin-bottom-right font-bold text-2xl cursor-pointer shadow-2xl",
        )}
      >
        Make a request
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get a Quote</DialogTitle>
          <DialogDescription>
            Leave your details to be contacted by one of our specialists
          </DialogDescription>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <input
              {...register("name", { required: true })}
              className="border p-2 rounded"
            />
            <input
              {...register("email", { required: true })}
              className="border p-2 rounded"
            />
            <input
              {...register("phone", { required: true })}
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-[var(--yellow)] p-2 rounded font-bold text-white"
            >
              Submit
            </button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
