import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button variant="ghost" size="rounded">
      <Moon
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        onClick={() => setTheme("dark")}
      />
      <Sun
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        onClick={() => setTheme("light")}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
