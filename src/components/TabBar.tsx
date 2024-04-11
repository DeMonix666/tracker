import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Typography } from './Typography';
import { colors, Icon } from 'react-native-elements';

export const TabBar: React.FC<any> = ({ navigation, state }) => {
  const labels: any = {
    'Dashboard': 'My Location',
  };

  const { routes, index: activeRouteIndex } = state;
  const activeRoute = routes[activeRouteIndex];

  const handleTabPress = useCallback(
    (route: any) => {
      navigation.navigate(route.name);

      /* not a good idea. it will reset the scroll as well */
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: route.name, params: {screen}}],
      // });
    },
    [navigation],
  );

  const TabIcon = (route: any) => {
    const color = route === activeRoute ? colors.primary : colors.grey1;

    if (route.name === 'Dashboard') {
      return <Icon name="dashboard" color={color} />;
    } else if (route.name === 'Messages') {
      return <Icon name="envelope" type='font-awesome' color={color} />;
    } else if (route.name === 'Profile') {
      return <Icon name="person" color={color} />;
    } else if (route.name === 'Devices') {
      return <Icon name="history" color={color} />;
    } else if (route.name === 'More') {
      return <Icon name="more-horiz" color={color} />;
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        {routes.map((route: any) => {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => handleTabPress(route)}>
              <View style={{ alignItems: 'center' }}>
                {TabIcon(route)}

                <Typography
                  text={labels[route.name] ?? route.name}
                  fontSize={14}
                  color={route === activeRoute ? colors.primary : colors.grey1}
                  bold={route === activeRoute}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

TabBar.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  state: PropTypes.shape({
    routes: PropTypes.array,
    index: PropTypes.number,
  }).isRequired,
  style: PropTypes.any,
};

TabBar.defaultProps = {
  style: {},
  labelStyle: {},
};

const styles = StyleSheet.create({
  // container: {
  //     // backgroundColor: colors.deepDark,
  //     backgroundColor:  activeRoute.name === 'Feed'
  //     ? colors.white
  //     : 'red'
  // },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderTopWidth: 0.7,
    borderColor: colors.grey5,
  },
  activeIndicator: {
    position: 'absolute',
    // backgroundColor: colors.secondary2,
    width: 30,
    height: 3,
    borderRadius: 5,
  },
  iconItem: {
    marginTop: 8,
  },
  item: {
    flex: 1,
    width: '20%',
  },
});
