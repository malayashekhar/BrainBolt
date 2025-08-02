"use client";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BarChartBig, Upload } from "lucide-react"
import Link from "next/link"

export function NavMenu() {
  const router = useRouter()

  const onNewClick = () => {
    router.push(`/quiz/new`)
  }
  return (
    <DropdownMenuContent className="w-56" align="start">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuGroup>
        <DropdownMenuItem>
            <Link href="/dashboard" className="flex flex-row">
                <BarChartBig className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
            </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <a onClick={onNewClick} className="flex flex-row">
                <Upload className="mr-2 h-4 w-4" />
                <span>New Quiz</span>
            </a>
        </DropdownMenuItem>
    </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}
