import React, { useState, useEffect } from "react";
import { CityService } from "../../services/city.service";
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { useHistory, useParams } from "react-router";
import { Card } from "react-native-paper";

export const Cities = () => {
  const { isStar } = useParams();
  const history = useHistory();
  const cityService = new CityService();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (isStar) {
      AsyncStorage.getItem("star").then((el) => {
        if (el) {
          cityService.getCitiesByIds(el).then((x) => {
            setCities(x);
          });
        }
      });
    } else {
      cityService.getAllCities().then((el) => {
        setCities(el);
      });
    }
  }, []);

  const navigateToCity = (cityId) => {
    history.push(`/city/${cityId}`);
  };

  const proceedStar = async (id) => {
    const star = await AsyncStorage.getItem("star");
    let result = "";
    if (star) {
      const ids = star.split("_");
      let index = ids.indexOf(id.toString());
      if (index >= 0) {
        ids.splice(index, 1);
      } else {
        ids.push(id);
      }
      ids.forEach((el) => {
        if (el !== "") {
          result += el + "_";
        }
      });
    } else {
      result = id + "_";
    }
    result = result.slice(0, -1);
    await AsyncStorage.setItem("star", result);
  };

  return cities?.map((el) => {
    return (
      <View key={el.id} style={styles.container}>
        <Card style={styles.header}>
          <Card.Content style={styles.row}>
            <TouchableOpacity onPress={() => proceedStar(el.id)}>
              <Text style={styles.star}>&#9733;</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToCity(el.id)}>
              <Text style={styles.text}>{el.name}</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginLeft: 5,
  },
  text: {
    marginLeft: 25,
    fontSize: 32,
  },
  star: {
    marginLeft: 15,
    fontSize: 32,
    color: "black",
  },
  header: {
    color: "white",
    flex: 1,
    margin: 5,
  },
  row: {
    flexDirection: "row",
  },
});
