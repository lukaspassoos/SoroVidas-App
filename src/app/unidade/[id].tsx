import { useLocalSearchParams, useRouter } from 'expo-router';
import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UnidadeDetalhesScreen() {
  // Recebe os dados enviados pelo clique no cartão da lista
  const params = useLocalSearchParams();
  const router = useRouter();

  // Função para abrir o Google Maps ou Apple Maps
  const abrirMapa = () => {
    const enderecoCompleto = `${params.nome}, ${params.endereco}`;
    const query = encodeURIComponent(enderecoCompleto);
    
    // Tenta abrir a aplicação nativa de mapas do telemóvel (Apple Maps no iOS, Google Maps no Android)
    const urlNativa = Platform.OS === 'ios' ? `maps:0,0?q=${query}` : `geo:0,0?q=${query}`;
    // Link de segurança caso o telemóvel não tenha app de mapas padrão configurada
    const urlWeb = `https://www.google.com/maps/search/?api=1&query=${query}`;

    Linking.canOpenURL(urlNativa).then(suporta => {
      if (suporta) {
        Linking.openURL(urlNativa);
      } else {
        Linking.openURL(urlWeb);
      }
    });
  };

  // Função para abrir o teclado numérico do telemóvel
  const fazerLigacao = () => {
    // Limpa a formatação visual (ex: "(19) 3521-2121" transforma-se em "1935212121")
    const numeroTelefone = typeof params.telefone === 'string' ? params.telefone.replace(/\D/g, '') : '';
    Linking.openURL(`tel:${numeroTelefone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão de Fechar/Voltar */}
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Text style={styles.closeButtonText}>✕ Fechar</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{params.nome}</Text>
        
        {params.soroAntiofidico === 'true' ? (
          <View style={styles.badgeSuccess}>
            <Text style={styles.badgeTextSuccess}>✅ Soro Disponível</Text>
          </View>
        ) : (
          <View style={styles.badgeWarning}>
            <Text style={styles.badgeTextWarning}>⚠️ Sem estoque de Soro</Text>
          </View>
        )}

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Endereço:</Text>
          <Text style={styles.infoText}>{params.endereco}</Text>
          <Text style={styles.infoText}>📍 A {params.distancia}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.infoLabel}>Horário de Funcionamento:</Text>
          <Text style={styles.infoText}>🕒 {params.horario}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.infoLabel}>Telefone:</Text>
          <Text style={styles.infoText}>📞 {params.telefone}</Text>
        </View>

        {/* Botões de Ação */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.btnCall} onPress={fazerLigacao} activeOpacity={0.8}>
            <Text style={styles.btnText}>Ligar para Unidade</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnMap} onPress={abrirMapa} activeOpacity={0.8}>
            <Text style={styles.btnTextMap}>Ver Rota no Mapa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  closeButton: { alignSelf: 'flex-end', padding: 20 },
  closeButtonText: { color: '#94a3b8', fontSize: 16, fontWeight: 'bold' },
  content: { flex: 1, paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ffffff', marginBottom: 12 },
  badgeSuccess: { backgroundColor: 'rgba(16, 185, 129, 0.2)', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 20, borderWidth: 1, borderColor: '#10b981' },
  badgeTextSuccess: { color: '#10b981', fontWeight: 'bold', fontSize: 14 },
  badgeWarning: { backgroundColor: 'rgba(245, 158, 11, 0.2)', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 20, borderWidth: 1, borderColor: '#f59e0b' },
  badgeTextWarning: { color: '#f59e0b', fontWeight: 'bold', fontSize: 14 },
  infoCard: { backgroundColor: '#1e293b', padding: 20, borderRadius: 16, marginBottom: 24, borderWidth: 1, borderColor: '#334155' },
  infoLabel: { color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold', marginBottom: 4 },
  infoText: { color: '#e2e8f0', fontSize: 16, marginBottom: 8 },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 12 },
  actionContainer: { gap: 12, marginTop: 'auto', marginBottom: 40 },
  btnCall: { backgroundColor: '#0284c7', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  btnMap: { backgroundColor: 'transparent', paddingVertical: 16, borderRadius: 12, alignItems: 'center', borderWidth: 2, borderColor: '#0284c7' },
  btnTextMap: { color: '#0284c7', fontSize: 16, fontWeight: 'bold' },
});