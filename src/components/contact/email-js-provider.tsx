"use client"

import type React from "react"

import { useEffect } from "react"
import emailjs from "@emailjs/browser"

interface EmailJSProviderProps {
    children: React.ReactNode
    publicKey: string
}

export function EmailJSProvider({ children, publicKey }: EmailJSProviderProps) {
    useEffect(() => {
        // Initialize EmailJS with your public key
        emailjs.init(publicKey)
    }, [publicKey])

    return <>{children}</>
}

// Update the sendEmail function with better error handling
export async function sendEmail(formData: {
    name: string
    email: string
    subject: string
    message: string
}) {
    try {
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_3y81tlr"
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_r174g7k"
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "g5-_hb5q_TnaUc14K"

        if (!serviceId) throw new Error("EmailJS Service ID is missing")
        if (!templateId) throw new Error("EmailJS Template ID is missing")
        if (!publicKey) throw new Error("EmailJS Public Key is missing")

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
        }

        // 👇 Here we add the publicKey as the fourth argument
        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`EmailJS returned status code ${response.status}`)
        }

        return { success: true, response }
    } catch (error) {
        // 👇 Better error handling here
        let errorMessage = "Unknown error occurred"
        try {
            errorMessage = error && typeof error === "object" ? JSON.stringify(error) : String(error)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (serializationError) {
            errorMessage = String(error)
        }
        console.error("Error sending email:", errorMessage)

        return {
            success: false,
            error: errorMessage,
        }
    }
}