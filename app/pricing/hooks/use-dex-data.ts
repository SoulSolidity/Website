import { useEffect, useState, useCallback } from "react";
import { DexFactories, DexProtocol } from "../lib/constants";
import { z } from "zod";

// Define Zod schemas for validation
const DexProtocolSchema = z.object({
  name: z.string(),
  factory: z.string(),
  router: z.string().optional(),
  protocol: z.union([
    z.literal(0), // UNIV2
    z.literal(1), // UNIV3
    z.literal(3), // ALGEBRA
    z.literal(4), // ALGEBRA_INTEGRAL
    z.literal(5), // SOLIDLY
    z.literal(6), // CURVE
  ]),
});

const DexFactoriesSchema = z.object({
  dexFactories: z.record(z.string(), z.array(DexProtocolSchema)),
});

export function useDexData() {
  const [dexData, setDexData] = useState<DexFactories | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<z.ZodError | null>(
    null
  );

  useEffect(() => {
    const fetchDexData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/data/constants/dex.json"
        );
        const rawData = await response.json();

        // Validate data with Zod
        try {
          const validatedData = DexFactoriesSchema.parse(rawData);
          setDexData(validatedData);
          console.log("DEX data validated successfully");
        } catch (validationError) {
          if (validationError instanceof z.ZodError) {
            console.warn(
              "DEX data validation failed:",
              validationError.format()
            );
            setValidationErrors(validationError);
          } else {
            console.warn("Unknown validation error:", validationError);
          }
          // Still set the data, but log the validation error
          setDexData(rawData);
        }
      } catch (err) {
        setError("Failed to fetch DEX data");
        console.error("Failed to fetch DEX data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDexData();
  }, []);

  const getUniqueDexes = useCallback(() => {
    if (!dexData) return new Set<string>();

    const uniqueDexes = new Set<string>();
    try {
      Object.values(dexData.dexFactories).forEach((chainDexes) => {
        chainDexes.forEach((dex) => {
          if (
            typeof dex === "object" &&
            dex !== null &&
            typeof dex.name === "string"
          ) {
            uniqueDexes.add(dex.name);
          }
        });
      });
    } catch (err) {
      console.error("Error processing DEX data:", err);
    }
    return new Set(Array.from(uniqueDexes).sort());
  }, [dexData]);

  const getFeaturedDexes = useCallback(() => {
    if (!dexData) return [];

    const uniqueDexMap = new Map<string, DexProtocol>();
    try {
      Object.values(dexData.dexFactories).forEach((chainDexes) => {
        chainDexes.forEach((dex) => {
          if (
            typeof dex === "object" &&
            dex !== null &&
            typeof dex.name === "string" &&
            !uniqueDexMap.has(dex.name)
          ) {
            uniqueDexMap.set(dex.name, dex);
          }
        });
      });

      return Array.from(uniqueDexMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } catch (err) {
      console.error("Error processing featured DEX data:", err);
      return [];
    }
  }, [dexData]);

  return {
    dexData,
    isLoading,
    error,
    validationErrors,
    getUniqueDexes,
    getFeaturedDexes,
  };
}
