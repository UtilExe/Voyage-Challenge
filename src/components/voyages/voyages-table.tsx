"use client";

import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";
import type { ReturnType } from "~/app/api/voyage/getAll/route";
import { fetchData } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { TABLE_DATE_FORMAT } from "~/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { UnitTypesPopover } from "./unit-types-popover";

export function VoyagesTable() {
  const { data: voyages } = useQuery<ReturnType>({
    queryKey: ["voyages"],
    queryFn: () => fetchData("voyage/getAll"),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (voyageId: string) => {
      const response = await fetch(`/api/voyage/delete?id=${voyageId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the voyage");
      }
    },
    onSuccess: async () => {
      toast.success("Voyage deleted successfully");
      await queryClient.invalidateQueries([
        "voyages",
      ] as InvalidateQueryFilters);
    },
    onError: () => {
      toast.error("Failed to delete voyage. Please try again.");
    },
  });

  const handleDelete = (voyageId: string) => {
    mutation.mutate(voyageId);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Departure</TableHead>
          <TableHead>Arrival</TableHead>
          <TableHead>Port of loading</TableHead>
          <TableHead>Port of discharge</TableHead>
          <TableHead>Vessel</TableHead>
          <TableHead>Unit Types</TableHead>
          <TableHead>&nbsp;</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {voyages?.map((voyage) => (
          <TableRow key={voyage.id}>
            <TableCell>
              {format(
                new Date(voyage.scheduledDeparture),
                TABLE_DATE_FORMAT,
              )}
            </TableCell>
            <TableCell>
              {format(new Date(voyage.scheduledArrival), TABLE_DATE_FORMAT)}
            </TableCell>
            <TableCell>{voyage.portOfLoading}</TableCell>
            <TableCell>{voyage.portOfDischarge}</TableCell>
            <TableCell>{voyage.vessel.name}</TableCell>
            <TableCell>
              <UnitTypesPopover unitTypes={voyage.unitTypes} />
            </TableCell>
            <TableCell>
              <Button
                onClick={() => handleDelete(voyage.id)}
                variant="outline"
              >
                X
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
