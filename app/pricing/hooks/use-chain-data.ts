import { useEffect, useState } from "react";
import { z } from "zod";

// Define Zod schema for chain data
const ChainDataSchema = z.object({
  name: z.string(),
  image: z.string(),
  chainId: z.number(),
});

// Define the type from the schema
type ChainData = z.infer<typeof ChainDataSchema>;

// Define schema for the API response
const ConstantsResponseSchema = z.array(ChainDataSchema);

export function useChainData() {
  const [chainData, setChainData] = useState<ChainData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<z.ZodError | null>(
    null
  );

  useEffect(() => {
    const fetchChainData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_PRICE_CHAINS_IMAGES;
        if (!url) {
          throw new Error("PRICE_CHAINS_IMAGES is not set");
        }
        const response = await fetch(url);
        const rawData = await response.json();

        // Validate with Zod
        try {
          const validatedData = ConstantsResponseSchema.parse(rawData);
          setChainData(validatedData);
          console.log("Chain data validated successfully");
        } catch (validationError) {
          if (validationError instanceof z.ZodError) {
            console.warn(
              "Chain data validation failed:",
              validationError.format()
            );
            setValidationErrors(validationError);
          } else {
            console.warn("Unknown validation error:", validationError);
          }

          // Fallback to manual validation for resilience
          const validChains = Array.isArray(
            rawData.priceGetterSupportedChainsImages
          )
            ? rawData.priceGetterSupportedChainsImages.filter(
              (chain: any) =>
                typeof chain === "object" &&
                chain !== null &&
                typeof chain.name === "string" &&
                typeof chain.image === "string" &&
                typeof chain.chainId === "number"
            )
            : [];

          setChainData(validChains);
        }
      } catch (err) {
        setError("Failed to fetch chain data");
        console.error("Failed to fetch chain data:", err);
        setChainData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChainData();
  }, []);

  return {
    chainData,
    isLoading,
    error,
    validationErrors,
  };
}
