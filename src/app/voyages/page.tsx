import type { Metadata } from "next";
import { CreateVoyageSheet } from "~/components/voyages/create-voyage-sheet";
import { VoyagesTable } from "~/components/voyages/voyages-table";

export const metadata: Metadata = {
  title: "Voyages | DFDS",
  description: "View and manage DFDS voyages",
};

export default function VoyagesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mt-6">
        <CreateVoyageSheet />
      </div>
      <VoyagesTable />
    </div>
  );
}
