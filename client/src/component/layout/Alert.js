import React from 'react';
import PropTypes from 'prop-types';//PropTypes: This is a library for type-checking props in React components, helping to catch errors and improve documentation.
import { connect } from 'react-redux'; //This is a function from the react-redux library that connects a React component to the Redux store.

const Alert = ({ alerts }) => (
  <div className='alert-wrapper'>
    {alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired, //Alert.propTypes specifies that the alerts prop is required and should be an array. This helps catch bugs and ensures the component receives the correct props.
};

const mapStateToProps = (state) => ({
  //function that maps the Redux state to the component's props.
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert); //connect(mapStateToProps) connects the Alert component to the Redux store.It makes the alerts state available as a prop to the Alert component.
