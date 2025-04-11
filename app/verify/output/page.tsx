"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { SparklesCore } from "@/components/sparkles";
import { Suspense } from "react";

export default function Outputcard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const predictionParam = searchParams.get("prediction");
  const prediction =
    predictionParam === "real" || predictionParam === "fake"
      ? predictionParam
      : "fake";

  const confidence = isNaN(parseFloat(searchParams.get("confidence") || ""))
    ? 0
    : parseFloat(searchParams.get("confidence")!);

  const real = isNaN(parseFloat(searchParams.get("real") || ""))
    ? 0
    : parseFloat(searchParams.get("real")!);

  const fake = isNaN(parseFloat(searchParams.get("fake") || ""))
    ? 0
    : parseFloat(searchParams.get("fake")!);

  const probabilities = { real, fake };

  const handleBack = () => {
    router.push("/verify");
  };

  return (
    <Suspense
      fallback={<div className="text-white text-center p-4">Loading...</div>}
    >
      <div className="min-h-screen w-full text-foreground flex items-center justify-center px-2 py-12 bg-black/[0.96] antialiased bg-grid-white/[0.02] relative">
        <div className="h-full w-full absolute inset-0 z-0 pointer-events-none">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        <Card className="bg-zinc-900/10 border-0 rounded-xl text-white w-1/2  border border-zinc-300/60 z-10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Gauge className="w-5 h-5" />
              Deepfake Detection Result
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-zinc-400">Prediction</p>
              <h2
                className={`text-2xl font-bold ${
                  prediction === "real" ? "text-green-400" : "text-red-500"
                }`}
              >
                {prediction.toUpperCase()}
              </h2>
            </div>

            <div className="text-center">
              <p className="text-sm text-zinc-400">Confidence</p>
              <p className="text-xl font-semibold text-blue-400">
                {(confidence * 100).toFixed(2)}%
              </p>
            </div>

            <div className="flex justify-between items-center text-sm text-zinc-300">
              <div>
                <p>Real:</p>
                <Badge
                  className="bg-green-600/20 border border-green-500 text-green-400"
                  variant="outline"
                >
                  {(probabilities.real * 100).toFixed(2)}%
                </Badge>
              </div>

              <div>
                <p>Fake:</p>
                <Badge
                  className="bg-red-600/20 border border-red-500 text-red-400"
                  variant="outline"
                >
                  {(probabilities.fake * 100).toFixed(2)}%
                </Badge>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-600/70 text-white px-8 mt-3 py-1"
                onClick={handleBack}
              >
                Try Another
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>{" "}
    </Suspense>
  );
}
