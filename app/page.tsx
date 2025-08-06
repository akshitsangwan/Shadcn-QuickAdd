import Components from "@/components/components";
import Code from "@/components/code";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Card className="w-full shadow-none border-0 bg-transparent pt-10">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center font-rubik">Shadcn QuickAdd</CardTitle>
          <CardDescription className="text-center text-base">
            Select multiple shadcn/ui components and generate a single install command instantly.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-10">
          <Components />
          <Code />
        </CardContent>
      </Card>
    </div>
  );
}
