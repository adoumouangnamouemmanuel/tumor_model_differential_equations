"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, Download, Share2, ThumbsUp } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"

export default function PromoVideoPage() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [progress, setProgress] = useState(0)
    const [isClient, setIsClient] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [videoHeight, setVideoHeight] = useState(42) // Lower default height (16:9 would be 56.25)

    useEffect(() => {
        setIsClient(true)

        // Get reference to video element
        const videoElement = document.querySelector("video")

        if (videoElement) {
            // Handle play/pause
            if (isPlaying) {
                videoElement.play().catch((error) => {
                    console.error("Video play failed:", error)
                    setIsPlaying(false)
                })
            } else {
                videoElement.pause()
            }

            // Handle mute/unmute
            videoElement.muted = isMuted

            // Track progress
            const updateProgress = () => {
                if (videoElement.duration) {
                    setProgress((videoElement.currentTime / videoElement.duration) * 100)
                }
            }

            videoElement.addEventListener("timeupdate", updateProgress)
            videoElement.addEventListener("ended", () => setIsPlaying(false))

            videoElement.addEventListener("loadedmetadata", () => {
                setDuration(videoElement.duration)
            })

            const updateCurrentTime = () => {
                setCurrentTime(videoElement.currentTime)
            }
            videoElement.addEventListener("timeupdate", updateCurrentTime)

            return () => {
                videoElement.removeEventListener("timeupdate", updateProgress)
                videoElement.removeEventListener("ended", () => setIsPlaying(false))
                videoElement.removeEventListener("timeupdate", updateCurrentTime)
            }
        }
    }, [isPlaying, isMuted])

    const togglePlay = () => setIsPlaying(!isPlaying)
    const toggleMute = () => setIsMuted(!isMuted)

    const handleResize = (e : unknown) => {
        // @ts-expect-error: type error
        e.preventDefault()
        // @ts-expect-error: ignoring something
        const container = e.target.closest(".video-container")
        // @ts-expect-error: type error
        const startY = e.clientY
        const startHeight = container.getBoundingClientRect().height
        const parentWidth = container.parentElement.getBoundingClientRect().width

        const onMouseMove = (moveEvent: { preventDefault: () => void; clientY: number }) => {
            moveEvent.preventDefault()
            const deltaY = moveEvent.clientY - startY
            const newHeight = startHeight + deltaY
            const aspectRatio = (newHeight / parentWidth) * 100

            // Limit min/max height (YouTube-like constraints)
            if (aspectRatio >= 30 && aspectRatio <= 75) {
                setVideoHeight(aspectRatio)
            }
        }

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseup", onMouseUp)
        }

        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)
    }

    return (
        <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 xl:px-10">
            {/* Hero Section */}
            <motion.div
                className="mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 font-serif">
                    Project Showcase
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-6"></div>
            </motion.div>

            {/* Video Player */}
            <motion.div
                className="mb-12 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Card className="border-none shadow-xl overflow-hidden">
                    <CardContent className="p-0">
                        <div className="relative w-full">
                            {/* Video Container */}
                            <div
                                className={`video-container w-full bg-gray-900 relative overflow-hidden`}
                                style={{ paddingBottom: `${videoHeight}%` }}
                            >
                                {/* Actual Video */}
                                <video
                                    src="/videos/promo_demo.mp4"
                                    className="absolute inset-0 w-full h-full object-contain"
                                    autoPlay={isPlaying}
                                    muted={isMuted}
                                    playsInline
                                    ref={(videoRef) => {
                                        if (videoRef && isPlaying) {
                                            videoRef.play()
                                        }
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {!isPlaying && (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
                                                onClick={togglePlay}
                                            >
                                                <Play className="h-10 w-10 text-white" fill="white" />
                                            </Button>
                                        </motion.div>
                                    )}

                                    {/* Video Thumbnail */}
                                    {!isPlaying && (
                                        <Image
                                            src="/images/video_image.jpeg"
                                            alt="Video thumbnail"
                                            width={1280}
                                            height={720}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    )}

                                    {/* Video Title Overlay */}
                                    {!isPlaying && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                            <h2 className="text-white text-2xl font-bold">
                                                NTIUNHDM: Mathematical Modeling of Cancer Dynamics
                                            </h2>
                                            <p className="text-white/80 text-sm">
                                                Explore how our research combines differential equations with biological systems
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Video Controls */}
                                <div
                                    className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent ${isPlaying ? "opacity-0 hover:opacity-100 transition-opacity" : "opacity-100"}`}
                                >
                                    <div className="flex flex-col gap-2">
                                        {/* Progress Bar */}
                                        {isClient && (
                                            <div className="w-full">
                                                <Slider
                                                    value={[progress]}
                                                    max={100}
                                                    step={0.1}
                                                    className="cursor-pointer"
                                                    onValueChange={(value) => {
                                                        setProgress(value[0])
                                                        const videoElement = document.querySelector("video")
                                                        if (videoElement && videoElement.duration) {
                                                            videoElement.currentTime = (value[0] / 100) * videoElement.duration
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {/* Control Buttons */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 rounded-full hover:bg-white/20"
                                                    onClick={togglePlay}
                                                >
                                                    {isPlaying ? (
                                                        <Pause className="h-4 w-4 text-white" />
                                                    ) : (
                                                        <Play className="h-4 w-4 text-white" />
                                                    )}
                                                </Button>

                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 rounded-full hover:bg-white/20"
                                                    onClick={toggleMute}
                                                >
                                                    {isMuted ? (
                                                        <VolumeX className="h-4 w-4 text-white" />
                                                    ) : (
                                                        <Volume2 className="h-4 w-4 text-white" />
                                                    )}
                                                </Button>

                                                <span className="text-white text-xs">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-white/20">
                                                    <ThumbsUp className="h-4 w-4 text-white" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-white/20">
                                                    <Share2 className="h-4 w-4 text-white" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-white/20">
                                                    <Download className="h-4 w-4 text-white" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* YouTube-style resize handle */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-4 bg-transparent cursor-ns-resize z-50 flex items-center justify-center"
                                    onMouseDown={handleResize}
                                >
                                    <div className="w-10 h-1 bg-white/30 rounded-full hover:bg-white/50 transition-colors"></div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Video Description */}
            <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-none shadow-lg">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-3 font-serif">Project Overview</h3>
                            <p className="font-light">
                                Our video showcases the mathematical modeling of cancer dynamics using differential equations and
                                computational methods.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-3 font-serif">Key Findings</h3>
                            <p className="font-light">
                                Discover how our model predicts tumor growth patterns and immune system responses under various
                                conditions.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-3 font-serif">Future Applications</h3>
                            <p className="font-light">
                                Learn how our research could inform personalized treatment strategies and preventative measures.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    )
}

// Helper function to format time
function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" + secs : secs}`
}