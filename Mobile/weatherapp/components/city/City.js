import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { CityService } from "../../services/city.service";
import { WeatherService } from "../../services/weather.service";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { useParams } from "react-router";

export const City = () => {
  const { id } = useParams();

  const cityService = new CityService();
  const weatherService = new WeatherService();
  const [myCity, setMyCity] = useState({});

  useEffect(() => {
    if (id) {
      cityService.getCityById(id).then((el) => {
        weatherService.getWeatherByCityName(el.name).then((el1) => {
          setMyCity(el1);
        });
      });
    } else {
      cityService.getClientCity().then((el) => {
        weatherService.getWeatherByCityName(el).then((el1) => {
          setMyCity(el1);
        });
      });
    }
  }, []);

  const weather = myCity.weather?.find((x) => x !== undefined);

  return (
    <Card style={styles.top}>
      <View style={styles.cardHeader}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: `http://openweathermap.org/img/wn/${weather?.icon}@2x.png`,
          }}
        />
        <Card.Title title={myCity.name} />
      </View>
      <Card.Content>
        <Title>Weather</Title>
        <Paragraph>Main: {weather?.main}</Paragraph>
        <Paragraph>Description: {weather?.description}</Paragraph>
        <Paragraph></Paragraph>
      </Card.Content>
      <Card.Content>
        <Title>Temperature</Title>
        <Paragraph>Temperature: {myCity.main?.temp} &#176;C</Paragraph>
        <Paragraph>Feels like: {myCity.main?.feels_like} &#176;C</Paragraph>
        <Paragraph>Max Temperature: {myCity.main?.temp_max} &#176;C</Paragraph>
        <Paragraph>Min Temperature: {myCity.main?.temp_min} &#176;C</Paragraph>
        <Paragraph></Paragraph>
      </Card.Content>
      <Card.Content>
        <Title>Wind</Title>
        <Paragraph>Speed: {myCity.wind?.speed} m/s</Paragraph>
        <Paragraph>Degree: {myCity.wind?.deg} &#176;</Paragraph>
        <Paragraph></Paragraph>
      </Card.Content>
      <Card.Content>
        <Title>Miscellaneous</Title>
        <Paragraph>
          Sunrise:{" "}
          {new Date(
            myCity.sys?.sunrise * 1000 || Date.now()
          ).toLocaleTimeString()}
        </Paragraph>
        <Paragraph>
          Sunset:{" "}
          {new Date(
            myCity.sys?.sunset * 1000 || Date.now()
          ).toLocaleTimeString()}
        </Paragraph>
        <Paragraph>Cloudiness: {myCity.clouds?.all} %</Paragraph>
        <Paragraph>Humidity: {myCity.main?.humidity} %</Paragraph>
        <Paragraph></Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
  cardHeader: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 8.5,
  },
  top: {
    marginTop: 17,
  },
});
