"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import type { ReturnType as UnitTypesResponse } from "~/app/api/unitType/getAll/route";

type UnitType = UnitTypesResponse[number];

export function UnitTypesPopover({
  unitTypes,
}: Readonly<{
  unitTypes: UnitType[];
}>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className="p-0">
          {unitTypes.length}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Unit Types</h4>
          <div className="space-y-1">
            {unitTypes.map((unitType) => (
              <div
                key={unitType.id}
                className="flex justify-between text-sm py-1"
              >
                <span>{unitType.name}</span>
                <span className="text-muted-foreground">
                  {unitType.defaultLength}
                </span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
