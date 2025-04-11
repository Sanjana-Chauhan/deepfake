// "use client"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Gauge } from "lucide-react";
// import { Button } from "./ui/button";
// import { useRouter } from "next/navigation";



// interface PredictionResultProps {
//   prediction: "real" | "fake";
//   confidence: number;
//   probabilities: {
//     fake: number;
//     real: number;
//   };
// }

// export default function Outputcard({
//   prediction,
//   confidence,
//   probabilities,
// }: PredictionResultProps) {

//   const router=useRouter();

//    const handleBack=( e: React.MouseEvent<HTMLButtonElement>)=> {
//     router.refresh();
//   }
//   return (
//     <Card className="bg-zinc-900/10 border-0 rounded-xl text-white">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 text-lg">
//           <Gauge className="w-5 h-5" />
//           Deepfake Detection Result
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         <div className="text-center">
//           <p className="text-sm text-zinc-400">Prediction</p>
//           <h2
//             className={`text-2xl font-bold ${
//               prediction === "real" ? "text-green-400" : "text-red-500"
//             }`}
//           >
//             {prediction.toUpperCase()}
//           </h2>
//         </div>

//         <div className="text-center">
//           <p className="text-sm text-zinc-400">Confidence</p>
//           <p className="text-xl font-semibold text-blue-400">
//             {(confidence * 100).toFixed(2)}%
//           </p>
//         </div>

//         <div className="flex justify-between items-center text-sm text-zinc-300">
//           <div>
//             <p>Real:</p>
//             <Badge
//               className="bg-green-600/20 border border-green-500 text-green-400"
//               variant="outline"
//             >
//               {(probabilities.real * 100).toFixed(2)}%
//             </Badge>
//           </div>

//           <div>
//             <p>Fake:</p>
//             <Badge
//               className="bg-red-600/20 border border-red-500 text-red-400"
//               variant="outline"
//             >
//               {(probabilities.fake * 100).toFixed(2)}%
//             </Badge>
//           </div>
//         </div>
//         <div className="flex justify-center">
//           <Button  className="bg-gradient-to-r from-purple-600 to-pink-600/70 text-white px-8 mt-3 py-1" onClick={handleBack}>
//             Try Another
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
