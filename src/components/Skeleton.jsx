const Skeleton = ({ className = '', width, height }) => (
  <div 
    className={`loading-pulse bg-background rounded-xl ${className}`}
    style={{ width, height }}
  />
);

export const MentorCardSkeleton = () => (
  <div className="bg-card-bg rounded-2xl shadow-soft p-6 border border-border animate-fade-in">
    <div className="flex items-start space-x-5 mb-6">
      <Skeleton className="w-20 h-20 rounded-2xl" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-28" />
      </div>
      <Skeleton className="h-8 w-16 rounded-xl" />
    </div>
    <Skeleton className="h-20 w-full mb-4 rounded-xl" />
    <div className="flex space-x-4 mb-5">
      <Skeleton className="h-5 w-20" />
      <Skeleton className="h-5 w-24" />
    </div>
    <div className="flex flex-wrap gap-2 mb-6">
      <Skeleton className="h-7 w-16 rounded-xl" />
      <Skeleton className="h-7 w-20 rounded-xl" />
      <Skeleton className="h-7 w-18 rounded-xl" />
    </div>
    <Skeleton className="h-12 w-full rounded-xl" />
  </div>
);

export const OpportunityCardSkeleton = () => (
  <div className="bg-card-bg rounded-2xl shadow-soft overflow-hidden border border-border animate-fade-in">
    <Skeleton className="w-full h-48" />
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-7 w-20 rounded-xl" />
      </div>
      <Skeleton className="h-20 w-full rounded-xl" />
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-7 w-16 rounded-xl" />
        <Skeleton className="h-7 w-20 rounded-xl" />
        <Skeleton className="h-7 w-18 rounded-xl" />
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-border">
        <div className="space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-9 w-24 rounded-xl" />
      </div>
    </div>
  </div>
);

export const SessionCardSkeleton = () => (
  <div className="bg-card-bg rounded-2xl shadow-soft p-6 border border-border animate-fade-in">
    <div className="flex justify-between items-start">
      <div className="flex-1 space-y-4">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-4 w-40" />
        <div className="flex space-x-8">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-7 w-20 rounded-xl" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>
    </div>
  </div>
);

export default Skeleton;