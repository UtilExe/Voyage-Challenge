"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { CreateVoyageForm } from "./create-voyage-form";

export function CreateVoyageSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Create Voyage</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Create New Voyage</SheetTitle>
          <SheetDescription>
            Fill in the details to create a new voyage.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <CreateVoyageForm onSuccess={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
