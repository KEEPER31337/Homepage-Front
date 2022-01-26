import { Switch } from '@headlessui/react';
import { connect } from 'react-redux';

// local
import { actions } from 'store';

const DarkModeSwitch = ({ state, darkModeToggle }) => {
  const darkMode = state.darkMode;

  const handleChange = (e) => {
    darkModeToggle();
  };

  return (
    <Switch
      checked={darkMode}
      onChange={handleChange}
      className="bg-gray-200 dark:bg-darkComponent relative inline-flex items-center h-6 rounded-full w-11"
    >
      <span className="sr-only">Dark Mode</span>
      <span
        className={
          'translate-x-1 dark:translate-x-6 inline-block w-4 h-4 transform bg-mainYellow rounded-full'
        }
      />
    </Switch>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};
const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    darkModeToggle: () => {
      console.log('hi');
      dispatch(actions.darkModeToggle());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DarkModeSwitch);
