"use client";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "./ui/tabs";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { ClipboardIcon, TerminalIcon, CheckIcon } from 'lucide-react';
import { useCreateCmd, usePackageCmd } from "@/stores/cmd";
import { useCopyToClipboard } from "usehooks-ts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

const installCommands = {
  pnpm: "pnpm dlx shadcn@latest add ",
  npm: "npx shadcn@latest add ",
  yarn: "yarn dlx shadcn@latest add ",
  bun: "bunx --bun shadcn@latest add ",
};

export default function Code() {
  const packageName = usePackageCmd((state) => state.packageName);
  const setCurrentPackage = usePackageCmd((state) => state.setCurrentPackage);
  const [copiedText, copy] = useCopyToClipboard();
  const [showCopied, setShowCopied] = useState(false);
  const component = useCreateCmd((state) => state.component);
  const selectedComponents = component.map((c) => c.id).join(" ");

  const handleCopyToClipboard = async (fullCommand: string) => {
    try {
      // Try using the useCopyToClipboard hook first
      const success = await copy(fullCommand);
      
      if (success) {
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
        return;
      }
      
      // Fallback to native clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(fullCommand);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = fullCommand;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          setShowCopied(true);
          setTimeout(() => setShowCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        } finally {
          textArea.remove();
        }
      }
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  // Reset copied state when components change
  useEffect(() => {
    setShowCopied(false);
  }, [selectedComponents]);

  const currentCommand = installCommands[packageName as keyof typeof installCommands];
  const fullCommand = currentCommand + (component.length > 0 ? selectedComponents : "");

  return (
    <Card className="w-full max-w-2xl mx-auto border border-border/50 bg-card/50 backdrop-blur-sm gap-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <TerminalIcon className="h-5 w-5 text-muted-foreground" />
          <span>Install Command</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs
          defaultValue="pnpm"
          value={packageName}
          onValueChange={setCurrentPackage}
          className="w-full"
        >
          {/* Package Manager Selector */}
          <div className="flex items-center justify-between mb-4">
            <TabsList className="bg-muted/50 p-1 h-auto rounded-lg">
              {Object.keys(installCommands).map((pkg) => (
                <TabsTrigger
                  key={pkg}
                  value={pkg}
                  className="px-4 py-2 text-sm font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md"
                >
                  {pkg}
                </TabsTrigger>
              ))}
            </TabsList>
            {/* Copy Button */}
            <Button
              variant="outline"
              size="sm"
              className={`transition-all duration-200 ${
                showCopied 
                  ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-50 dark:bg-green-950 dark:border-green-800 dark:text-green-400' 
                  : 'hover:bg-muted'
              }`}
              onClick={() => handleCopyToClipboard(fullCommand)}
              disabled={component.length === 0}
            >
              <div className="flex items-center gap-2">
                {showCopied ? (
                  <>
                    <CheckIcon className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <ClipboardIcon className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-medium">Copy</span>
                  </>
                )}
              </div>
            </Button>
          </div>

          {/* Command Display */}
          {Object.entries(installCommands).map(([pkg]) => (
            <TabsContent key={pkg} value={pkg} className="mt-0">
              <div className="relative group">
                <ScrollArea className="w-full">
                  <div 
                    className={`
                      bg-slate-950 dark:bg-slate-900 text-slate-100 font-mono text-sm
                      px-4 py-4 rounded-lg border border-slate-700
                      transition-all duration-200 cursor-pointer
                      hover:border-slate-600 hover:shadow-lg
                      ${showCopied ? 'ring-2 ring-green-500/50' : ''}
                    `}
                    onClick={() => handleCopyToClipboard(fullCommand)}
                  >
                    <div className="flex items-center gap-2 whitespace-nowrap min-w-fit">
                      <span className="text-slate-400 select-none">$</span>
                      <span className="text-emerald-400 font-semibold">
                        {currentCommand.trim()}
                      </span>
                      {component.length > 0 && (
                        <span className="text-slate-100">
                          {selectedComponents}
                        </span>
                      )}
                      {component.length === 0 && (
                        <span className="text-slate-500 italic">
                          Select components to install
                        </span>
                      )}
                    </div>
                  </div>
                  <ScrollBar orientation="horizontal" className="mt-2" />
                </ScrollArea>
                
                {/* Hover indicator */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
              </div>
            </TabsContent>
          ))}

          {/* Component Count */}
          {component.length > 0 && (
            <div className="flex items-center justify-center mt-4 pt-3 border-t border-border/50">
              <span className="text-sm text-muted-foreground">
                {component.length} component{component.length !== 1 ? 's' : ''} selected
              </span>
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
