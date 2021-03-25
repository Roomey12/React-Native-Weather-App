import React from "react";
import { Footer, FooterTab, Button, Text } from "native-base";
import { StyleSheet } from "react-native";
import { useHistory } from "react-router";

export const AppFooter = () => {
  const history = useHistory();

  return (
    <Footer>
      <FooterTab>
        <Button
          onPress={() => {
            history.push("/allCities");
          }}
        >
          <Text>All Cities</Text>
        </Button>
        <Button
          onPress={() => {
            history.push("/city");
          }}
        >
          <Text>My City</Text>
        </Button>
        <Button
          onPress={() => {
            history.push(`/allCities/true`);
          }}
        >
          <Text style={styles.text}>&#9733;</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

const styles = StyleSheet.create({
  text: {
    justifyContent: "center",
    fontSize: 18,
  },
});
