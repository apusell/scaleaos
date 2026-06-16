import Image from "next/image";

export default function Logo({ size = 28, withWord = false, className = "" }: { size?: number; withWord?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image src="/logo.png" alt="ScaleaOS" width={size} height={size} priority className="logo-img object-contain" style={{ width: size, height: size }} />
      {withWord && <span className="text-[15px] font-semibold tracking-tight text-snow">ScaleaOS</span>}
    </span>
  );
}
