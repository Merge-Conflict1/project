import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
// import {
//   selectIsConnectedToRoom,
//   useHMSActions,
//   useHMSStore,
//   HMSRoomProvider,
// } from "@100mslive/react-sdk";

// Mocking 100ms for now if SDK setup is complex without tokens, 
// but structure is ready for integration.
// To fully enable: uncomment imports and useHMSActions/useHMSStore.

const VideoRoomContent = ({ roomId }: { roomId: string }) => {
    const navigate = useNavigate();
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [showWhiteboard, setShowWhiteboard] = useState(false);

    // const isConnected = useHMSStore(selectIsConnectedToRoom);
    // const hmsActions = useHMSActions();

    const handleLeave = async () => {
        // await hmsActions.leave();
        navigate("/");
    };

    const toggleVideo = () => {
        setIsVideoOn(!isVideoOn);
        // hmsActions.setLocalVideoEnabled(!isVideoOn);
    };

    const toggleAudio = () => {
        setIsAudioOn(!isAudioOn);
        // hmsActions.setLocalAudioEnabled(!isAudioOn);
    };

    return (
        <div className="h-screen w-full flex flex-col bg-slate-900 text-white">
            {/* Header */}
            <div className="h-16 border-b border-slate-700 flex items-center justify-between px-6">
                <h2 className="font-bold text-lg">Classroom: {roomId}</h2>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setShowWhiteboard(!showWhiteboard)}>
                        {showWhiteboard ? "Hide Whiteboard" : "Show Whiteboard"}
                    </Button>
                    <Button variant="destructive" onClick={handleLeave}>
                        Leave Room
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Video Grid (Left/Top) */}
                <div className={`flex-1 p-4 grid gap-4 ${showWhiteboard ? 'w-1/3' : 'w-full'} transition-all`}>
                    <div className="bg-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden">
                        <div className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded">
                            You {!isAudioOn && "(Muted)"}
                        </div>
                        {isVideoOn ? (
                            <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                                [Camera Feed Placeholder]
                            </div>
                        ) : (
                            <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold">
                                ME
                            </div>
                        )}
                    </div>
                    <div className="bg-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden">
                        <div className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded">
                            Tutor
                        </div>
                        <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                            [Remote Peer Feed]
                        </div>
                    </div>
                </div>

                {/* Whiteboard (Right/Bottom) */}
                {showWhiteboard && (
                    <div className="flex-[2] border-l border-slate-700 bg-white relative">
                        <div style={{ position: 'absolute', inset: 0 }}>
                            <Tldraw persistenceKey="tldraw-example" />
                        </div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="h-20 border-t border-slate-700 flex items-center justify-center gap-4">
                <Button
                    variant={isAudioOn ? "secondary" : "destructive"}
                    onClick={toggleAudio}
                    className="rounded-full w-12 h-12 p-0"
                >
                    {isAudioOn ? "Mic" : "Muted"}
                </Button>
                <Button
                    variant={isVideoOn ? "secondary" : "destructive"}
                    onClick={toggleVideo}
                    className="rounded-full w-12 h-12 p-0"
                >
                    {isVideoOn ? "Cam" : "Off"}
                </Button>
            </div>
        </div>
    );
};

const VideoRoom = () => {
    const { roomId } = useParams();

    // In a real app, you would fetch a token from your backend here
    // const token = await fetch("/api/get-token", ...).json();

    return (
        // <HMSRoomProvider>
        <VideoRoomContent roomId={roomId || "demo"} />
        // </HMSRoomProvider>
    );
};

export default VideoRoom;
