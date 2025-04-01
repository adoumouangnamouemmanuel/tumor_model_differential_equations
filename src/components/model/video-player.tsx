"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, RotateCcw, Download, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface VideoPlayerProps {
    src: string
    title: string
    description?: string
}

export function VideoPlayer({ src, title, description }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [error, setError] = useState(false)
    const [showControls, setShowControls] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play().catch((err) => {
                    console.error("Error playing video:", err)
                    setError(true)
                })
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleReset = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.pause()
            setIsPlaying(false)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted
            setIsMuted(!isMuted)
        }
    }

    const handleError = () => {
        setError(true)
    }

    return (
        <div className="bg-[hsl(var(--card))] p-6 rounded-xl shadow-lg border border-[hsl(var(--border))]">
            <h3 className="text-lg font-bold mb-4">{title}</h3>

            {error ? (
                <Alert variant="destructive">
                    <AlertTitle>Video Error</AlertTitle>
                    <AlertDescription>
                        There was an error playing this video. The format may not be supported by your browser.
                    </AlertDescription>
                    <div className="mt-4 flex justify-center">
                        <Button asChild variant="outline">
                            <a href={src} download>
                                <Download className="mr-2 h-4 w-4" />
                                Download Video
                            </a>
                        </Button>
                    </div>
                </Alert>
            ) : (
                <motion.div
                    className="relative rounded-md overflow-hidden mx-auto max-w-[85%]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    ref={containerRef}
                    onMouseEnter={() => setShowControls(true)}
                    onMouseLeave={() => setShowControls(false)}
                >
                    {/* YouTube-like play button overlay */}
                    {!isPlaying && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
                            onClick={handlePlayPause}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="w-16 h-16 rounded-full bg-black bg-opacity-70 flex items-center justify-center">
                                <Play className="h-8 w-8 text-white ml-1" />
                            </div>
                        </motion.div>
                    )}

                    <video
                        ref={videoRef}
                        className="w-full rounded-md aspect-video bg-black"
                        onClick={handlePlayPause}
                        onEnded={() => setIsPlaying(false)}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onError={handleError}
                        playsInline
                        preload="metadata"
                    >
                        <source src={src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Custom controls that appear on hover */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex items-center justify-between"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: showControls || isPlaying ? 1 : 0,
                            y: showControls || isPlaying ? 0 : 10,
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handlePlayPause}
                                className="text-white hover:bg-white hover:bg-opacity-20"
                            >
                                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleMute}
                                className="text-white hover:bg-white hover:bg-opacity-20"
                            >
                                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                            </Button>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleReset}
                            className="text-white hover:bg-white hover:bg-opacity-20"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    </motion.div>
                </motion.div>
            )}

            {description && <p className="text-sm text-[hsl(var(--muted-foreground))] mt-4">{description}</p>}
        </div>
    )
}