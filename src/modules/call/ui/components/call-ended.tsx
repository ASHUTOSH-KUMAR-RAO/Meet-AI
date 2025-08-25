import { LogInIcon } from "lucide-react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import "@stream-io/video-react-sdk/dist/css/styles.css";



export const CallEnded = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-radial from-sidebar-accent to-sidebar">
            <div className="py-4 px-8 flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10
                         shadow-lg">
                    <div className="flex flex-col gap-y-2 text-center">
                        <h6 className="text-lg font-medium">You Have Ended the Call</h6>
                        <p className="text-sm">Summary Will Appear in Few Minutes</p>
                    </div>
                        <Button asChild>
                            <Link href="/meetings">
                                Back to Meetings
                            </Link>
                        </Button>
                </div>
            </div>
        </div>
    )
}