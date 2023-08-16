import Image from "next/image";

function Loading() {
  return (
    <div>
      <Image
      src='/assets/icons/loader.svg'
      alt="loader_icon"
      width={60}
      height={60}
      />
    </div>
  )
}

export default Loading