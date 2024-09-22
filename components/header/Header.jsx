import Link from "next/link";
import { HeartIcon } from "@heroicons/react/outline"; // Import Heroicons HeartIcon
import Image from "next/image";
import HeaderDropdown from "./HeaderDropdown";
import { auth, signOut } from "@/auth";

const Header = async () => {
  const session = await auth();
  console.log("SESSION", session)
  const logOut = async () => {
    "use server";
    await signOut();
  };
  return (
    <header className="w-full flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-7xl flex items-center justify-between px-4 py-2">
        <Link href="/">
          <Image src="/images/logo.png" width={170} height={48} alt="LOGO" />
        </Link>
        <div className="flex items-center justify-center gap-5">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/tiers" className="hover:text-primary">
            Tiers
          </Link>
          <Link href="/my-account" className="hover:text-primary">
            My Account
          </Link>
          <Link href="/how-it-works" className="hover:text-primary">
            How it Works
          </Link>
          <Link href="/faqs" className="hover:text-primary">
            FAQs
          </Link>
          <Link href="/contact-us" className="hover:text-primary">
            Contact Us
          </Link>
        </div>
        {session ? (
          <div className="flex items-center gap-3">
            <Link href="/wishlist" className="text-gray-700 hover:text-primary">
              <HeartIcon className="h-6 w-6" />
            </Link>
            <HeaderDropdown loginInfo={session} logOut={logOut} />
          </div>
        ) : (
          <Link href="/login" className="bg-primary text-black px-8 py-2.5">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
