import Image from "next/image";


export default function Header() {
  return (
    <header className="border-b bg-white/70 backdrop-blur">
      <div className="mx-auto flex flex-row max-w-3xl items-center justify-center gap-3 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl">
          <Image
            src="/recipe-logo.jpg"
            alt="Recipe Generator Logo"
            width={28}
            height={28}
            priority
            className="rounded-2xl"
          />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Recipe Generator</h1>
          <p className="text-xs text-neutral-500 text-center">
            Turn ingredients into a recipe
          </p>
        </div>

      </div>

    </header>
  )
}