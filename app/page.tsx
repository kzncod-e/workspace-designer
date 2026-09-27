import { Suspense } from "react";
import { WorkspaceBuilder } from "@/components/workspace/workspace-builder";

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading workspace...</div>}>
      <WorkspaceBuilder />
    </Suspense>
  );
}
