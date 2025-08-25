import { StreamTheme, useCall } from "@stream-io/video-react-sdk"
import { useState } from "react"
import { CallLobby } from "./call-lobby"
import { CallActive } from "./call-active"
import { CallEnded } from "./call-ended"

interface Props {
    meetingName: string
}

const CallUi = ({ meetingName }: Props) => {
    const call = useCall()
    const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby")

    const handleJoin = async () => {
        if (!call) {
            console.error("Call object is null/undefined");
            return;
        }
        
        console.log("Attempting to join call:", call);
        console.log("Call state:", call.state);
        
        try {
            await call.join();
            console.log("Successfully joined call");
            setShow("call")
        } catch (error) {
            console.error("Failed to join call:", error);
            // Check specific error details
            if (error instanceof Error) {
                console.error("Error message:", error.message);
                console.error("Error stack:", error.stack);
            }
        }
    }

    const handleLeave = async () => {
        if (!call) return;
        
        try {
            // Use leave() instead of endCall()
            await call.leave();
            setShow("ended")
        } catch (error) {
            console.error("Failed to leave call:", error);
            // Still show ended state even if leave fails
            setShow("ended")
        }
    }

    return (
        <StreamTheme className="h-full">
            {show === "lobby" && <CallLobby onJoin={handleJoin} />}
            {show === "call" && <CallActive onLeave={handleLeave} meetingName={meetingName} />}
            {show === "ended" && <CallEnded/>}
        </StreamTheme>
    )
}

export default CallUi