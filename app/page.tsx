'use client'

import { useState } from 'react'
import Image from 'next/image'
import stacklineLogo from '../public/stackline_logo.svg'

export default function Home() {

  return (
    <>
      <div>
        <div className="hidden sm:fixed sm:inset-y-0 sm:z-50 sm:flex sm:w-72 sm:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
              <Image src={stacklineLogo} alt="Stackline Logo" height={100} width={100} className="bg-blue-400 p-2 rounded-md" />
            </div>
            <div>
              {/* Your sidebar content */}
            </div>
          </div>
        </div>

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">{/* Your content */}</div>
        </main>
      </div>
    </>
  )
}
