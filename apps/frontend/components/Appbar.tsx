import { Button } from "./ui/button";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'


export function Appbar() {
    return (
        <div className="flex justify-between">
           <div className="font-bold">Brix</div> 
           <div>
            <SignedOut>
                <SignInButton />
                <SignUpButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
           </div>
        </div>
    )
}