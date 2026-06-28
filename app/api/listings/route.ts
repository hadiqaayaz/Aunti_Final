import { NextRequest, NextResponse } from "next/server";
import { mockDoulas } from "@/lib/mock-data";
import type { Doula, DoulaSpecialty, ListingsResponse, ApiResponse } from "@/lib/types";

const VALID_SPECIALTIES: readonly DoulaSpecialty[] = [
  "birth",
  "postpartum",
  "full-spectrum",
];

function isDoulaSpecialty(value: string): value is DoulaSpecialty {
  return (VALID_SPECIALTIES as readonly string[]).includes(value);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<ListingsResponse>>> {
  try {
    await delay(500);

    const { searchParams } = new URL(request.url);
    const zipCode = searchParams.get("zipCode")?.trim() ?? "";
    const date = searchParams.get("date")?.trim() ?? "";
    const specialtiesParam = searchParams.get("specialties") ?? "";
    const maxPackagePrice = searchParams.get("maxPackagePrice");
    const maxAddonRate = searchParams.get("maxAddonRate");
    const tagsParam = searchParams.get("tags") ?? "";

    const specialties = specialtiesParam
      .split(",")
      .map((s) => s.trim())
      .filter((s): s is DoulaSpecialty => s.length > 0 && isDoulaSpecialty(s));

    const tags = tagsParam
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    let results: Doula[] = mockDoulas;

    if (zipCode) {
      results = results.filter((doula) => doula.zipCode.startsWith(zipCode));
    }

    if (specialties.length > 0) {
      results = results.filter((doula) =>
        specialties.some((s) => doula.specialties.includes(s))
      );
    }

    if (date) {
      results = results.filter(
        (doula) => !doula.availableDates || doula.availableDates.includes(date)
      );
    }

    if (maxPackagePrice) {
      const max = parseInt(maxPackagePrice, 10);
      if (!isNaN(max)) {
        results = results.filter((doula) => doula.packagePrice <= max);
      }
    }

    if (maxAddonRate) {
      const max = parseInt(maxAddonRate, 10);
      if (!isNaN(max)) {
        results = results.filter((doula) => doula.addonRate <= max);
      }
    }

    if (tags.length > 0) {
      results = results.filter((doula) =>
        tags.every((tag) => doula.tags.includes(tag))
      );
    }

    const payload: ListingsResponse = {
      results,
      total: results.length,
    };

    return NextResponse.json({ ok: true, data: payload });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to load listings. Please try again." },
      { status: 500 }
    );
  }
}