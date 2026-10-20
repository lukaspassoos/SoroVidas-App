import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Linking, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  // Estado para controlar a visibilidade do modal de aviso (começa como true para abrir logo)
  const [modalVisible, setModalVisible] = useState(true);

  const callSamu = () => {
    Linking.openURL('tel:192');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      {/* --- MODAL DE AVISO IMPORTANTE --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Permite fechar no Android com o botão de voltar
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🚨 AVISO IMPORTANTE</Text>

            <View style={styles.modalAlertBox}>
              <Text style={styles.modalAlertText}>
                Este aplicativo é não-oficial e não substitui o serviço de emergência. A responsabilidade pelo trajeto e pela verificação do estoque de soro é inteiramente do usuário.
              </Text>
            </View>

            <Text style={styles.modalText}>
              O <Text style={{fontWeight: 'bold', color: '#ffffff'}}>SoroVidas</Text> é um guia focado apenas em informar com base nos dados disponibilizados pelo Ministério da Saúde (Estado de São Paulo), que podem conter atrasos.
            </Text>

            <Text style={styles.modalText}>
              A <Text style={{fontWeight: 'bold', color: '#ffffff'}}>maioria</Text> dos casos de acidentes não precisam de soro. Apenas 0,1% são fatais.
            </Text>

            <Text style={styles.modalText}>
              Em caso de emergência, ligue SEMPRE para o 192 (SAMU).
            </Text>

            <TouchableOpacity 
              style={styles.btnModalAcessar} 
              onPress={() => setModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.btnModalAcessarText}>Estou Ciente e Quero Acessar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* --- FIM DO MODAL --- */}

      <View style={styles.container}>
        
        {/* Cabeçalho / Logo */}
        <View style={styles.header}>
          <Image 
            source={require('../../../assets/images/logo.jpeg')} // Ajuste o caminho se a sua pasta de assets for noutro local
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>SoroVidas</Text>
          <Text style={styles.subtitle}>
            Localizador de Antídotos & Soros Antiofídicos
          </Text>
          <View style={styles.tagRegiao}>
            <Text style={styles.tagText}>Estado de São Paulo</Text>
          </View>
        </View>

        {/* Card do MVP */}
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>Atendimento de Urgência</Text>
          <Text style={styles.cardDescription}>
            Encontre o hospital de referência com estoque de soro mais próximo da sua localização.
          </Text>
        </View>

        {/* Ações Principais */}
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.btnPrimary} 
            activeOpacity={0.8}
            onPress={() => router.push('/unidades')}
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
            <Text style={styles.samuText}>Emergência? Ligue SAMU: 192</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  container: { flex: 1, padding: 24, justifyContent: 'space-between' },
  
  // Estilos do Cabeçalho e Logo
  header: { alignItems: 'center', marginTop: 10 },
  logoImage: { width: 120, height: 120, marginBottom: 12, borderRadius: 60 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#ffffff', letterSpacing: 1 },
  subtitle: { fontSize: 14, color: '#94a3b8', textAlign: 'center', marginTop: 6 },
  tagRegiao: { backgroundColor: '#059669', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 16, marginTop: 16 }, // Cor atualizada para o verde do logo
  tagText: { color: '#ffffff', fontSize: 13, fontWeight: 'bold' },
  
  // Estilos do Card e Botões
  cardInfo: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20, borderLeftWidth: 4, borderLeftColor: '#059669' }, // Cor da borda atualizada
  cardTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  cardDescription: { color: '#cbd5e1', fontSize: 14, lineHeight: 20 },
  actionContainer: { gap: 12 },
  btnPrimary: { backgroundColor: '#dc2626', paddingVertical: 16, borderRadius: 12, alignItems: 'center', elevation: 4 },
  btnPrimaryText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  btnSecondary: { backgroundColor: '#334155', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  btnSecondaryText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  footer: { alignItems: 'center', marginBottom: 10 },
  btnSamu: { paddingVertical: 8, paddingHorizontal: 16 },
  samuText: { color: '#ef4444', fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' },

  // Estilos do Modal de Aviso Importante
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#1e293b', borderRadius: 16, padding: 24, width: '100%', borderColor: '#334155', borderWidth: 1 },
  modalTitle: { color: '#ef4444', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  modalAlertBox: { backgroundColor: 'rgba(220, 38, 38, 0.1)', borderColor: '#dc2626', borderWidth: 1, borderRadius: 8, padding: 16, marginBottom: 20 },
  modalAlertText: { color: '#ef4444', fontSize: 14, lineHeight: 20, textAlign: 'justify' },
  modalText: { color: '#cbd5e1', fontSize: 14, lineHeight: 22, marginBottom: 16, textAlign: 'justify' },
  btnModalAcessar: { backgroundColor: '#3b82f6', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  btnModalAcessarText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});