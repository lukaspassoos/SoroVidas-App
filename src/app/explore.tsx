import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GuiaSocorrosScreen() {
 return (
    <SafeAreaView style ={Styles.container}>
      <ScrollView contentContainerStyle={Styles.scrollContent}>
        <Text style={Styles.titulo}>Primeiros Socorros</Text>
        <Text style={Styles.subtitulo}>O que fazer em caso de acidentes</Text>
        
        <View style={Styles.cardAlerta}>
          <Text style={Styles.cardTitulo}>❌ O QUE NÃO FAZER</Text>
          <Text style={Styles.cardTexto}>• Não faça garrote ou torniquete.</Text>
          <Text style={Styles.cardTexto}>• Não corte o local da picada.</Text>
          <Text style={Styles.cardTexto}>• Não aplique substâncias no ferimento.</Text>
          <Text style={Styles.cardTexto}>• Não tente sugar o veneno.</Text>
        </View>

        <View style={Styles.cardSucesso}>
          <Text style={Styles.cardTituloSucesso}>✅ O QUE FAZER</Text>
          <Text style={Styles.cardTextoSucesso}>• Lave o local da picada com água e sabão.</Text>
          <Text style={Styles.cardTextoSucesso}>• Mantenha a vitima calma e em repouso.</Text>
          <Text style={Styles.cardTextoSucesso}>• Procure o hospital mais próximo imediatamente.</Text>
          <Text style={Styles.cardTextoSucesso}>• Se for fácil e seguro tire uma foto do animal.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>  
 );
}

const Styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#0f172a',
  },
scrollContent: {
  padding: 20,
  },
titulo: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#ffffff',
  marginBottom: 20,
  },
subtitulo: {
  fontSize: 16,
  color: '#94a3b8',
  marginBottom: 20,
  },

  // Card 1: Alerta (O que NÃO fazer)
cardAlerta: {
  backgroundColor: '#450a0a',
  borderRadius: 12,
  padding: 16,
  borderWidth: 1,
  borderColor: '#ef4444',
  marginBottom: 16,
  },
cardTitulo:{
  fontSize: 18,
  fontWeight: 'bold',
  color: '#fca5a5',
  marginBottom: 10,
  },
 cardTexto:{
  fontSize: 15,
  color: '#fecaca',
  marginBottom: 6,
 },

 // Card 2: Sucesso (O que FAZER)
 cardSucesso:{
  backgroundColor: '#064e3b',
  borderRadius: 12,
  padding: 16,
  borderWidth: 1,
  borderColor:'#10b981'
 },
 cardTituloSucesso:{
  fontSize:18,
  fontWeight: 'bold',
  color: '#a7f3d0',
  marginBottom: 10,
 },
 cardTextoSucesso:{
  fontSize: 15,
  color: '#d1fae5',
  marginBottom: 6,
 },
});