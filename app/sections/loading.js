export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
            <div className="relative w-screen h-screen bg-zinc-900 flex">
                <div className="h-2"></div>
                <div className="animate-pulse w-[120px] h-[170px] bg-zinc-800 m-4 rounded-md"></div>
                {/* <div className="animate-pulse w-[120px] h-[170px] bg-zinc-800 m-4 ml-2 rounded-xl"></div> */}
            </div>
    )
  }