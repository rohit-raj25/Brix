import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export function Appbar() {
	return (
    <div className=" top-6  mx-auto flex justify-between  items-center bg-background  py-2 md:py-3 ">
 
      <Link href="/" className="cursor-pointer font-space-grotesk font-bold text-xl pl-8">
        Brix
      </Link>
      <div className="flex justify-center items-center gap-2 pr-6">
      <SignedOut>
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm" className="cursor-pointer">
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button variant="default" size="sm" className="cursor-pointer">
              Sign up
            </Button>
          </SignUpButton>
      </SignedOut>
      <SignedIn>
          <UserButton />
      </SignedIn>
      </div>
    </div>
  );
}