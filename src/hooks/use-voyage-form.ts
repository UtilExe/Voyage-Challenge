import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { ReturnType as UnitTypesResponse } from "~/app/api/unitType/getAll/route";
import type { ReturnType as VesselsResponse } from "~/app/api/vessel/getAll/route";
import { fetchData } from "~/lib/utils";
import {
  createVoyageSchema,
  type CreateVoyageInput,
} from "~/lib/validations/voyage";

export function useVoyageForm(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CreateVoyageInput>({
    resolver: zodResolver(createVoyageSchema),
    defaultValues: {
      departure: "",
      arrival: "",
      portOfLoading: "",
      portOfDischarge: "",
      vessel: "",
      unitTypes: [],
    },
  });

  const { data: vessels = [] } = useQuery<VesselsResponse>({
    queryKey: ["vessels"],
    queryFn: () => fetchData("vessel/getAll"),
  });

  const { data: unitTypes = [] } = useQuery<UnitTypesResponse>({
    queryKey: ["unitTypes"],
    queryFn: () => fetchData("unitType/getAll"),
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateVoyageInput) => {
      const payload = {
        ...data,
        departure: new Date(data.departure).toISOString(),
        arrival: new Date(data.arrival).toISOString(),
      };

      const response = await fetch("/api/voyage/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create voyage");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Voyage created successfully");
      queryClient.invalidateQueries({ queryKey: ["voyages"] });
      reset();
      onSuccess?.();
    },
    onError: () => {
      toast.error("Failed to create voyage. Please try again.");
    },
  });

  const onSubmit = (data: CreateVoyageInput) => {
    mutation.mutate(data);
  };

  const selectedUnitTypes = watch("unitTypes");

  const toggleUnitType = (unitTypeId: string) => {
    const current = selectedUnitTypes;
    const updated = current.includes(unitTypeId)
      ? current.filter((id) => id !== unitTypeId)
      : [...current, unitTypeId];
    setValue("unitTypes", updated);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    vessels,
    unitTypes,
    selectedUnitTypes,
    toggleUnitType,
    isSubmitting: mutation.isPending,
  };
}
