'use client'
import React, { useState } from 'react'
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
    <div className="w-full py-4 flex items-center justify-between px-[5%]">
      <div></div>
      <p className="text-center text-black dark:text-white">
        &copy; copyright {new Date().getFullYear()}
      </p>
      <div className="flex items-center justify-start gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">versions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <a
                href="https://v1.denniskibet.com"
                target="_blank"
                rel="norefferer"
              >
                <DropdownMenuRadioItem value="v1">v1</DropdownMenuRadioItem>
              </a>
              <a
                href="https://v2.denniskibet.com"
                target="_blank"
                rel="norefferer"
              >
                <DropdownMenuRadioItem value="v2">v2</DropdownMenuRadioItem>
              </a>
              <DropdownMenuRadioItem value="v3">
                v3 - current
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
