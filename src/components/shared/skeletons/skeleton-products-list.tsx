import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonProductsList = () => (
  <>
    {Array.from({ length: 3 }).map((_, index) => (
      <li key={index}>
        <Skeleton className="h-[462px] w-[348px] rounded-xl" />
      </li>
    ))}
  </>
);
