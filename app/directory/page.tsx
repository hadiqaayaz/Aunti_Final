import { DirectoryPageClient } from "@/components/directory/DirectoryPage";
import type { DoulaSpecialty } from "@/lib/types";

const VALID_SPECIALTIES: DoulaSpecialty[] = ["birth", "postpartum", "full-spectrum"];

interface DirectoryPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function DirectoryPage({ searchParams }: DirectoryPageProps) {
  const params = await searchParams;

  const zipCode = typeof params.zipCode === "string" ? params.zipCode : "";
  const date = typeof params.date === "string" ? params.date : "";

  const specialtiesRaw =
    typeof params.specialties === "string" ? params.specialties : "";
  const specialties: DoulaSpecialty[] = specialtiesRaw
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is DoulaSpecialty => VALID_SPECIALTIES.includes(s as DoulaSpecialty));

  return (
    <DirectoryPageClient
      initialZipCode={zipCode}
      initialSpecialties={specialties}
      initialDate={date}
    />
  );
}
