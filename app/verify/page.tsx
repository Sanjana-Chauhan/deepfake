// app/verify/page.tsx

import ImageUploader from "@/components/ImageUploader"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { SparklesCore } from "@/components/sparkles"
import FloatingPaper from "@/components/floating-paper"

export default function VerifyPage() {
  return (
    <div className="min-h-screen w-full text-foreground flex items-center justify-center px-2 py-12  bg-black/[0.96] antialiased bg-grid-white/[0.02] relative">
        <div className="h-full w-full absolute inset-0 z-0">
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
              <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>
      <div className=" w-1/2 relative z-10 bg-zinc-900/80  ">
        <Card className="border border-white w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Deepfake Image Verifier</CardTitle>
           
          </CardHeader>
          <ImageUploader />
        </Card>
      </div>
    </div>
  )
}
