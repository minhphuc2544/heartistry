"use client";

import dynamic from "next/dynamic";

const DeploymentModelWithNoSSR = dynamic(
  () => import('../components/DeploymentModel'),
  { ssr: false }
)

export default function Home() {
  return (
    <DeploymentModelWithNoSSR />
  );
}
