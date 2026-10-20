import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GuiaSocorrosScreen() {
  const callSamu = () => {
    Linking.openURL('tel:192');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.titulo}>Primeiros Socorros</Text>
          <Text style={styles.subtitulo}>Diretrizes oficiais em caso de acidentes com animais peçonhentos.</Text>
        </View>

        {/* Botão de Emergência Rápida */}
        <TouchableOpacity style={styles.emergencyCard} onPress={callSamu} activeOpacity={0.8}>
          <Text style={styles.emergencyTitle}>🚨 EMERGÊNCIA: LIGAR 192 (SAMU)</Text>
          <Text style={styles.emergencyText}>
            Se a vítima apresentar dificuldade em respirar ou perda de consciência, ligue imediatamente.
          </Text>
        </TouchableOpacity>

        {/* Card 1: Sucesso (O que FAZER) */}
        <View style={styles.cardSucesso}>
          <Text style={styles.cardTituloSucesso}>✅ O QUE FAZER</Text>
          
          <View style={styles.listItem}>
            <Text style={styles.bulletSucesso}>•</Text>
            <Text style={styles.cardTextoSucesso}>Lave o local da picada apenas com água e sabão.</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletSucesso}>•</Text>
            <Text style={styles.cardTextoSucesso}>Mantenha a vítima deitada, calma e hidratada.</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletSucesso}>•</Text>
            <Text style={styles.cardTextoSucesso}>Mantenha o membro picado elevado (ligeiramente mais alto que o corpo).</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletSucesso}>•</Text>
            <Text style={styles.cardTextoSucesso}>Procure o hospital de referência mais próximo imediatamente usando o nosso mapa.</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletSucesso}>•</Text>
            <Text style={styles.cardTextoSucesso}>Se for seguro, tire uma foto do animal para facilitar o diagnóstico médico.</Text>
          </View>
        </View>

        {/* Card 2: Alerta (O que NÃO FAZER) */}
        <View style={styles.cardAlerta}>
          <Text style={styles.cardTitulo}>❌ O QUE NÃO FAZER</Text>
          
          <View style={styles.listItem}>
            <Text style={styles.bulletAlerta}>•</Text>
            <Text style={styles.cardTexto}>Não faça garrote ou torniquete. Isso corta a circulação e pode levar à amputação.</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletAlerta}>•</Text>
            <Text style={styles.cardTexto}>Não corte, não fure e não tente sugar o veneno com a boca.</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletAlerta}>•</Text>
            <Text style={styles.cardTexto}>Não aplique folhas, pó de café, pomadas ou qualquer substância no ferimento.</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletAlerta}>•</Text>
            <Text style={styles.cardTexto}>Não ofereça bebidas alcoólicas à vítima.</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>  
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  scrollContent: { padding: 24, paddingBottom: 40 },
  header: { marginBottom: 24 },
  titulo: { fontSize: 30, fontWeight: 'bold', color: '#ffffff', marginBottom: 8 },
  subtitulo: { fontSize: 15, color: '#94a3b8', lineHeight: 22 },
  
  // Estilo do Botão de Emergência
  emergencyCard: { backgroundColor: 'rgba(220, 38, 38, 0.1)', borderColor: '#dc2626', borderWidth: 1, padding: 16, borderRadius: 12, marginBottom: 24 },
  emergencyTitle: { color: '#ef4444', fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  emergencyText: { color: '#fca5a5', fontSize: 14, lineHeight: 20 },

  // Estilos da Lista e Bullets
  listItem: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' },
  
  // Card de Sucesso (Verde)
  cardSucesso: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20, borderLeftWidth: 4, borderLeftColor: '#10b981', marginBottom: 20 },
  cardTituloSucesso: { fontSize: 18, fontWeight: 'bold', color: '#10b981', marginBottom: 16, letterSpacing: 0.5 },
  cardTextoSucesso: { fontSize: 15, color: '#e2e8f0', lineHeight: 22, flex: 1 },
  bulletSucesso: { color: '#10b981', fontSize: 16, fontWeight: 'bold', marginRight: 8, marginTop: 1 },

  // Card de Alerta (Vermelho)
  cardAlerta: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20, borderLeftWidth: 4, borderLeftColor: '#ef4444', marginBottom: 20 },
  cardTitulo: { fontSize: 18, fontWeight: 'bold', color: '#ef4444', marginBottom: 16, letterSpacing: 0.5 },
  cardTexto: { fontSize: 15, color: '#e2e8f0', lineHeight: 22, flex: 1 },
  bulletAlerta: { color: '#ef4444', fontSize: 16, fontWeight: 'bold', marginRight: 8, marginTop: 1 },
});