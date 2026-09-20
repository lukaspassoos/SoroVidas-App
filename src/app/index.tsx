import { useRouter } from 'expo-router';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const callSamu = () => {
    Linking.openURL('tel:192');
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <View style={styles.container}>
        
        {/* Cabeçalho / Logo */}
        <View style={styles.header}>
          <View style={styles.iconBadge}>
            <Text style={styles.iconText}>🐍</Text>
          </View>
          <Text style={styles.title}>SoroVidas</Text>
          <Text style={styles.subtitle}>
            Localizador de Antídotos & Soros Antiofídicos
          </Text>
          <View style={styles.tagRegiao}>
            <Text style={styles.tagText}>RMC - Campinas e Região</Text>
          </View>
        </View>

        {/* Card do MVP */}
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>Atendimento de Urgência</Text>
          <Text style={styles.cardDescription}>
            Encontre o posto ou hospital com estoque de soro mais próximo de você, mesmo offline.
          </Text>
        </View>

        {/* Ações Principais */}
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.btnPrimary} 
            activeOpacity={0.8}
            onPress={() => alert('Em breve: Redirecionando para o Mapa de Emergência')}
          >
            <Text style={styles.btnPrimaryText}>🚨 Buscar Hospital Próximo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnSecondary} 
            activeOpacity={0.8}
            onPress={() => router.push('/explore')}
          >
            <Text style={styles.btnSecondaryText}>📖 Guia de Primeiros Socorros</Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé de Emergência */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.btnSamu}
            onPress={callSamu}
          >
            <Text style={styles.samuText}>Ligar SAMU: 192</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a', // Azul escuro / de segurança
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  iconBadge: {
    width: 80,
    height: 80,
    backgroundColor: '#1e293b',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#0284c7',
  },
  iconText: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 6,
  },
  tagRegiao: {
    backgroundColor: '#0369a1',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  tagText: {
    color: '#e0f2fe',
    fontSize: 12,
    fontWeight: '600',
  },
  cardInfo: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#0284c7',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardDescription: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
  actionContainer: {
    gap: 12,
  },
  btnPrimary: {
    backgroundColor: '#dc2626', // Vermelho de emergência
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  btnPrimaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnSecondary: {
    backgroundColor: '#334155',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnSecondaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  btnSamu: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  samuText: {
    color: '#ef4444',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});