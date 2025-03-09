import { useEffect, useState } from "react";
import { z } from "zod";

// Define Zod schema for playground token data
const PlaygroundTokenSchema = z.object({
  name: z.string(),
  address: z.string(),
  chainId: z.number(),
  icon: z.string(),
  isLp: z.boolean().optional().default(false),
  lpIcons: z.array(z.string()).optional().default([]),
});

// Define the type from the schema
type PlaygroundToken = z.infer<typeof PlaygroundTokenSchema>;

// Define schema for the API response
const ConstantsResponseSchema = z.object({
  priceGetterPlaygroundTokens: z.array(PlaygroundTokenSchema),
});

export function usePlaygroundData() {
  const [playgroundTokens, setPlaygroundTokens] = useState<PlaygroundToken[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<z.ZodError | null>(
    null
  );

  useEffect(() => {
    const fetchPlaygroundData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/data/constants/constants.json"
        );
        const rawData = await response.json();

        // Validate with Zod
        try {
          const validatedData = ConstantsResponseSchema.parse(rawData);
          setPlaygroundTokens(validatedData.priceGetterPlaygroundTokens);
          console.log("Playground data validated successfully");
        } catch (validationError) {
          if (validationError instanceof z.ZodError) {
            console.warn(
              "Playground data validation failed:",
              validationError.format()
            );
            setValidationErrors(validationError);
          } else {
            console.warn("Unknown validation error:", validationError);
          }

          // Fallback to manual validation for resilience
          const validTokens = Array.isArray(rawData.priceGetterPlaygroundTokens)
            ? rawData.priceGetterPlaygroundTokens.filter(
                (token: any) =>
                  typeof token === "object" &&
                  token !== null &&
                  typeof token.name === "string" &&
                  typeof token.address === "string" &&
                  typeof token.chainId === "number"
              )
            : [];

          setPlaygroundTokens(validTokens);
        }
      } catch (err) {
        setError("Failed to fetch playground data");
        console.error("Failed to fetch playground data:", err);
        setPlaygroundTokens([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaygroundData();
  }, []);

  return {
    playgroundTokens,
    isLoading,
    error,
    validationErrors,
  };
}
