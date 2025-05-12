"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PopUpForms({
  btnTitle,
  btnClassName,
}: {
  btnTitle: string;
  btnClassName?: string;
}) {
  // Define the schema using Zod
  const FormSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number is required" }),
  });

  type FormSchema = z.infer<typeof FormSchema>;

  // Initialize the form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Handle form submission
  function onSubmit(values: FormSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger className={cn("", btnClassName)}>{btnTitle}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get a Quote</DialogTitle>
          <DialogDescription>
            Leave your details to be contacted by one of our specialists
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            {...register("name")}
            placeholder="Your name"
            className="border p-2 rounded"
          />
          <p>{errors.name?.message}</p>
          <Input
            {...register("email")}
            placeholder="Your email"
            className="border p-2 rounded"
          />
          <p>{errors.email?.message}</p>
          <Input
            {...register("phone")}
            placeholder="Your phone"
            className="border p-2 rounded"
          />
          <p>{errors.phone?.message}</p>
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
