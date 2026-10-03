import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Interface baseada no modelo inicial de dados (Seção 7 do Escopo)
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

  useEffect(() => {
    (async () => {
      // RF01: Obter localização mediante autorização
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

  // RF07: Consumir API REST (Simulação)
  const fetchUnidades = async (lat: number, lng: number) => {
    try {
      // Exemplo real com Axios: const response = await axios.get(`https://sua-api.com/unidades?lat=${lat}&lng=${lng}`);
      // Simulando o JSON de resposta:
      setTimeout(() => {
        setUnidades([
          { id: '1', nome: 'HC Unicamp', endereco: 'Rua Vital Brasil, 251', distancia: '2.5 km', soroAntiofidico: true },
          { id: '2', nome: 'UPA São José', endereco: 'Av. João Jorge, 100', distancia: '4.1 km', soroAntiofidico: false },
          { id: '3', nome: 'Hospital Mário Gatti', endereco: 'Av. Prefeito Faria Lima, 340', distancia: '5.0 km', soroAntiofidico: true },
        ]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      // RF08: Tratar indisponibilidade
      setErrorMsg('Falha ao carregar as unidades de saúde.');
      setLoading(false);
    }
  };

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

      {loading ? (
        <ActivityIndicator size="large" color="#0284c7" style={styles.loader} />
      ) : errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : (
        // RF03: Exibir unidades em lista
        <FlatList
          data={unidades}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', margin: 20 },
  loader: { flex: 1, justifyContent: 'center' },
  errorText: { color: '#ef4444', textAlign: 'center', marginTop: 20, fontSize: 16 },
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