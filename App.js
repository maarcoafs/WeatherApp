import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const weatherDescriptions = {
    Thunderstorm: 'Trovoada',
    Drizzle: 'Chuvisco',
    Rain: 'Chuva',
    Snow: 'Neve',
    Mist: 'Névoa',
    Smoke: 'Fumaça',
    Haze: 'Neblina',
    Dust: 'Poeira',
    Fog: 'Névoa',
    Sand: 'Areia',
    Ash: 'Cinzas',
    Squall: 'Rajada',
    Tornado: 'Tornado',
    Clear: 'Céu limpo',
    Clouds: 'Nublado',
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ebaa72c178d361a9ea376230013811f&units=metric`);
      const data = await response.json();
      if (data.cod === '404') {
        setError('Cidade não encontrada');
        setWeatherData(null);
      } else {
        setWeatherData({
          temperature: data.main.temp,
          description: weatherDescriptions[data.weather[0].main] || data.weather[0].main,
          icon: data.weather[0].icon
        });
        setError('');
      }
    } catch (error) {
      setError('Falha ao buscar dados do clima');
      setWeatherData(null);
    }
  };

  const handleSearch = () => {
    const trimmedCity = city.trim();
    setCity(trimmedCity);
    fetchWeatherData();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite a cidade"
        onChangeText={text => setCity(text)}
        value={city}
      />
      <Button
        title="Buscar"
        onPress={handleSearch}
      />
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>Temperatura: {weatherData.temperature}°C</Text>
          <Text style={styles.weatherText}>Descrição: {weatherData.description}</Text>
          <Image
            style={styles.weatherIcon}
            source={{ uri: `http://openweathermap.org/img/w/${weatherData.icon}.png` }}
          />
        </View>
      )}
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2596be',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    width: '80%',
    borderRadius: 5,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    marginBottom: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
});

export default App;