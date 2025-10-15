"use client"

import { useState } from "react"
import MyMessagesHeader from "./my-messages-header"
import ChatConversations from "./chat-conversations"
import ChatConversationDetail from "./chat-conversation-details"

export default function MyMessagesLayout() {
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)

    return (
        <section className="space-y-12">
            <MyMessagesHeader />

            <div className="border rounded-lg overflow-hidden bg-card">
                <div className="flex h-[600px]">
                    <div className={`${selectedConversationId ? "hidden md:flex" : "flex"} w-full md:w-80 border-r flex-col`}>
                        <ChatConversations
                            onSelectConversation={setSelectedConversationId}
                            selectedConversationId={selectedConversationId}
                        />
                    </div>

                    <div className={`${selectedConversationId ? "flex" : "hidden md:flex"} flex-1 flex-col`}>
                        <ChatConversationDetail
                            conversationId={selectedConversationId}
                            onBack={() => setSelectedConversationId(null)}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
