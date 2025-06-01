import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "../ui/button"
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

const Header = () => {
  return (
    <header className="fixed top-0 w-full border-b bg-background/70 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60 ">
      <nav className=" container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={`/`}>ABRAI</Link>
        <div className=" flex items-center gap-4">
          <SignedIn>
            <Link href={`/dashboard`}>
              <Button variant={"outline"} className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:block ">Industry Insights</span>
              </Button>
            </Link>

            
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <StarsIcon className="h-4 w-4" />
                    <span className="hidden md:block ">Growth Tools</span>
                    <ChevronDown className=" h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href={`/resume`} className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span >Build Resume</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/ai-cover-letter`} className="flex items-center gap-2">
                      <PenBox className="h-4 w-4" />
                      <span >Cover Letter</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/interview`} className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      <span >Interview Preparation</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

          </SignedIn>
          <SignedIn>
            <UserButton appearance={
              {
                elements:{
                  avatarBox: "h-10 w-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "text-semibold",
                }
              }

            } 
            afterSwitchSessionUrl="/"
            afterSignOutUrl="/"
            />
          </SignedIn>
          <SignedOut>
            <SignInButton >
              <Button variant={"outline"}>Sign In</Button>
            </SignInButton>
          </SignedOut>

        </div>
   

    </nav>

    </header >
  )
}

export default Header