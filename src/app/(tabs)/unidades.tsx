import * as Location from 'expo-location';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import hospitaisJSON from '../../data/hospitais.json';

interface UnidadeSaude {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  horario: string;
  soroAntiofidico: boolean;
  latitude: number;
  longitude: number;
  distancia: string;
  distanciaReal: number;
  atendimentos?: string; // Novo campo para os tipos de animais
}

const calcularDistanciaHaversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

export default function UnidadesScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [unidades, setUnidades] = useState<UnidadeSaude[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada.');
        setLoading(false);
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        fetchUnidades(currentLocation.coords.latitude, currentLocation.coords.longitude);
      } catch (err) {
        setErrorMsg('Erro ao obter a sua localização.');
        setLoading(false);
      }
    })();
  }, []);

  const fetchUnidades = async (userLat: number, userLng: number) => {
    try {
      let dadosMapeados = hospitaisJSON.map(hospital => {
        const dist = calcularDistanciaHaversine(userLat, userLng, hospital.latitude, hospital.longitude);
        return {
          ...hospital,
          distanciaReal: dist,
          distancia: dist < 1 ? `${(dist * 1000).toFixed(0)} m` : `${dist.toFixed(1)} km`
        };
      });

      dadosMapeados.sort((a, b) => a.distanciaReal - b.distanciaReal);
      
      setUnidades(dadosMapeados);
      setLoading(false);
    } catch (error) {
      setErrorMsg('Falha ao processar as distâncias.');
      setLoading(false);
    }
  };

  const unidadesFiltradas = unidades.filter(unidade => 
    unidade.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: UnidadeSaude }) => (
    <Link 
      href={{
        pathname: "/unidade/[id]",
        params: {
          id: item.id,
          nome: item.nome,
          endereco: item.endereco,
          distancia: item.distancia,
          telefone: item.telefone,
          horario: item.horario,
          soroAntiofidico: item.soroAntiofidico.toString()
        }
      }} 
      asChild
    >
      <Pressable>
        {({ pressed }) => (
          <View style={[
            styles.card, 
            { 
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }] 
            }
          ]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                
                {/* Exibição Condicional dos Atendimentos com Emojis */}
                {item.atendimentos && (
                  <Text style={styles.cardAtendimentos}>{item.atendimentos}</Text>
                )}

                <Text style={styles.cardText}>{item.endereco}</Text>
                <Text style={styles.cardText}>📍 A {item.distancia} de si</Text>
                <Text style={styles.badgeSuccess}>✅ Unidade com Soro</Text>
              </View>
              <View style={styles.cardArrowContainer}>
                <Text style={styles.cardArrow}>❯</Text>
              </View>
            </View>
            
            <View style={styles.cardDivider} />
            <View style={styles.cardActionContainer}>
              <Text style={styles.cardActionText}>Ver contatos e traçar rota</Text>
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Hospitais de Referência</Text>

      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar hospital por nome..."
          placeholderTextColor="#94a3b8"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#059669" />
          <Text style={styles.loaderText}>A obter o seu GPS e a calcular distâncias...</Text>
        </View>
      ) : errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : (
        <View style={{ flex: 1, zIndex: 10 }}>
          <FlatList
            data={unidadesFiltradas}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhuma unidade encontrada com esse nome.</Text>
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginHorizontal: 20, marginTop: 20, marginBottom: 16 },
  filterContainer: { paddingHorizontal: 20, marginBottom: 20 },
  searchInput: { backgroundColor: '#1e293b', color: '#ffffff', paddingHorizontal: 16, paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: '#334155', fontSize: 16 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loaderText: { color: '#94a3b8', marginTop: 16, fontSize: 16 },
  errorText: { color: '#ef4444', textAlign: 'center', marginTop: 20, fontSize: 16 },
  emptyText: { color: '#94a3b8', textAlign: 'center', marginTop: 40, fontSize: 16 },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  
  card: { 
    backgroundColor: '#1e293b', 
    paddingTop: 18,
    paddingHorizontal: 18,
    paddingBottom: 12,
    borderRadius: 16, 
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
    borderLeftWidth: 4, 
    borderLeftColor: '#059669' 
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardInfo: { flex: 1, paddingRight: 10 },
  cardTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  
  // Novo estilo para os emojis e atendimentos
  cardAtendimentos: { color: '#fbbf24', fontSize: 13, fontWeight: 'bold', marginBottom: 8, letterSpacing: 0.3 },
  
  cardText: { color: '#cbd5e1', fontSize: 14, marginBottom: 6 },
  badgeSuccess: { color: '#10b981', fontWeight: 'bold', marginTop: 4, fontSize: 13 },
  
  cardArrowContainer: { justifyContent: 'center', alignItems: 'center', paddingLeft: 10 },
  cardArrow: { color: '#475569', fontSize: 24, fontWeight: 'bold' },
  
  cardDivider: { height: 1, backgroundColor: '#334155', marginTop: 16, marginBottom: 12 },
  cardActionContainer: { alignItems: 'center', paddingBottom: 4 },
  cardActionText: { color: '#38bdf8', fontSize: 14, fontWeight: 'bold' }
});