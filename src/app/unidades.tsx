import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface UnidadeSaude {
  id: string;
  nome: string;
  endereco: string;
  distancia: string;
  soroAntiofidico: boolean;
}

export default function UnidadesScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [unidades, setUnidades] = useState<UnidadeSaude[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Novos estados para a Busca e o Filtro
  const [searchText, setSearchText] = useState('');
  const [somenteSoro, setSomenteSoro] = useState(false);

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
        setErrorMsg('Erro ao obter localização.');
        setLoading(false);
      }
    })();
  }, []);

  const fetchUnidades = async (lat: number, lng: number) => {
    try {
      setTimeout(() => {
        setUnidades([
          { id: '1', nome: 'HC Unicamp', endereco: 'Rua Vital Brasil, 251', distancia: '2.5 km', soroAntiofidico: true },
          { id: '2', nome: 'UPA São José', endereco: 'Av. João Jorge, 100', distancia: '4.1 km', soroAntiofidico: false },
          { id: '3', nome: 'Hospital Mário Gatti', endereco: 'Av. Prefeito Faria Lima, 340', distancia: '5.0 km', soroAntiofidico: true },
          { id: '4', nome: 'Posto de Saúde Centro', endereco: 'Rua Barão de Jaguara, 120', distancia: '6.2 km', soroAntiofidico: false },
        ]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      setErrorMsg('Falha ao carregar as unidades de saúde.');
      setLoading(false);
    }
  };

  // Lógica principal de filtragem (RF04 e RF05)
  const unidadesFiltradas = unidades.filter(unidade => {
    const correspondeBusca = unidade.nome.toLowerCase().includes(searchText.toLowerCase());
    const correspondeFiltroSoro = somenteSoro ? unidade.soroAntiofidico === true : true;
    return correspondeBusca && correspondeFiltroSoro;
  });

  const renderItem = ({ item }: { item: UnidadeSaude }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <Text style={styles.cardTitle}>{item.nome}</Text>
      <Text style={styles.cardText}>{item.endereco}</Text>
      <Text style={styles.cardText}>📍 Distância: {item.distancia}</Text>
      {item.soroAntiofidico ? (
        <Text style={styles.badgeSuccess}>✅ Soro Antiofídico Disponível</Text>
      ) : (
        <Text style={styles.badgeWarning}>⚠️ Sem Soro no Momento</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Unidades Próximas</Text>

      {/* Container de Busca e Filtros */}
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar hospital por nome..."
          placeholderTextColor="#94a3b8"
          value={searchText}
          onChangeText={setSearchText}
        />
        
        <TouchableOpacity 
          style={[styles.filterButton, somenteSoro && styles.filterButtonActive]}
          onPress={() => setSomenteSoro(!somenteSoro)}
          activeOpacity={0.7}
        >
          <Text style={[styles.filterButtonText, somenteSoro && styles.filterButtonTextActive]}>
            {somenteSoro ? '💉 Apenas com Soro' : 'Mostrar Todos'}
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0284c7" style={styles.loader} />
      ) : errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : (
        <FlatList
          data={unidadesFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          // Componente exibido quando a busca não encontra resultados
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma unidade encontrada com estes filtros.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginHorizontal: 20, marginTop: 20, marginBottom: 10 },
  
  // Estilos da Busca e Filtro
  filterContainer: { paddingHorizontal: 20, marginBottom: 16, gap: 10 },
  searchInput: {
    backgroundColor: '#1e293b',
    color: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#334155',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#475569',
  },
  filterButtonActive: {
    backgroundColor: '#059669', // Verde quando ativo
    borderColor: '#10b981',
  },
  filterButtonText: { color: '#cbd5e1', fontWeight: 'bold' },
  filterButtonTextActive: { color: '#ffffff' },

  loader: { flex: 1, justifyContent: 'center' },
  errorText: { color: '#ef4444', textAlign: 'center', marginTop: 20, fontSize: 16 },
  emptyText: { color: '#94a3b8', textAlign: 'center', marginTop: 40, fontSize: 16 },
  listContent: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0284c7',
  },
  cardTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  cardText: { color: '#cbd5e1', fontSize: 14, marginBottom: 4 },
  badgeSuccess: { color: '#10b981', fontWeight: 'bold', marginTop: 8 },
  badgeWarning: { color: '#f59e0b', fontWeight: 'bold', marginTop: 8 },
});