 function createStore(reducer) {
  // generic to each application:
  // a call to dispatch should call a reducer, reassign the state, and render a change
  let state;

  function dispatch(action){
    state = reducer(state, action);
    render();
  };

  function getState() {
    return state
  }

  return {
    dispatch,
    getState
  }
}

// particular to a specific application (implemented outside of the createStore method):
// How the DOM is updated in our render function
// What events trigger a dispatch method
// How our state should change in response to different actions being dispatched
function changeCount(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };

    default:
      return state;
  }
};

function render() {
  let container = document.getElementById('container');
  container.textContent = store.getState().count;
};

let store = createStore(changeCount) // createStore takes the changeCount reducer as an argument
store.dispatch({ type: '@@INIT' })
let button = document.getElementById('button');

button.addEventListener('click', function() {
    store.dispatch({ type: 'INCREASE_COUNT' });
})
