import type { Metadata } from "next";
import { VoyagesTable } from "~/components/voyages-table";

export const metadata: Metadata = {
  title: "Voyages | DFDS",
  description: "View and manage DFDS voyages",
};

export default function VoyagesPage() {
  return <VoyagesTable />;
}
