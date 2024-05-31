import Image from 'next/image'
import React from 'react'

function Designposter() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-primary">JobSeeking - QuocAnk</h2>
        <p className="text-xs font-medium w-[22rem] text-opacity-70 text-black">
          JobSeeking - A pioneering human resource ecosystem applying technology
          in Vietnam
        </p>
      </div>
      <Image
        src="/draw2.webp"
        alt="Image login"
        width={550}
        height={500}
      ></Image>
    </div>
  );
}

export default Designposter