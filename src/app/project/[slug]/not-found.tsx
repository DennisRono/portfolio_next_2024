import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function ProjectNotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <div className="space-y-6 max-w-md">
          <FileQuestion className="h-24 w-24 mx-auto text-muted-foreground" />

          <h1 className="text-4xl font-bold tracking-tight">Project Not Found</h1>

          <p className="text-muted-foreground text-lg">
            The project you&#39;re looking for doesn&#39;t exist or may have been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button asChild>
              <Link href="/projects">Browse All Projects</Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

