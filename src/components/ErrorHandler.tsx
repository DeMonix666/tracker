import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {appState} from '../store/reducers';
import {Typography} from './Typography';

type ErrorHandlerProps = {
  app: any;
  children: any;
};

type ErrorHandlerState = {
  renderError: string | null;
};

class ErrorHandlerClass extends Component<
  ErrorHandlerProps,
  ErrorHandlerState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      renderError: null,
    };
  }

  componentDidCatch(error: any) {
    this.setState({renderError: String(error)});
  }

  render() {
    const {renderError} = this.state;

    return renderError ? (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Typography text={renderError} />
        </View>
      </View>
    ) : (
      this.props.children
    );
  }
}

const mapStateToProps = (state: any) => ({
  app: appState(state),
});

const mapDispatchToProps = {};

export const ErrorHandler = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandlerClass);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
});
