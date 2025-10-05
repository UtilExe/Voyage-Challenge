"use client";

import { Button } from "~/components/ui/button";
import { useVoyageForm } from "~/hooks/use-voyage-form";
import { FormField } from "./form-field";

export function CreateVoyageForm({
  onSuccess,
}: Readonly<{
  onSuccess?: () => void;
}>) {
  const {
    register,
    handleSubmit,
    errors,
    vessels,
    unitTypes,
    selectedUnitTypes,
    toggleUnitType,
    isSubmitting,
  } = useVoyageForm(onSuccess);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        id="departure"
        label="Departure"
        type="datetime-local"
        register={register}
        error={errors.departure}
      />

      <FormField
        id="arrival"
        label="Arrival"
        type="datetime-local"
        register={register}
        error={errors.arrival}
      />

      <FormField
        id="portOfLoading"
        label="Port of Loading"
        type="text"
        placeholder="Enter port name"
        register={register}
        error={errors.portOfLoading}
      />

      <FormField
        id="portOfDischarge"
        label="Port of Discharge"
        type="text"
        placeholder="Enter port name"
        register={register}
        error={errors.portOfDischarge}
      />

      <div>
        <label htmlFor="vessel" className="block text-sm font-medium mb-1">
          Vessel
        </label>
        <select
          id="vessel"
          {...register("vessel")}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Select a vessel</option>
          {vessels.map((vessel) => (
            <option key={vessel.value} value={vessel.value}>
              {vessel.label}
            </option>
          ))}
        </select>
        {errors.vessel && (
          <p className="text-sm text-destructive mt-1">
            {errors.vessel.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Unit Types</label>
        <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
          {unitTypes.map((unitType) => (
            <div key={unitType.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`unitType-${unitType.id}`}
                checked={selectedUnitTypes.includes(unitType.id)}
                onChange={() => toggleUnitType(unitType.id)}
                className="rounded border-input"
              />
              <label
                htmlFor={`unitType-${unitType.id}`}
                className="text-sm cursor-pointer"
              >
                {unitType.name}
              </label>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Select at least one unit type
        </p>
        {errors.unitTypes && (
          <p className="text-sm text-destructive mt-1">
            {errors.unitTypes.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Voyage"}
      </Button>
    </form>
  );
}
