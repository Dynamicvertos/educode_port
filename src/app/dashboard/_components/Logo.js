import Image from "next/image";

export default function Logo({ className = "h-7 w-7" }) {
  return (
    <Image
      src="/icon.ico"   // path relative to /public
      alt="TheEduCode logo"
      width={48}
      height={48}
      className={className}
    />
  );
}
