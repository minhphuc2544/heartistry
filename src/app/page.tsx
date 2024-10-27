"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div style={{width: `${window.innerWidth}px`, height: `${window.innerHeight}px`}}>
      <Image alt="Deployment Model" width={1438} height={542} src={"/deployment_model.svg"} style={{position: "relative", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} />
    </div>
  );
}
