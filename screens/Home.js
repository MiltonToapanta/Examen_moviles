import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          <View>
            <Text style={styles.greeting}>Viernes, 4 Enero</Text>
            <Text style={styles.userName}>Hola, User</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}><Text style={styles.icon}>🔔</Text></TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}><Text style={styles.icon}>🔍</Text></TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recordatorio</Text>
            <TouchableOpacity><Text style={styles.linkSmall}>Limpiar</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.reminderCard}>
            <View style={styles.reminderIcon}><Text style={styles.reminderEmoji}>🏃</Text></View>
            <View style={styles.reminderContent}>
              <Text style={styles.reminderText}>Correr 30 min.</Text>
              <Text style={styles.reminderTime}>14:30 PM</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Que estas buscando?</Text>
          <View style={styles.cardsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Text style={styles.cardIcon}>📋</Text>
              <Text style={styles.cardTitle}>Check{'\n'}General</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Text style={styles.cardIcon}>💬</Text>
              <Text style={styles.cardTitle}>Chat con{'\n'}Coach</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Text style={styles.cardIcon}>🎯</Text>
              <Text style={styles.cardTitle}>Nuevos{'\n'}Retos</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Amigos AI7</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navButton, styles.navButtonActive]}>
          <View style={styles.navContent}>
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={[styles.navLabel, styles.navLabelActive]}>Inicio</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}><Text style={styles.navIcon}>📅</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navButton}><Text style={styles.navIcon}>💪</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home2')}>
          <Text style={styles.navIcon}>👥</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20 },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#00B894', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  greeting: { fontSize: 12, color: '#636e72', marginBottom: 4 },
  userName: { fontSize: 20, fontWeight: '600', color: '#2d3436' },
  headerActions: { flexDirection: 'row', gap: 10 },
  iconButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#00B894', justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 20 },
  content: { flex: 1, paddingHorizontal: 20 },
  section: { marginBottom: 30 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#2d3436', marginBottom: 15 },
  linkSmall: { color: '#00B894', fontSize: 14, fontWeight: '500' },
  reminderCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 15, padding: 15, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  reminderIcon: { width: 45, height: 45, backgroundColor: '#e8f8f5', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  reminderEmoji: { fontSize: 24 },
  reminderContent: { flex: 1 },
  reminderText: { fontSize: 15, fontWeight: '500', color: '#2d3436', marginBottom: 4 },
  reminderTime: { fontSize: 13, color: '#00B894', fontWeight: '500' },
  cardsGrid: { flexDirection: 'row', gap: 12 },
  actionCard: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 15, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  cardIcon: { fontSize: 36, marginBottom: 10 },
  cardTitle: { fontSize: 13, fontWeight: '500', color: '#2d3436', textAlign: 'center', lineHeight: 18 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10, paddingBottom: 25, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e0e0e0', shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 10 },
  navButton: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 12 },
  navButtonActive: { backgroundColor: '#00B894' },
  navContent: { alignItems: 'center' },
  navIcon: { fontSize: 24 },
  navLabel: { fontSize: 11, color: '#636e72', fontWeight: '500', marginTop: 4 },
  navLabelActive: { color: '#fff' },
});
