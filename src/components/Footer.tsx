'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ThemeSwitcher from './ThemeSwitcher'

const Footer = () => {
  const [position, setPosition] = useState('v3')

  return (
    <div className="w-full py-6 relative flex items-center justify-center px-[5%]">
      <p className="text-sm text-slate-700 dark:text-slate-300 font-medium tracking-tight">
        &copy; {new Date().getFullYear()} Dennis Kibet
      </p>
      <div className="absolute right-[5%] flex items-center justify-start gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="text-nowrap inline-flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 border border-slate-300 dark:border-slate-700 border-opacity-50 rounded-lg text-xs font-semibold tracking-wide px-3 py-2 uppercase cursor-pointer transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-600 hover:border-opacity-100 active:scale-95"
              variant="outline"
            >
              versions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-40 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-md overflow-hidden"
            align="end"
          >
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <a
                href="https://v1.denniskibet.com"
                target="_blank"
                rel="noreferrer"
              >
                <DropdownMenuRadioItem
                  value="v1"
                  className="text-sm px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors duration-150 cursor-pointer text-slate-700 dark:text-slate-300"
                >
                  v1
                </DropdownMenuRadioItem>
              </a>
              <a
                href="https://v2.denniskibet.com"
                target="_blank"
                rel="noreferrer"
              >
                <DropdownMenuRadioItem
                  value="v2"
                  className="text-sm px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors duration-150 cursor-pointer text-slate-700 dark:text-slate-300"
                >
                  v2
                </DropdownMenuRadioItem>
              </a>
              <DropdownMenuRadioItem
                value="v3"
                className="text-sm px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors duration-150 cursor-pointer font-medium text-blue-600 dark:text-blue-400"
              >
                <span className="ml-3">v3 — current</span>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeSwitcher />
      </div>
    </div>
  )
}

export default Footer
