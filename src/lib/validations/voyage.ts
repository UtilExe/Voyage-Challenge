import { z } from "zod";

export const createVoyageSchema = z
  .object({
    departure: z.string().min(1, "Departure date is required"),
    arrival: z.string().min(1, "Arrival date is required"),
    portOfLoading: z.string().min(1, "Port of loading is required"),
    portOfDischarge: z.string().min(1, "Port of discharge is required"),
    vessel: z.string().min(1, "Vessel is required"),
    unitTypes: z.array(z.string()).min(1, "At least one unit type is required"),
  })
  .refine((data) => new Date(data.departure) < new Date(data.arrival), {
    message: "Departure must be before arrival",
    path: ["arrival"],
  });

export type CreateVoyageInput = z.infer<typeof createVoyageSchema>;
