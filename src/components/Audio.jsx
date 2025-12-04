import { Volume2 } from 'lucide-react'
import React from 'react'

const Audio = ({ audioUrl }) => {
  return (
    <button 
    onClick={() => audioUrl && new window.Audio(audioUrl).play()}
    className="dark:bg-white/10 bg-black/10 border-black/10 rounded-full p-4 ml-3 border dark:border-white/10 cursor-pointer">
        <Volume2 className="size-6 sm:size-8 md:size-9 text-blue-500" />
    </button>
  )
}

export default Audio;