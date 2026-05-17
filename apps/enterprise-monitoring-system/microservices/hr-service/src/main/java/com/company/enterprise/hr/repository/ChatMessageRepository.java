package com.company.enterprise.hr.repository;

import com.company.enterprise.hr.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {
    List<ChatMessage> findByReceiverId(String receiverId);
    List<ChatMessage> findByGroupId(String groupId);
    List<ChatMessage> findBySenderIdAndReceiverIdOrSenderIdAndReceiverIdOrderByTimestampAsc(
            String senderId1, String receiverId1, String senderId2, String receiverId2);
}
