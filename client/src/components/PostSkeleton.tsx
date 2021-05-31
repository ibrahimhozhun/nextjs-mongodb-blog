const PostSkeleton: React.FC = () => {
  const gridCellClass = "rounded-sm h-8 bg-gray-200";

  return (
    <>
      <div className="animate-pulse">
        <div className="bg-yellow-300 shadow-md rounded-md w-full lg:w-1/2 h-12"></div>
        <div className="grid grid-cols-6 gap-1 w-full p-4 mt-4 bg-gray-50 rounded-md shadow">
          <div className={`${gridCellClass} col-span-5`}></div>
          <div className={`${gridCellClass}`}></div>
          <div className={`${gridCellClass} col-span-2`}></div>
          <div className={`${gridCellClass} col-span-4`}></div>
          <div className={`${gridCellClass}`}></div>
          <div className={`${gridCellClass} col-span-3`}></div>
          <div className={`${gridCellClass} col-span-2`}></div>
          <div className={`${gridCellClass} col-span-2`}></div>
          <div className={`${gridCellClass}`}></div>
          <div className={`${gridCellClass} col-span-3`}></div>
          <div className={`${gridCellClass} col-span-3`}></div>
          <div className={`${gridCellClass} col-span-3`}></div>
          <div className={`${gridCellClass}`}></div>
          <div className={`${gridCellClass} col-span-4`}></div>
          <div className={`${gridCellClass}`}></div>
          <div className={`${gridCellClass} col-span-4`}></div>
          <div className={`${gridCellClass} col-span-2`}></div>
          <div className={`${gridCellClass} col-span-2`}></div>
          <div className={`${gridCellClass} col-span-4`}></div>
          <div className={`${gridCellClass}`}></div>
          <div className={`${gridCellClass} col-span-3`}></div>
          <div className={`${gridCellClass} col-span-2`}></div>
          <div className={`${gridCellClass} col-span-2`}></div>
          <div className={`${gridCellClass}`}></div>
          <div className={`${gridCellClass} col-span-3`}></div>
          <div className={`${gridCellClass} col-span-3`}></div>
          <div className={`${gridCellClass} col-span-3`}></div>
          <div className={`${gridCellClass}`}></div>
          <div className={`${gridCellClass} col-span-4`}></div>
          <div className={`${gridCellClass}`}></div>
        </div>
      </div>
    </>
  )
}

export default PostSkeleton;
