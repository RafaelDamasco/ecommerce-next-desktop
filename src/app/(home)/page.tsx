"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="p-5">
      <Image
        src="/banner-home-01.png"
        className="w-ful h-auto"
        height={0}
        width={0}
        sizes="100vw"
        alt="Ate 55% de desconto esse mes"
      />
    </div>
  );
}
