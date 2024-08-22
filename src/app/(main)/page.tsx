import { ModeToggle } from "@/components/globals/mode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen w-full justify-center items-center bg-background text-foreground">
      <ModeToggle/>
      <Button className="bg-primary text-primary-foreground">
          here
      </Button>
    </div>
  );
}
