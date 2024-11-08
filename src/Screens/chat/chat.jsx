import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para ícones

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Olá, como posso te ajudar com as informações do projeto?', sender: 'bot' },
    { id: '2', text: 'Gostaria de saber mais sobre os detalhes do orçamento.', sender: 'user' },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: String(messages.length + 1), text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
        <View style={styles.messageHeader}>
          {item.sender === 'bot' && (
            <>
              <Ionicons name="business" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.companyName}>Minha Empresa</Text>
            </>
          )}
        </View>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Digite uma mensagem..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  header: {
    marginTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesList: {
    paddingBottom: 80,
    paddingTop: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 12,
    borderRadius: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Somente para Android
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0097B2',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#8c8c8c',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22, // Aumenta a legibilidade
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  companyName: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#0097B2',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
