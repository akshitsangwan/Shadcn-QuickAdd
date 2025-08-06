import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Footer() {
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "#";

  return (
    <Card className="fixed right-3 bottom-2 mx-auto w-fit p-0 rounded-lg border border-border/60 bg-background/80 shadow-lg z-40">
      <CardContent className="flex flex-col items-center justify-center p-2 px-2.5 gap-0">
        <span className="text-xs text-muted-foreground">Built by Akshit Sangwan</span>
        <Button variant="link" className="text-primary/80 p-0 h-auto text-xs">
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
            Github
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
