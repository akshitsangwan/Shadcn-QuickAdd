import Components from "@/components/components";
import Code from "@/components/code";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-background">
      <Card className="w-full max-w-3xl shadow-lg border-2 border-border/60">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold text-center">Shadcn QuickAdd</CardTitle>
          <CardDescription className="text-center text-lg mt-2">
            Select multiple shadcn/ui components and generate a single install command instantly.
          </CardDescription>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent className="flex flex-col gap-10">
          <Components />
          <Code />
        </CardContent>
      </Card>
    </div>
  );
}
