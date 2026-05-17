package com.company.enterprise.hr.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String senderId;

    private String senderName;
    private String receiverId; // Null if group chat
    private String groupId;    // Null if 1:1 chat

    @Column(length = 2000, nullable = false)
    private String content;

    private LocalDateTime timestamp;
    private Boolean isRead;
    private String attachedLocation; // lat,lng if location shared
    private String attachedMediaUrl;
}
