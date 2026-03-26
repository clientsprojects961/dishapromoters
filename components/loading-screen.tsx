import Image from 'next/image'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-32 h-32 animate-pulse">
          <Image
            src="/logo.png"
            alt="Disha Promoters & Realtors"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <p className="text-primary font-semibold text-sm">Loading...</p>
      </div>
    </div>
  )
}
