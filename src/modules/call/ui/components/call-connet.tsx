import { Call, CallingState, StreamCall, StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk"
import { LoaderIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useTRPC } from "@/trpc/client"
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useMutation } from "@tanstack/react-query"
import CallUi from "./call-ui"

interface Props {
    meetingId: string
    meetingName: string
    userId: string
    userName: string
    userImage: string
}

export const CallConnect = ({ meetingId, meetingName, userId, userName, userImage }: Props) => {
    
    const trpc = useTRPC()
    
    const { mutateAsync: generateToken } = useMutation(
        trpc.meetings.generateToken.mutationOptions()
    )
    
    const [client, setClient] = useState<StreamVideoClient | null>(null)
    
    useEffect(() => {
        // Debug: Check if API key is loading properly
        console.log("API Key:", process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY);
        
        if (!process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY) {
            console.error("Stream API Key not found!");
            return;
        }

        const _client = new StreamVideoClient({
            apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
            user: {
                id: userId,
                name: userName,
                image: userImage
            },
            tokenProvider: generateToken,
        })
        
        setClient(_client)
        
        return () => {
            _client.disconnectUser().catch((error) => {
                console.log("Disconnect error:", error);
            });
            setClient(null)
        }
    }, [userId, userName, userImage, generateToken])
    
    const [call, setCall] = useState<Call | null>(null)
    
    useEffect(() => {
        if (!client) return
        
        const _call = client.call("default", meetingId)
        _call.camera.disable()
        _call.microphone.disable()
        
        // Get or create the call
        _call.getOrCreate().then(() => {
            console.log("✅ Call retrieved/created successfully");
            setCall(_call)
        }).catch((error) => {
            console.error("❌ Failed to get/create call:", error);
            // If get fails, try to create manually
            _call.create({
                data: {
                    custom: {
                        meetingId: meetingId,
                        meetingName: meetingName
                    }
                }
            }).then(() => {
                console.log("✅ Call created manually");
                setCall(_call)
            }).catch((createError) => {
                console.error("❌ Manual create also failed:", createError);
            })
        })
        
        return () => {
            if (_call && _call.state.callingState !== CallingState.LEFT) {
                _call.leave().catch((error) => {
                    console.log("Leave call error:", error);
                });
            }
            setCall(null)
        }
    }, [client, meetingId, userId, meetingName])
    
    if (!client || !call) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-radial from-sidebar-accent to-sidebar">
                <LoaderIcon className="animate-spin h-6 w-6 text-white" />
            </div>
        );
    }
    
    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <CallUi meetingName={meetingName} />
            </StreamCall>
        </StreamVideo>
    )
}